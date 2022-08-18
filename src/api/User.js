import { instance } from './ApiProvider';

export const getUser = async () => {
  return instance.get(`/api/v1/User`);
};

export const deleteUser = async (id) => {
  return instance.delete(`/api/v1/User/${id}`);
};

export const getPayers = async () => {
  return instance.get('/api/v1/User/Payers');
};

export const createPayer = async (dataName) => {
  return instance.post(`/api/v1/User/Payers?payerName=${dataName}`);
};

export const getTotalBalance = async (params) => {
  return instance.get(
    `/api/v1/User/GetTotalBalance?currencyCode=${params.queryKey[1]}`
  );
};
