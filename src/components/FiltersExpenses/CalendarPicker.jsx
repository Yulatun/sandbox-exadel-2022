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
import {
  differenceInCalendarDays,
  format,
  isMonday,
  previousMonday,
  previousSunday,
  startOfMonth,
  startOfWeek,
  subDays,
  toDate
} from 'date-fns';
import i18next from 'i18next';

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
  const today = new Date();
  let previousMondayDate = null;

  if (isMonday(today)) {
    previousMondayDate = previousMonday(today);
  } else {
    previousMondayDate = previousMonday(previousMonday(today));
  }

  const datesObj = {
    today: {
      start: today,
      end: today
    },
    yesterday: {
      start: subDays(today, 1),
      end: subDays(today, 1)
    },
    thisWeek: {
      start: startOfWeek(today, { weekStartsOn: 1 }),
      end: today
    },
    lastWeek: {
      start: previousMondayDate,
      end: previousSunday(today)
    },
    thisMonth: {
      start: startOfMonth(today),
      end: today
    },
    lastMonth: {
      start: startOfMonth(startOfMonth(today) - 1),
      end: toDate(startOfMonth(today) - 1)
    },
    customized: {
      start: null,
      end: null
    }
  };

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

  const isCustomizedRange = (startDate, endDate) => {
    if (chosenDates.start === null || chosenDates.end === null) return false;
    if (startDate === null || endDate === null) return true;

    if (
      format(startDate, 'MM/dd/yyyy') !==
        format(chosenDates.start, 'MM/dd/yyyy') ||
      format(endDate, 'MM/dd/yyyy') !== format(chosenDates.end, 'MM/dd/yyyy')
    ) {
      return true;
    }

    return false;
  };

  const setIsCustomizedRange = ({ start: startDate, end: endDate }) => {
    if (isCustomizedRange(startDate, endDate)) {
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

    if (isDateButtonSelected.today) {
      setIsCustomizedRange(datesObj.today);
    } else if (isDateButtonSelected.yesterday) {
      setIsCustomizedRange(datesObj.yesterday);
    } else if (isDateButtonSelected.thisWeek) {
      setIsCustomizedRange(datesObj.thisWeek);
    } else if (isDateButtonSelected.lastWeek) {
      setIsCustomizedRange(datesObj.lastWeek);
    } else if (isDateButtonSelected.thisMonth) {
      setIsCustomizedRange(datesObj.thisMonth);
    } else if (isDateButtonSelected.lastMonth) {
      setIsCustomizedRange(datesObj.lastMonth);
    } else if (!!chosenDates.start || !!chosenDates.end) {
      setIsCustomizedRange({ start: null, end: null });
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
