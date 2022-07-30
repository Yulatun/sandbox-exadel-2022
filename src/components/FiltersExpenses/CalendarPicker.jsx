import { useEffect, useState } from 'react';
import { CalendarIcon, CheckIcon } from '@chakra-ui/icons';
import { Box, Flex, List, ListIcon, ListItem, Text } from '@chakra-ui/react';
import {
  Calendar,
  CalendarControls,
  CalendarDays,
  CalendarMonth,
  CalendarMonthName,
  CalendarMonths,
  CalendarNextButton,
  CalendarPrevButton,
  CalendarWeek
} from '@uselessdev/datepicker';
import { differenceInCalendarDays } from 'date-fns';
import i18next from 'i18next';

import { datesObj, isCustomizedRange } from './utils';

export const CalendarPicker = ({
  clearAllDateButtonsSelected,
  chosenDates,
  setChosenDates,
  isDateButtonSelected,
  setIsDateButtonSelected,
  selectedDateFilter,
  setSelectedDateFilter
}) => {
  const [daysNum, setDaysNum] = useState(0);

  const handleSelectDate = (chosenDates) => setChosenDates(chosenDates);

  const clearDatesAndValues = () => {
    setChosenDates({
      start: null,
      end: null
    });
    setSelectedDateFilter({
      ...selectedDateFilter,
      value: ''
    });
  };

  const setIsCheckedIcon = (period) => {
    if (isDateButtonSelected[period]) clearDatesAndValues();

    let isSelected = isDateButtonSelected[period];

    clearAllDateButtonsSelected();
    setIsDateButtonSelected((prevState) => ({
      ...prevState,
      [period]: !isSelected
    }));
  };

  const changeToCustomizedRange = ({ start: startDate, end: endDate }) => {
    if (isCustomizedRange(startDate, endDate, chosenDates)) {
      setSelectedDateFilter({
        value: 'date-customized',
        dates: chosenDates
      });
      clearAllDateButtonsSelected();
      setIsDateButtonSelected((prevState) => ({
        ...prevState,
        customized: true
      }));
    }
  };

  const setTodayDay = (event) => {
    setChosenDates(datesObj.today);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('today');
  };

  const setYesterdayDay = (event) => {
    setChosenDates(datesObj.yesterday);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('yesterday');
  };

  const setThisWeek = (event) => {
    setChosenDates(datesObj.thisWeek);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('thisWeek');
  };

  const setLastWeek = (event) => {
    setChosenDates(datesObj.lastWeek);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('lastWeek');
  };

  const setThisMonth = (event) => {
    setChosenDates(datesObj.thisMonth);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('thisMonth');
  };

  const setLastMonth = (event) => {
    setChosenDates(datesObj.lastMonth);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('lastMonth');
  };

  const setCustomizedRange = (event) => {
    setChosenDates(datesObj.customized);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon('customized');
  };

  useEffect(() => {
    setDaysNum(
      differenceInCalendarDays(chosenDates.end, chosenDates.start) + 1 || 0
    );

    setSelectedDateFilter({ ...selectedDateFilter, dates: chosenDates });

    switch (true) {
      case isDateButtonSelected.today:
        changeToCustomizedRange(datesObj.today);
        break;
      case isDateButtonSelected.yesterday:
        changeToCustomizedRange(datesObj.yesterday);
        break;
      case isDateButtonSelected.thisWeek:
        changeToCustomizedRange(datesObj.thisWeek);
        break;
      case isDateButtonSelected.lastWeek:
        changeToCustomizedRange(datesObj.lastWeek);
        break;
      case isDateButtonSelected.thisMonth:
        changeToCustomizedRange(datesObj.thisMonth);
        break;
      case isDateButtonSelected.lastMonth:
        changeToCustomizedRange(datesObj.lastMonth);
        break;
      case !!chosenDates.start || !!chosenDates.end:
        changeToCustomizedRange({ start: null, end: null });
        break;
    }
  }, [chosenDates]);

  return (
    <Flex alignItems="stretch" rounded="md" overflow="hidden">
      <List p="20px 0" w="200px">
        <ListItem data-value="date-today" onClick={setTodayDay}>
          {isDateButtonSelected.today && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}
          {i18next.t('expenses.filters.date.calendar.today')}
        </ListItem>
        <ListItem data-value="date-yesterday" onClick={setYesterdayDay}>
          {isDateButtonSelected.yesterday && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}

          {i18next.t('expenses.filters.date.calendar.yesterday')}
        </ListItem>
        <ListItem data-value="date-thisWeek" onClick={setThisWeek}>
          {isDateButtonSelected.thisWeek && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}
          {i18next.t('expenses.filters.date.calendar.thisWeek')}
        </ListItem>
        <ListItem data-value="date-lastWeek" onClick={setLastWeek}>
          {isDateButtonSelected.lastWeek && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}
          {i18next.t('expenses.filters.date.calendar.lastWeek')}
        </ListItem>
        <ListItem data-value="date-thisMonth" onClick={setThisMonth}>
          {isDateButtonSelected.thisMonth && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}
          {i18next.t('expenses.filters.date.calendar.thisMonth')}
        </ListItem>
        <ListItem data-value="date-lastMonth" onClick={setLastMonth}>
          {isDateButtonSelected.lastMonth && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}
          {i18next.t('expenses.filters.date.calendar.lastMonth')}
        </ListItem>
        <ListItem data-value="date-customized" onClick={setCustomizedRange}>
          {isDateButtonSelected.customized && (
            <ListIcon w="13px" h="13px" as={CheckIcon} />
          )}
          {i18next.t('expenses.filters.date.calendar.customized')}
          <CalendarIcon ml="5px" w="18px" h="18px" />
        </ListItem>
      </List>

      <Calendar
        value={chosenDates}
        onSelectDate={handleSelectDate}
        weekStartsOn={1}
        highlightToday
        allowOutsideDays
      >
        <Box position="relative" pb="10px">
          <CalendarControls>
            <CalendarPrevButton />
            <CalendarNextButton />
          </CalendarControls>

          <CalendarMonths>
            <CalendarMonth>
              <CalendarMonthName />
              <CalendarWeek />
              <CalendarDays />
            </CalendarMonth>
          </CalendarMonths>

          <Text ml="10px">
            {i18next.t('expenses.filters.date.calendar.range.name')}
            {daysNum}{' '}
            {daysNum === 1
              ? i18next.t('expenses.filters.date.calendar.range.day')
              : i18next.t('expenses.filters.date.calendar.range.days')}
          </Text>
        </Box>
      </Calendar>
    </Flex>
  );
};
