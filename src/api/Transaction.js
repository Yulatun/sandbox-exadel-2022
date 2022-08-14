import { instance } from './ApiProvider';

export const getIncomes = async () => {
  return instance.get('/api/v1/Transaction/Income');
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

export const getExpenses = async () => {
  return instance.get('/api/v1/Transaction/Expense');
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
