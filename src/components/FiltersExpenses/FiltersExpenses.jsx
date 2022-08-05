import { useEffect, useRef, useState } from 'react';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import i18next from 'i18next';

import { useCentralTheme } from '@/theme';

import { CalendarPicker } from './CalendarPicker';

export const FiltersExpenses = () => {
  const [chosenDates, setChosenDates] = useState({});

  const [dateButtonSelected, setDateButtonSelected] = useState({
    today: false,
    yesterday: false,
    thisWeek: false,
    lastWeek: false,
    thisMonth: false,
    lastMonth: false,
    customized: false
  });
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);

  const [selectedDateFilter, setSelectedDateFilter] = useState({
    value: '',
    dates: {
      start: null,
      end: null
    }
  });
  const [selectedCategoryFilters, setSelectedCategoryFilters] = useState([]);
  const [selectedWalletFilters, setSelectedWalletFilters] = useState([]);
  const [selectedPayerFilters, setSelectedPayerFilters] = useState([]);

  const calendarRef = useRef(null);

  const { textColor, inputValueColor, inputSelectBg, inputSelectBorderColor } =
    useCentralTheme();

  const handleClickOutside = (event) => {
    if (calendarRef.current && !calendarRef.current.contains(event.target)) {
      setIsDateSelectOpen(false);
    }
  };

  useEffect(() => {
    window.addEventListener('click', handleClickOutside);

    return () => {
      window.removeEventListener('click', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (
      !isDateSelectOpen &&
      selectedDateFilter.value === 'date-customized' &&
      !!Object.values(selectedDateFilter.dates).length &&
      selectedDateFilter.dates.start &&
      !selectedDateFilter.dates.end
    ) {
      setChosenDates((prevState) => ({
        ...prevState,
        end: prevState.start
      }));
      setSelectedDateFilter((prevState) => ({
        ...prevState,
        dates: {
          start: prevState.dates.start,
          end: prevState.dates.start
        }
      }));
    } else if (
      !isDateSelectOpen &&
      selectedDateFilter.value === 'date-customized' &&
      !!Object.values(selectedDateFilter.dates).length &&
      !selectedDateFilter.dates.start
    ) {
      setChosenDates({
        start: null,
        end: null
      });
      setSelectedDateFilter({
        ...selectedDateFilter,
        value: ''
      });
      setDateButtonSelected({ ...dateButtonSelected, customized: false });
    } else if (
      !isDateSelectOpen &&
      selectedDateFilter.value !== 'date-customized' &&
      !!Object.values(selectedDateFilter.dates).length &&
      chosenDates.start &&
      !chosenDates.end
    ) {
      setChosenDates((prevState) => ({
        ...prevState,
        end: prevState.start
      }));
    }
  }, [isDateSelectOpen]);

  const handleSelects = (event, state, setState) => {
    let isIncluded = state.some((el) => el.value === event.value);

    if (isIncluded) {
      let filteredArr = state.filter((el) => el.value !== event.value);

      setState(filteredArr);
    } else {
      setState((prevState) => [...prevState, event]);
    }
  };

  const clearAllDateButtonsSelected = () => {
    setDateButtonSelected({
      ...dateButtonSelected,
      today: false,
      yesterday: false,
      thisWeek: false,
      lastWeek: false,
      thisMonth: false,
      lastMonth: false,
      customized: false
    });
  };

  const clearChosenSelect = (setState, isDate = false) => {
    if (isDate) {
      setState({
        value: '',
        dates: {
          start: null,
          end: null
        }
      });
      setChosenDates({});
      clearAllDateButtonsSelected();
      setIsDateSelectOpen(false);

      return;
    }

    setState([]);
  };

  const clearAllSelects = () => {
    setChosenDates({});
    clearAllDateButtonsSelected();
    setIsDateSelectOpen(false);

    setSelectedDateFilter({
      value: '',
      dates: {
        start: null,
        end: null
      }
    });
    setSelectedCategoryFilters([]);
    setSelectedWalletFilters([]);
    setSelectedPayerFilters([]);
  };

  return (
    <Flex flexDir="column" w="100%">
      <Heading mb="15px" as="h3" size="lg" color={textColor}>
        {i18next.t('expenses.filters.heading')}
      </Heading>

      <Flex flexWrap="wrap" w="100%">
        <Flex
          pos="relative"
          alignItems="center"
          mr="25px"
          mb="16px"
          pr="34px"
          minW="200px"
          ref={calendarRef}
        >
          <InputGroup onClick={() => setIsDateSelectOpen(!isDateSelectOpen)}>
            <Input
              textAlign="left"
              color={inputValueColor}
              type="button"
              value={i18next.t('expenses.filters.date.value')}
            />
            <InputRightElement
              mt="2px"
              mr="1px"
              h="93%"
              w="54px"
              borderRightRadius="5px"
              borderLeftWidth="1px"
              borderColor={inputSelectBorderColor}
              bg={inputSelectBg}
              cursor="pointer"
            >
              <ChevronDownIcon w="20px" h="20px" />
            </InputRightElement>
          </InputGroup>
          {!!isDateSelectOpen && (
            <Box pos="absolute" top="50px" zIndex="2">
              <CalendarPicker
                clearAllDateButtonsSelected={clearAllDateButtonsSelected}
                chosenDates={chosenDates}
                setChosenDates={setChosenDates}
                dateButtonSelected={dateButtonSelected}
                setDateButtonSelected={setDateButtonSelected}
                selectedDateFilter={selectedDateFilter}
                setSelectedDateFilter={setSelectedDateFilter}
              />
            </Box>
          )}
          {(selectedDateFilter.value.includes('date') ||
            (!!Object.values(selectedDateFilter.dates).length &&
              selectedDateFilter.dates.end !== null)) && (
            <IconButton
              pos="absolute"
              right="0"
              size="xs"
              borderRadius="50%"
              variant="secondary"
              aria-label={i18next.t('expenses.filters.btn.removeFilter')}
              icon={<CloseIcon />}
              onClick={() => clearChosenSelect(setSelectedDateFilter, true)}
            />
          )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="25px"
          mb="16px"
          pr="34px"
          minW="200px"
        >
          <FormControl>
            <Select
              value={selectedCategoryFilters}
              options={[
                { label: 'Category 1', value: 'category-1' },
                { label: 'Category 2', value: 'category-2' },
                { label: 'Category 3', value: 'category-3' },
                { label: 'Category 4', value: 'category-4' },
                { label: 'Category 5', value: 'category-5' }
              ]}
              onChange={(event) =>
                handleSelects(
                  event,
                  selectedCategoryFilters,
                  setSelectedCategoryFilters
                )
              }
              isSearchable={true}
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              placeholder={i18next.t('expenses.filters.category.placeholder')}
            />
          </FormControl>
          {!!selectedCategoryFilters.length && (
            <IconButton
              pos="absolute"
              right="0"
              size="xs"
              borderRadius="50%"
              variant="secondary"
              aria-label={i18next.t('expenses.filters.btn.removeFilter')}
              icon={<CloseIcon />}
              onClick={() => clearChosenSelect(setSelectedCategoryFilters)}
            />
          )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="25px"
          mb="16px"
          pr="34px"
          minW="200px"
        >
          <FormControl>
            <Select
              value={selectedWalletFilters}
              options={[
                { label: 'Wallet 1', value: 'wallet-1' },
                { label: 'Wallet 2', value: 'wallet-2' },
                { label: 'Wallet 3', value: 'wallet-3' }
              ]}
              onChange={(event) =>
                handleSelects(
                  event,
                  selectedWalletFilters,
                  setSelectedWalletFilters
                )
              }
              isSearchable={true}
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              placeholder={i18next.t('expenses.filters.wallet.placeholder')}
            />
          </FormControl>
          {!!selectedWalletFilters.length && (
            <IconButton
              pos="absolute"
              right="0"
              size="xs"
              borderRadius="50%"
              variant="secondary"
              aria-label={i18next.t('expenses.filters.btn.removeFilter')}
              icon={<CloseIcon />}
              onClick={() => clearChosenSelect(setSelectedWalletFilters)}
            />
          )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="35px"
          mb="16px"
          pr="34px"
          minW="200px"
        >
          <FormControl>
            <Select
              value={selectedPayerFilters}
              options={[
                { label: 'Payer 1', value: 'payer-1' },
                { label: 'Payer 2', value: 'payer-2' },
                { label: 'Payer 3', value: 'payer-3' }
              ]}
              onChange={(event) =>
                handleSelects(
                  event,
                  selectedPayerFilters,
                  setSelectedPayerFilters
                )
              }
              isSearchable={true}
              closeMenuOnSelect={false}
              selectedOptionStyle="check"
              hideSelectedOptions={false}
              placeholder={i18next.t('expenses.filters.payer.placeholder')}
            />
          </FormControl>
          {!!selectedPayerFilters.length && (
            <IconButton
              pos="absolute"
              right="0"
              size="xs"
              borderRadius="50%"
              variant="secondary"
              aria-label={i18next.t('expenses.filters.btn.removeFilter')}
              icon={<CloseIcon />}
              onClick={() => clearChosenSelect(setSelectedPayerFilters)}
            />
          )}
        </Flex>

        {(selectedDateFilter.value.includes('date') ||
          (!!Object.values(selectedDateFilter.dates).length &&
            selectedDateFilter.dates.end !== null) ||
          !!selectedCategoryFilters.length ||
          !!selectedWalletFilters.length ||
          !!selectedPayerFilters.length) && (
          <Button
            onClick={() => {
              if (confirm('Are you sure?')) {
                clearAllSelects();
              }
            }}
          >
            {i18next.t('expenses.filters.btn.clearAllFilters')}
          </Button>
        )}
      </Flex>
    </Flex>
  );
};
