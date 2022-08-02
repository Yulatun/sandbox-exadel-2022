import { instance } from './ApiProvider';

export const getTransactions = async () => {
  return instance.get('/api/Transaction');
};

export const deleteTransactions = async (id) => {
  return instance.delete(`/api/Transaction/${id}`);
};
