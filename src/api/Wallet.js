import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/Wallet');
};

export const createWallet = async (data) => {
  const response = instance.post('/api/Wallet', {
    name: data.name,
    currency: {
      currencyCode: data.currency
    }
  });
  return response;
};
