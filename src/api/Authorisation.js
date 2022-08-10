import { instance } from './ApiProvider';

export const loginAction = async ({ email, password }) => {
  const response = instance.post('/api/v1/Auth/Login', {
    email: email,
    password: password
  });
  return response;
};
