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
  return instance.get('/api/v1/Transaction/Expense', {
    params: {
      PageNumber: pageParam,
      IsSortByDate: IsSortByDate,
      IsSortByAmount: IsSortByAmount,
      IsSortDescending: IsSortDescending,
      [sortColumn]: false,
      DateFrom: DateFrom,
      DateTo: DateTo,
      CategoriesFilter: CategoriesFilter,
      WalletsFilter: WalletsFilter,
      PayersFilter: PayersFilter
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
