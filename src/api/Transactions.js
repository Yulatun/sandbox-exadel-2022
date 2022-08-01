import { instance } from './ApiProvider';

export const getTransactions = async () => {
  const response = await instance.get('/api/Transaction');
  return response;
};
