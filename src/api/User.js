import { instance } from './ApiProvider';

export const getUser = async (params) => {
  return instance.get(`/api/v1/User/${params.queryKey[1]}`);
};
