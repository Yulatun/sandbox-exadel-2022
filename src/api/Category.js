import { instance } from './ApiProvider';

export const getCategories = async () => {
  return instance.get('/api/v1/Category');
};

export const createCategory = async (data) => {
  return instance.post('/api/v1/Category', data);
};
