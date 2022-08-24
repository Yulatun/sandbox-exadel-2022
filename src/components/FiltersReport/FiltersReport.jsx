import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ChevronDownIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import {
  areAllOptionsSelected,
  getTypeOfOptions,
  isAllSelectedChosen
} from '@/helpers/filtersHelpers';
import {
  getAllWalletsSortedOptions,
  getCategoriesOptions,
  getDefaultWalletData,
  getPayersOptions,
  getSelectFieldsData
} from '@/helpers/selectHelpers';
import { useCentralTheme } from '@/theme';

import { ConfirmationModal } from '../ConfirmationModal';
import { FiltersTag } from '../FiltersTag';
import { SelectControlled } from '../SelectControlled';

import { CalendarPicker } from './CalendarPicker';
import { getInputFormattedValue, today as todayDate } from './utils';

export const FiltersReport = ({
  userData,
  walletsData,
  categoriesData,
  payersData,
  selectedDateFilter,
  setSelectedDateFilter,
  onSubmit,
  setDataReportOnSubmit
}) => {
  const [chosenDates, setChosenDates] = useState({
    start: todayDate,
    end: todayDate
  });
  const [dateButtonSelected, setDateButtonSelected] = useState({
    today: true,
    yesterday: false,
    thisWeek: false,
    lastWeek: false,
    thisMonth: false,
    lastMonth: false,
    customized: false
  });
  const [isDateSelectOpen, setIsDateSelectOpen] = useState(false);

  const [isAllSelected, setIsAllSelected] = useState({
    income: true,
    expense: true,
    payer: false
  });
  const [isSelectOnFocus, setIsSelectOnFocus] = useState({
    wallet: false,
    income: false,
    expense: false,
    payer: false
  });

  const calendarRef = useRef(null);

  const resetReportModal = useDisclosure();

  const { control, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: {
      walletReport: getDefaultWalletData(userData, walletsData),
      categoryIncomeReport: [
        {
          value: 'all-categories-incomes',
          label: i18next.t('report.filters.allCategories.label')
        }
      ],
      categoryExpenseReport: [
        {
          value: 'all-categories-expenses',
          label: i18next.t('report.filters.allCategories.label')
        }
      ],
      payerReport: [{ value: payersData[0], label: payersData[0] }]
    }
  });

  const { inputSelectBg, inputSelectBorderColor } = useCentralTheme();

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
      selectedDateFilter.value === 'customized' &&
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
      selectedDateFilter.value === 'customized' &&
      !!Object.values(selectedDateFilter.dates).length &&
      !selectedDateFilter.dates.start
    ) {
      setChosenDates({
        start: todayDate,
        end: todayDate
      });
      setSelectedDateFilter({
        ...selectedDateFilter,
        dates: {
          start: todayDate,
          end: todayDate
        },
        value: 'today'
      });
      setDateButtonSelected({
        ...dateButtonSelected,
        today: true,
        customized: false
      });
    } else if (
      !isDateSelectOpen &&
      selectedDateFilter.value !== 'customized' &&
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

  const resetChosenSelect = (setState) => {
    setState((prevState) => ({
      ...prevState,
      value: 'today',
      dates: {
        start: todayDate,
        end: todayDate
      }
    }));
    setChosenDates({
      start: todayDate,
      end: todayDate
    });
    clearAllDateButtonsSelected();
    setDateButtonSelected((prevState) => ({
      ...prevState,
      today: true
    }));
    setIsDateSelectOpen(false);
  };

  const clearAllSelects = () => {
    setDataReportOnSubmit({});

    reset({
      walletReport: getDefaultWalletData(userData, walletsData),
      categoryIncomeReport: [
        {
          value: 'all-categories-incomes',
          label: i18next.t('report.filters.allCategories.label')
        }
      ],
      categoryExpenseReport: [
        {
          value: 'all-categories-expenses',
          label: i18next.t('report.filters.allCategories.label')
        }
      ],
      payerReport: [{ value: payersData[0], label: payersData[0] }]
    });

    setIsAllSelected({
      income: true,
      expense: true,
      payer: false
    });

    setChosenDates({
      start: todayDate,
      end: todayDate
    });
    clearAllDateButtonsSelected();
    setIsDateSelectOpen(false);

    setSelectedDateFilter({
      value: 'today',
      dates: {
        start: todayDate,
        end: todayDate
      }
    });

    resetReportModal.onClose();
  };

  const checkAllOptions = (data) => {
    const allSelectedValue = data?.filter(
      (dataElement) =>
        dataElement.value == 'all-categories-incomes' ||
        dataElement.value == 'all-categories-expenses' ||
        dataElement.value == 'all-payers'
    )[0]?.value;

    switch (
      getTypeOfOptions({ data, categoriesData, payersData }) ||
      allSelectedValue
    ) {
      case 'categoryIncomeReport':
      case 'all-categories-incomes':
        if (
          (!isAllSelected.income && isAllSelectedChosen(data)) ||
          areAllOptionsSelected({ data, categoriesData, payersData })
        ) {
          setValue('categoryIncomeReport', [
            {
              value: 'all-categories-incomes',
              label: i18next.t('report.filters.allCategories.label')
            }
          ]);
          setIsAllSelected((prevState) => ({ ...prevState, income: true }));
        } else if (
          isAllSelected.income &&
          isAllSelectedChosen(data) &&
          data?.length > 1
        ) {
          setValue(
            'categoryIncomeReport',
            [...data]?.filter(
              (dataElement) => dataElement.value !== 'all-categories-incomes'
            )
          );
          setIsAllSelected((prevState) => ({ ...prevState, income: false }));
        } else if (isAllSelected.income && !allSelectedValue) {
          setIsAllSelected((prevState) => ({ ...prevState, income: false }));
        }

        break;

      case 'categoryExpenseReport':
      case 'all-categories-expenses':
        if (
          (!isAllSelected.expense && isAllSelectedChosen(data)) ||
          areAllOptionsSelected({ data, categoriesData, payersData })
        ) {
          setValue('categoryExpenseReport', [
            {
              value: 'all-categories-expenses',
              label: i18next.t('report.filters.allCategories.label')
            }
          ]);
          setIsAllSelected((prevState) => ({ ...prevState, expense: true }));
        } else if (
          isAllSelected.expense &&
          isAllSelectedChosen(data) &&
          data?.length > 1
        ) {
          setValue(
            'categoryExpenseReport',
            [...data]?.filter(
              (dataElement) => dataElement.value !== 'all-categories-expenses'
            )
          );
          setIsAllSelected((prevState) => ({ ...prevState, expense: false }));
        } else if (isAllSelected.expense && !allSelectedValue) {
          setIsAllSelected((prevState) => ({ ...prevState, expense: false }));
        }

        break;

      case 'payerReport':
      case 'all-payers':
        if (
          (!isAllSelected.payer && isAllSelectedChosen(data)) ||
          areAllOptionsSelected({ data, categoriesData, payersData })
        ) {
          setValue('payerReport', [
            {
              value: 'all-payers',
              label: i18next.t('report.filters.allPayers.label')
            }
          ]);
          setIsAllSelected((prevState) => ({ ...prevState, payer: true }));
        } else if (
          isAllSelected.payer &&
          isAllSelectedChosen(data) &&
          data?.length > 1
        ) {
          setValue(
            'payerReport',
            [...data]?.filter(
              (dataElement) => dataElement.value !== 'all-payers'
            )
          );
          setIsAllSelected((prevState) => ({ ...prevState, payer: false }));
        } else if (isAllSelected.payer && !allSelectedValue) {
          setIsAllSelected((prevState) => ({ ...prevState, payer: false }));
        }

        break;
    }
  };

  const resetSelectValueOnReset = (nameOfSelect) => {
    switch (nameOfSelect) {
      case 'walletReport':
        setValue('walletReport', getDefaultWalletData(userData, walletsData));
        break;

      case 'categoryIncomeReport':
        setValue('categoryIncomeReport', []);
        break;

      case 'categoryExpenseReport':
        setValue('categoryExpenseReport', []);
        break;

      case 'payerReport':
        setValue('payerReport', [
          { value: payersData[0], label: payersData[0] }
        ]);
        break;
    }
  };

  const removeTagOnClose = (event) => {
    const typeChecked = event.currentTarget.getAttribute('id');
    const valueChecked = event.currentTarget.getAttribute('value');

    switch (typeChecked) {
      case 'walletReport':
        if (valueChecked !== userData.defaultWallet) {
          setValue('walletReport', getDefaultWalletData(userData, walletsData));
        }
        break;

      case 'dateReport':
        if (valueChecked !== 'today') {
          resetChosenSelect(setSelectedDateFilter);
        }
        break;

      case 'categoryIncomeReport':
      case 'categoryExpenseReport':
      case 'payerReport':
        if (typeChecked === 'payerReport' && watch('payerReport').length <= 1) {
          setValue('payerReport', [
            { value: payersData[0], label: payersData[0] }
          ]);

          break;
        }

        setValue(
          typeChecked,
          [...watch(typeChecked)].filter(
            (element) => element.value !== valueChecked
          )
        );

        break;
    }
  };

  return (
    <>
      <Flex flexWrap="wrap" w="100%">
        <Flex
          pos="relative"
          alignItems="center"
          mr="20px"
          pr="34px"
          minW="200px"
        >
          <SelectControlled
            zIndex={isSelectOnFocus.wallet ? 9 : 5}
            nameOfSelect="walletReport"
            control={control}
            listOfOptions={getAllWalletsSortedOptions(userData)}
            isRequiredData
            data={walletsData}
            closeMenuOnSelect={false}
            setIsSelectOnFocus={setIsSelectOnFocus}
          />
          {!!watch('walletReport') &&
            watch('walletReport')?.value !== userData.defaultWallet && (
              <IconButton
                pos="absolute"
                right="0"
                bottom="25px"
                size="xs"
                borderRadius="50%"
                variant="secondary"
                aria-label={i18next.t('report.filters.btn.removeFilter')}
                icon={<CloseIcon />}
                onClick={() => resetSelectValueOnReset('walletReport')}
              />
            )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="20px"
          pr="34px"
          maxW="220px"
          w="100%"
          ref={calendarRef}
        >
          <FormControl mb="20px" isRequired>
            <FormLabel htmlFor={'dateReport'}>
              {getSelectFieldsData('dateReport').label}
            </FormLabel>
            <InputGroup onClick={() => setIsDateSelectOpen(!isDateSelectOpen)}>
              <Input
                textAlign="left"
                type="text"
                readOnly
                value={i18next.t(
                  `report.filters.date.value.${selectedDateFilter?.value}`
                )}
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
          </FormControl>
          {!!isDateSelectOpen && (
            <Box pos="absolute" top="80px" zIndex="9">
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
          {selectedDateFilter.value !== 'today' &&
            !!Object.values(selectedDateFilter.dates).length &&
            selectedDateFilter.dates.end !== null && (
              <IconButton
                pos="absolute"
                right="0"
                bottom="25px"
                size="xs"
                borderRadius="50%"
                variant="secondary"
                aria-label={i18next.t('report.filters.btn.removeFilter')}
                icon={<CloseIcon />}
                onClick={() => resetChosenSelect(setSelectedDateFilter)}
              />
            )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="20px"
          pr="34px"
          minW="245px"
        >
          <SelectControlled
            zIndex={isSelectOnFocus.income ? 9 : 5}
            nameOfSelect="categoryIncomeReport"
            control={control}
            listOfOptions={[
              {
                value: 'all-categories-incomes',
                label: i18next.t('report.filters.allCategories.label')
              },
              ...getCategoriesOptions(categoriesData, 'Income')
            ]}
            data={walletsData}
            isMulti
            closeMenuOnSelect={false}
            setIsSelectOnFocus={setIsSelectOnFocus}
            checkAllOptions={checkAllOptions}
          />
          {!!watch('categoryIncomeReport') &&
            !!watch('categoryIncomeReport').length &&
            !isSelectOnFocus.income && (
              <Text pos="absolute" bottom="29px" left="20px">
                {(watch('categoryIncomeReport')[0].value ===
                  'all-categories-incomes' &&
                  i18next.t('report.filters.allCategories.label')) ||
                  i18next.t('report.filters.customized.label')}
              </Text>
            )}
          {!!watch('categoryIncomeReport') &&
            !!watch('categoryIncomeReport').length && (
              <IconButton
                pos="absolute"
                right="0"
                bottom="25px"
                size="xs"
                borderRadius="50%"
                variant="secondary"
                aria-label={i18next.t('report.filters.btn.removeFilter')}
                icon={<CloseIcon />}
                onClick={() => resetSelectValueOnReset('categoryIncomeReport')}
              />
            )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="20px"
          pr="34px"
          minW="245px"
        >
          <SelectControlled
            zIndex={isSelectOnFocus.expense ? 9 : 5}
            nameOfSelect="categoryExpenseReport"
            control={control}
            listOfOptions={[
              {
                value: 'all-categories-expenses',
                label: i18next.t('report.filters.allCategories.label')
              },
              ...getCategoriesOptions(categoriesData, 'Expense')
            ]}
            data={walletsData}
            isMulti
            closeMenuOnSelect={false}
            setIsSelectOnFocus={setIsSelectOnFocus}
            checkAllOptions={checkAllOptions}
          />
          {!!watch('categoryExpenseReport') &&
            !!watch('categoryExpenseReport').length &&
            !isSelectOnFocus.expense && (
              <Text pos="absolute" bottom="29px" left="20px">
                {(watch('categoryExpenseReport')[0].value ===
                  'all-categories-expenses' &&
                  i18next.t('report.filters.allCategories.label')) ||
                  i18next.t('report.filters.customized.label')}
              </Text>
            )}
          {!!watch('categoryExpenseReport') &&
            !!watch('categoryExpenseReport').length && (
              <IconButton
                pos="absolute"
                right="0"
                bottom="25px"
                size="xs"
                borderRadius="50%"
                variant="secondary"
                aria-label={i18next.t('report.filters.btn.removeFilter')}
                icon={<CloseIcon />}
                onClick={() => resetSelectValueOnReset('categoryExpenseReport')}
              />
            )}
        </Flex>

        <Flex
          pos="relative"
          alignItems="center"
          mr="20px"
          pr="34px"
          minW="200px"
        >
          <SelectControlled
            zIndex={isSelectOnFocus.payer ? 9 : 5}
            nameOfSelect="payerReport"
            control={control}
            listOfOptions={[
              {
                value: 'all-payers',
                label: i18next.t('report.filters.allPayers.label')
              },
              ...getPayersOptions(payersData)
            ]}
            data={payersData}
            isDisabled={
              !!watch('categoryExpenseReport') &&
              watch('categoryExpenseReport').length
                ? false
                : true
            }
            isMulti
            closeMenuOnSelect={false}
            setIsSelectOnFocus={setIsSelectOnFocus}
            checkAllOptions={checkAllOptions}
          />
          {!!watch('categoryExpenseReport')?.length &&
            !!watch('payerReport') &&
            !!watch('payerReport').length &&
            !isSelectOnFocus.payer && (
              <Text pos="absolute" bottom="29px" left="20px">
                {(watch('payerReport')[0].value === 'all-payers' &&
                  i18next.t('report.filters.allPayers.label')) ||
                  i18next.t('report.filters.customized.label')}
              </Text>
            )}
          {!!watch('categoryExpenseReport')?.length &&
            !!watch('payerReport') &&
            (watch('payerReport').length > 1 ||
              watch('payerReport')[0]?.value !== payersData[0]) && (
              <IconButton
                pos="absolute"
                right="0"
                bottom="25px"
                size="xs"
                borderRadius="50%"
                variant="secondary"
                aria-label={i18next.t('report.filters.btn.removeFilter')}
                icon={<CloseIcon />}
                onClick={() => resetSelectValueOnReset('payerReport')}
              />
            )}
        </Flex>

        <Flex justifyContent="center" w="100%">
          <Button
            isDisabled={
              !!watch('walletReport').label &&
              (!!watch('categoryIncomeReport')?.length ||
                !!watch('categoryExpenseReport')?.length) &&
              !!watch('payerReport')?.length
                ? false
                : true
            }
            mr={4}
            onClick={handleSubmit(onSubmit)}
          >
            {i18next.t('report.button.create')}
          </Button>
          <Button
            isDisabled={
              watch('walletReport').value !== userData.defaultWallet ||
              selectedDateFilter.value !== 'today' ||
              watch('categoryIncomeReport')[0]?.value !==
                'all-categories-incomes' ||
              watch('categoryExpenseReport')[0]?.value !==
                'all-categories-expenses' ||
              watch('payerReport').length > 1 ||
              watch('payerReport')[0]?.value !== payersData[0]
                ? false
                : true
            }
            onClick={resetReportModal.onOpen}
            variant="danger"
          >
            {i18next.t('report.button.reset')}
          </Button>
        </Flex>

        <Flex
          flexWrap="wrap"
          mt="40px"
          mb="50px"
          w="100%"
          maxH="150px"
          overflowY="scroll"
        >
          {!!watch('walletReport').label &&
            ((!!watch('walletReport') &&
              watch('walletReport').value === userData.defaultWallet && (
                <FiltersTag
                  type="walletReport"
                  value={watch('walletReport').value}
                  text={watch('walletReport').label}
                  isOnClose={false}
                  onClose={removeTagOnClose}
                />
              )) || (
              <FiltersTag
                type="walletReport"
                value={watch('walletReport').value}
                text={watch('walletReport').label}
                onClose={removeTagOnClose}
              />
            ))}

          {(!!selectedDateFilter &&
            !!Object.values(selectedDateFilter.dates).length &&
            selectedDateFilter.value === 'today' && (
              <FiltersTag
                type="dateReport"
                value={selectedDateFilter.value}
                text={getInputFormattedValue(selectedDateFilter)}
                isOnClose={false}
                onClose={removeTagOnClose}
              />
            )) || (
            <FiltersTag
              type="dateReport"
              value={selectedDateFilter.value}
              text={getInputFormattedValue(selectedDateFilter)}
              onClose={removeTagOnClose}
            />
          )}

          {!!watch('categoryIncomeReport') &&
            !!watch('categoryIncomeReport').length &&
            watch('categoryIncomeReport').map((element) => (
              <FiltersTag
                key={element.value}
                type="categoryIncomeReport"
                value={element.value}
                text={element.label}
                onClose={removeTagOnClose}
                bgColor="green.500"
              />
            ))}

          {!!watch('categoryExpenseReport') &&
            !!watch('categoryExpenseReport').length &&
            watch('categoryExpenseReport').map((element) => (
              <FiltersTag
                key={element.value}
                type="categoryExpenseReport"
                value={element.value}
                text={element.label}
                onClose={removeTagOnClose}
                bgColor="red.500"
              />
            ))}

          {!!watch('categoryExpenseReport')?.length &&
            !!watch('payerReport') &&
            !!watch('payerReport').length &&
            watch('payerReport').map((element, i, arr) => {
              if (element.value === payersData[0] && arr.length === 1) {
                return (
                  <FiltersTag
                    key={element.value}
                    type="payerReport"
                    value={element.value}
                    text={element.label}
                    isOnClose={false}
                    onClose={removeTagOnClose}
                    bgColor="orange.500"
                  />
                );
              }
              return (
                <FiltersTag
                  key={element.value}
                  type="payerReport"
                  value={element.value}
                  text={element.label}
                  onClose={removeTagOnClose}
                  bgColor="orange.500"
                />
              );
            })}
        </Flex>
      </Flex>

      <ConfirmationModal
        isOpen={resetReportModal.isOpen}
        onClose={resetReportModal.onClose}
        onSubmit={clearAllSelects}
        text={i18next.t('report.modal.reset')}
      />
    </>
  );
};
