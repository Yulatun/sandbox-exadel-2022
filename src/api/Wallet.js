import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/v1/Wallet', {
    params: { userId: 'b5b4edac-1eab-489b-9796-d03041e708fd' }
  });
};

export const createWallet = async (data, currency) => {
  return instance.post('/api/v1/Wallet', {
    userId: 'b5b4edac-1eab-489b-9796-d03041e708fd',
    name: data.name,
    currency,
    setDefault: data.setDefault
  });
};

export const deleteWallet = async (userId, walletId) => {
  return instance.delete(`/api/v1/Wallet/${userId}/${walletId}`);
};
