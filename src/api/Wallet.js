import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/v1/Wallet', {
    params: { userId: 'b5b4edac-1eab-489b-9796-d03041e708fd' }
  });
};

export const createWallet = async (data, currency) => {
  return instance.post('/api/v1/Wallet', {
    userId: '52945808-41cf-4522-b879-62dc5128dc06',
    name: data.name,
    currency,
    setDefault: data.setDefault
  });
};
