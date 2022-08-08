import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/v1/Wallet');
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

export const deleteWallet = async (userId, walletId) => {
  return instance.delete(`/api/v1/Wallet/${userId}/${walletId}`);
};
