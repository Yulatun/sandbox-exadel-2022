import { instance } from './ApiProvider';

// export const getIncomes = async (
//   sortColumn = 'IsSortByDate',
//   IsSortDescending = true,
//   pageParam = 1
// ) => {
//   const queryString = new URLSearchParams({
//     PageNumber: pageParam,
//     IsSortByDate: false,
//     IsSortByAmount: false,
//     IsSortDescending,
//     [sortColumn]: true
//   }).toString();
//   return instance.get(`/api/v1/Transaction/Income?${queryString}`);
// };
//
export const getIncomes = async ({ pageParam = 1 }) => {
  return instance.get(`/api/v1/Transaction/Income?PageNumber=${pageParam}`);
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

export const getExpenses = async (
  sortColumn = 'IsSortByDate',
  IsSortDescending = true,
  pageParam = 1
) => {
  const queryString = new URLSearchParams({
    PageNumber: pageParam,
    IsSortByDate: false,
    IsSortByAmount: false,
    IsSortDescending,
    [sortColumn]: true
  }).toString();
  console.log(IsSortDescending);
  return instance.get(`/api/v1/Transaction/Expense?${queryString}`);
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
