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

export const today = new Date();
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

export const getNotCustomizedRange = ({ start: startDate, end: endDate }) => {
  if (!startDate || (!startDate && endDate)) return false;

  if (startDate && !endDate) {
    endDate = startDate;
  }

  let notCustomizedRangeName = Object.entries(datesObj).find((el) => {
    return (
      el[0] !== 'customized' &&
      format(new Date(el[1].start), 'MM/dd/yyyy') ===
        format(startDate, 'MM/dd/yyyy') &&
      format(new Date(el[1].end), 'MM/dd/yyyy') ===
        format(endDate, 'MM/dd/yyyy')
    );
  });

  if (notCustomizedRangeName) return notCustomizedRangeName[0];

  return false;
};

export const isCustomizedRange = (startDate, endDate, chosenDates) => {
  if (!chosenDates.start) return false;
  if (
    (chosenDates.start && !chosenDates.end) ||
    startDate === null ||
    endDate === null
  )
    return true;

  if (
    format(startDate, 'MM/dd/yyyy') !==
      format(chosenDates.start, 'MM/dd/yyyy') ||
    format(endDate, 'MM/dd/yyyy') !== format(chosenDates.end, 'MM/dd/yyyy')
  ) {
    return true;
  }

  return false;
};

export const getInputFormattedValue = (data) => {
  switch (data.value) {
    case 'today':
    case 'yesterday':
      return format(new Date(data.dates.start), 'dd.MM.yyyy');

    case 'thisWeek':
    case 'lastWeek':
    case 'thisMonth':
    case 'lastMonth':
      return `${format(new Date(data.dates.start), 'dd.MM.yyyy')}-${format(
        new Date(data.dates.end),
        'dd.MM.yyyy'
      )}`;

    case 'date-customized':
      if (data.dates.start === data.dates.end) {
        return format(new Date(data.dates.start), 'dd.MM.yyyy');
      }
      return `${format(new Date(data.dates.start), 'dd.MM.yyyy')}-${format(
        new Date(data.dates.end),
        'dd.MM.yyyy'
      )}`;

    default:
      return '';
  }
};
