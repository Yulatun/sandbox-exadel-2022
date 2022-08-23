import { instance } from './ApiProvider';

export const getIncomes = async ({
  pageParam = 1,
  IsSortByDate = false,
  IsSortByAmount = false,
  sortColumn = 'IsSortByDate',
  IsSortDescending = true
}) => {
  return instance.get('/api/v1/Transaction/Income', {
    params: {
      PageNumber: pageParam,
      IsSortByDate: IsSortByDate,
      IsSortByAmount: IsSortByAmount,
      IsSortDescending: IsSortDescending,
      [sortColumn]: false
    }
  });
};

export const createIncome = async (data) => {
  return instance.post('/api/v1/Transaction/Income', data);
};

export const editIncome = async (data) => {
  return instance.put('/api/v1/Transaction/Income', data);
};

export const deleteIncome = async (dataId) => {
  return instance.delete(`/api/v1/Transaction/Income?incomeId=${dataId}`);
};

export const getExpenses = async ({
  pageParam = 1,
  IsSortByDate = false,
  IsSortByAmount = false,
  sortColumn = 'IsSortByDate',
  IsSortDescending = true,
  DateFrom = '',
  DateTo = '',
  CategoriesFilter = [],
  WalletsFilter = [],
  PayersFilter = []
}) => {
  let paramsString = '';

  if (CategoriesFilter.length) {
    paramsString += `${
      CategoriesFilter.length ? '?' : ''
    }CategoriesFilter=${CategoriesFilter.join('&CategoriesFilter=')}`;
  }
  if (WalletsFilter.length) {
    paramsString += `${
      CategoriesFilter.length ? '&' : '?'
    }WalletsFilter=${WalletsFilter.join('&WalletsFilter=')}`;
  }
  if (PayersFilter.length) {
    paramsString += `${
      CategoriesFilter.length ? '&' : WalletsFilter.length ? '&' : '?'
    }PayersFilter=${PayersFilter.join('&PayersFilter=')}`;
  }

  return instance.get(`/api/v1/Transaction/Expense${paramsString}`, {
    params: {
      PageNumber: pageParam,
      IsSortByDate: IsSortByDate,
      IsSortByAmount: IsSortByAmount,
      IsSortDescending: IsSortDescending,
      [sortColumn]: false,
      DateFrom: DateFrom,
      DateTo: DateTo
    }
  });
};

export const createExpense = async (data) => {
  return instance.post('/api/v1/Transaction/Expense', data);
};

export const editExpense = async (data) => {
  return instance.put('/api/v1/Transaction/Expense', data);
};

export const deleteExpense = async (dataId) => {
  return instance.delete(`/api/v1/Transaction/Expense?expenseId=${dataId}`);
};
