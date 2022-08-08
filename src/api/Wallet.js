import { instance } from './ApiProvider';

export const getWallets = async (params) => {
  const userId = params.queryKey[1];

  return instance.get(`/api/v1/Wallet?userId=${userId}`);
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
