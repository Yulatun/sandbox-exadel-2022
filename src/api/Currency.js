import { instance } from './ApiProvider';

export const getCurrencies = async () => {
  return instance.get(`/api/v1/Currency`);
};
