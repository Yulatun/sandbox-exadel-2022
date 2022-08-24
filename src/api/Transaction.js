import { instance } from './ApiProvider';

export const getIncomes = async ({
  pageParam = 1,
  IsSortByDate = false,
  IsSortByAmount = false,
  sortColumn = 'IsSortByDate',
  IsSortDescending = true,
  DateFrom = '',
  DateTo = '',
  CategoriesFilter = [],
  WalletsFilter = []
}) => {
  let paramsString = '';

  if (DateFrom) {
    paramsString += `?DateFrom=${DateFrom}`;
  }

  if (DateTo) {
    paramsString += DateTo ? `&DateTo=${DateTo}` : 'reset';
  }

  if (paramsString.includes('reset')) {
    paramsString = '';
  }

  if (CategoriesFilter.length) {
    paramsString += DateFrom
      ? `&CategoriesFilter=${CategoriesFilter.join('&CategoriesFilter=')}`
      : `${
          CategoriesFilter.length ? '?' : ''
        }CategoriesFilter=${CategoriesFilter.join('&CategoriesFilter=')}`;
  }

  if (WalletsFilter.length) {
    paramsString += `${
      CategoriesFilter.length || DateFrom ? '&' : '?'
    }WalletsFilter=${WalletsFilter.join('&WalletsFilter=')}`;
  }

  return instance.get(`/api/v1/Transaction/Income${paramsString}`, {
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

  if (DateFrom) {
    paramsString += `?DateFrom=${DateFrom}`;
  }

  if (DateTo) {
    paramsString += DateTo ? `&DateTo=${DateTo}` : 'reset';
  }

  if (paramsString.includes('reset')) {
    paramsString = '';
  }

  if (CategoriesFilter.length) {
    paramsString += DateFrom
      ? `&CategoriesFilter=${CategoriesFilter.join('&CategoriesFilter=')}`
      : `${
          CategoriesFilter.length ? '?' : ''
        }CategoriesFilter=${CategoriesFilter.join('&CategoriesFilter=')}`;
  }

  if (WalletsFilter.length) {
    paramsString += `${
      CategoriesFilter.length || DateFrom ? '&' : '?'
    }WalletsFilter=${WalletsFilter.join('&WalletsFilter=')}`;
  }
  if (PayersFilter.length) {
    paramsString += `${
      CategoriesFilter.length || WalletsFilter.length || DateFrom ? '&' : '?'
    }PayersFilter=${PayersFilter.join('&PayersFilter=')}`;
  }

  return instance.get(`/api/v1/Transaction/Expense${paramsString}`, {
    params: {
      PageNumber: pageParam,
      IsSortByDate: IsSortByDate,
      IsSortByAmount: IsSortByAmount,
      IsSortDescending: IsSortDescending,
      [sortColumn]: false
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
