import { instance } from './ApiProvider';

export const createWallet = async (data) => {
  const response = instance.post('/api/Wallet', {
    name: data.name,
    currency: {
      currencyCode: data.currency
    }
  });
  return response;
};
