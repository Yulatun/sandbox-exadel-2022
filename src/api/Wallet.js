import { instance } from './ApiProvider';

export const getWallets = async () => {
  return instance.get('/api/v1/Wallet');
};

export const getAllWallets = async () => {
  return instance.get('/api/v1/Wallet/All');
};

export const createWallet = async (data) => {
  return instance.post('/api/v1/Wallet', data);
};

export const deleteWallet = async (dataId) => {
  return instance.delete(`/api/v1/Wallet/${dataId}`);
};

export const editWallet = async (isDefault, data) => {
  return instance.put(`/api/v1/Wallet?isDefault=${isDefault}`, data);
};
