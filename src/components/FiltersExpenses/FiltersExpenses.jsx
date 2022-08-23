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
  InputRightElement,
  useDisclosure
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import i18next from 'i18next';

import { ConfirmationModal } from '@/components';
import {
  getCategoriesOptions,
  getPayersOptions,
  getWalletsOptions
} from '@/helpers/selectHelpers';
import { useCentralTheme } from '@/theme';

import { FiltersTag } from '../FiltersTag';

import { CalendarPicker } from './CalendarPicker';
import { getInputFormattedValue } from './utils';

export const FiltersExpenses = ({
  dataWallets,
  dataCategories,
  dataPayers,
  onChange
}) => {
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
  const clearFilters = useDisclosure();
  const {
    textColor,
    inputValueColor,
    inputSelectBg,
    inputSelectBorderColor,
    popupTextColor
  } = useCentralTheme();

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
    onChange({
      dateFilter: chosenDates,
      categoryFilter: selectedCategoryFilters,
      walletFilter: selectedWalletFilters,
      payerFilter: selectedPayerFilters
    });
  }, [
    chosenDates,
    selectedCategoryFilters,
    selectedWalletFilters,
    selectedPayerFilters
  ]);

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
    clearFilters.onClose();
  };

  const removeTagOnClose = (event) => {
    const valueChecked = event.currentTarget.getAttribute('value');
    console.log(valueChecked);

    const categories = [...selectedCategoryFilters];
    const categoryIndex = categories.findIndex(
      (category) => category.value === valueChecked
    );
    if (categoryIndex !== -1) {
      categories.splice(categoryIndex, 1);
    }
    setSelectedCategoryFilters(categories);

    const wallets = [...selectedWalletFilters];
    const walletIndex = wallets.findIndex(
      (wallet) => wallet.value === valueChecked
    );
    if (walletIndex !== -1) {
      wallets.splice(walletIndex, 1);
    }
    setSelectedWalletFilters(wallets);

    const payers = [...selectedPayerFilters];
    const payerIndex = payers.findIndex(
      (payer) => payer.value === valueChecked
    );
    if (payerIndex !== -1) {
      payers.splice(payerIndex, 1);
    }
    setSelectedPayerFilters(payers);

    setSelectedDateFilter({
      value: '',
      dates: {
        start: null,
        end: null
      }
    });
  };

  return (
    <Flex flexDir="column" w="100%">
      <Heading mb="36px" as="h3" size="lg" color={textColor}>
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
          <InputGroup
            onClick={() => setIsDateSelectOpen(!isDateSelectOpen)}
            color={popupTextColor}
          >
            <Input
              maxW="300px"
              textAlign="left"
              color={
                !selectedDateFilter.value ? inputValueColor : popupTextColor
              }
              type="button"
              value={
                !selectedDateFilter.value
                  ? i18next.t('expenses.filters.date.value')
                  : selectedDateFilter.value
              }
            />
            <InputRightElement
              mt="1px"
              mr="1px"
              h="94%"
              w="54px"
              borderRightRadius="5px"
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
          <FormControl color={popupTextColor}>
            <Select
              value={selectedCategoryFilters}
              options={getCategoriesOptions(dataCategories, 'Expense')}
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
          <FormControl color={popupTextColor}>
            <Select
              value={selectedWalletFilters}
              options={getWalletsOptions(dataWallets)}
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
          mr="25px"
          mb="16px"
          pr="34px"
          minW="200px"
        >
          <FormControl color={popupTextColor}>
            <Select
              value={selectedPayerFilters}
              options={getPayersOptions(dataPayers)}
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
          <Button onClick={clearFilters.onOpen} variant="danger" minW="166px">
            {i18next.t('expenses.filters.btn.clearAllFilters')}
          </Button>
        )}
      </Flex>
      <Flex flexWrap="wrap" mt="24px" mb="42px" w="100%" maxH="150px">
        {!!selectedDateFilter &&
          !!Object.values(selectedDateFilter.dates).length &&
          selectedDateFilter.value && (
            <FiltersTag
              value={selectedDateFilter.value}
              text={getInputFormattedValue(selectedDateFilter)}
              onClose={() => clearChosenSelect(setSelectedDateFilter, true)}
              bgColor="green.400"
            />
          )}
        {selectedCategoryFilters.map((filter) => (
          <FiltersTag
            key={filter.value}
            value={filter.value}
            text={filter.label}
            onClose={removeTagOnClose}
            bgColor="red.400"
          />
        ))}
        {selectedWalletFilters.map((filter) => (
          <FiltersTag
            key={filter.value}
            value={filter.value}
            text={filter.label}
            onClose={removeTagOnClose}
            bgColor="blue.400"
          />
        ))}
        {selectedPayerFilters.map((filter) => (
          <FiltersTag
            key={filter.value}
            value={filter.value}
            text={filter.label}
            onClose={removeTagOnClose}
            bgColor="orange.400"
          />
        ))}
      </Flex>
      <ConfirmationModal
        isOpen={clearFilters.isOpen}
        onClose={clearFilters.onClose}
        onSubmit={clearAllSelects}
        text={i18next.t('modal.confirmModal.clearFilters')}
      />
    </Flex>
  );
};
