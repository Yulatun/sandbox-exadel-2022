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

import { datesObj, getNotCustomizedRange, isCustomizedRange } from './utils';

export const CalendarPicker = ({
  clearAllDateButtonsSelected,
  chosenDates,
  setChosenDates,
  dateButtonSelected,
  setDateButtonSelected,
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
    if (dateButtonSelected[period]) clearDatesAndValues();

    let isSelected = dateButtonSelected[period];

    clearAllDateButtonsSelected();
    setDateButtonSelected((prevState) => ({
      ...prevState,
      [period]: !isSelected
    }));
  };

  const changeToRightRange = ({ start: startDate, end: endDate }) => {
    let chosenRange = getNotCustomizedRange(chosenDates);

    if (isCustomizedRange(startDate, endDate, chosenDates) && !chosenRange) {
      setSelectedDateFilter({
        value: 'date-customized',
        dates: chosenDates
      });
      clearAllDateButtonsSelected();
      setDateButtonSelected((prevState) => ({
        ...prevState,
        customized: true
      }));
    } else if (chosenRange) {
      setSelectedDateFilter({
        value: chosenRange,
        dates: datesObj[chosenRange]
      });
      clearAllDateButtonsSelected();
      setDateButtonSelected((prevState) => ({
        ...prevState,
        [chosenRange]: true
      }));
    }
  };

  const setDay = (event, day) => {
    setChosenDates(datesObj[day]);

    setSelectedDateFilter({
      ...selectedDateFilter,
      value: event.target.dataset.value
    });

    setIsCheckedIcon(day);
  };

  useEffect(() => {
    if (chosenDates.start && !chosenDates.end) {
      setDaysNum(
        differenceInCalendarDays(chosenDates.start, chosenDates.start) + 1 || 0
      );
    } else {
      setDaysNum(
        differenceInCalendarDays(chosenDates.end, chosenDates.start) + 1 || 0
      );
    }

    setSelectedDateFilter({ ...selectedDateFilter, dates: chosenDates });

    switch (true) {
      case dateButtonSelected.today:
        changeToRightRange(datesObj.today);
        break;
      case dateButtonSelected.yesterday:
        changeToRightRange(datesObj.yesterday);
        break;
      case dateButtonSelected.thisWeek:
        changeToRightRange(datesObj.thisWeek);
        break;
      case dateButtonSelected.lastWeek:
        changeToRightRange(datesObj.lastWeek);
        break;
      case dateButtonSelected.thisMonth:
        changeToRightRange(datesObj.thisMonth);
        break;
      case dateButtonSelected.lastMonth:
        changeToRightRange(datesObj.lastMonth);
        break;
      case !!chosenDates.start || !!chosenDates.end:
        changeToRightRange({ start: null, end: null });
        break;
    }
  }, [chosenDates]);

  return (
    <Flex alignItems="stretch" rounded="md" overflow="hidden">
      <List p="20px 0" w="200px">
        {Object.entries(dateButtonSelected).map((el) => (
          <ListItem
            key={el[0]}
            data-value={el[0]}
            onClick={(event) => setDay(event, el[0])}
          >
            {dateButtonSelected[el[0]] && (
              <ListIcon w="13px" h="13px" as={CheckIcon} />
            )}
            {i18next.t(`expenses.filters.date.calendar.${el[0]}`)}
            {el[0] === 'customized' && (
              <CalendarIcon ml="5px" w="18px" h="18px" />
            )}
          </ListItem>
        ))}
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
            {i18next.t('expenses.filters.date.calendar.range.day', {
              count: daysNum
            })}
          </Text>
        </Box>
      </Calendar>
    </Flex>
  );
};
