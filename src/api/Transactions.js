import { instance } from './ApiProvider';

export const getTransactions = async () => {
  return instance.get('/api/v1/Transaction');
};

export const editTransaction = async (data) => {
  return instance.put('/api/v1/Transaction', data);
};

export const deleteTransaction = async (id) => {
  return instance.delete(`/api/v1/Transaction/${id}`);
};
