import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/v1/Wallet');
};

export const createWallet = async (data) => {
  return instance.post('/api/v1/Wallet', data);
};
