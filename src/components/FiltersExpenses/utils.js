import {
  format,
  isMonday,
  previousMonday,
  previousSunday,
  startOfMonth,
  startOfWeek,
  subDays,
  toDate
} from 'date-fns';

const today = new Date();
let previousMondayDate = null;

if (isMonday(today)) {
  previousMondayDate = previousMonday(today);
} else {
  previousMondayDate = previousMonday(previousMonday(today));
}

export const datesObj = {
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

export const isCustomizedRange = (startDate, endDate, chosenDates) => {
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
