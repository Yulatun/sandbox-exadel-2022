import { instance } from './ApiProvider';

export const getTransactions = async () => {
  return instance.get('/api/Transaction');
};
