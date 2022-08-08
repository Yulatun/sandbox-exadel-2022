import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/Wallet');
};

export const createWallet = async (data, currency) => {
  return instance.post('/api/Wallet', {
    userId: '52945808-41cf-4522-b879-62dc5128dc06',
    name: data.name,
    currency,
    setDefault: data.setDefault
  });
};
