import { instance } from './ApiProvider';

export const getTransactions = async () => {
  return instance.get('/api/Transaction');
};

export const editTransaction = async (data) => {
  return instance.put('/api/Transaction', data);
};

export const deleteTransaction = async (id) => {
  return instance.delete(`/api/Transaction/${id}`);
};
