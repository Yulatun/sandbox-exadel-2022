import { instance } from './ApiProvider';

export const loginAction = async (data) => {
  return instance.post('/api/v1/Auth/Login', data);
};
