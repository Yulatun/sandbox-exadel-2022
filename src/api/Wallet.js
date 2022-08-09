import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/v1/Wallet', {
    params: { userId: 'b5b4edac-1eab-489b-9796-d03041e708fd' }
  });
};

export const createWallet = async (data) => {
  const response = instance.post('/api/v1/Wallet', {
    name: data.name,
    currency: {
      currencyCode: data.currency
    }
  });
  return response;
};
