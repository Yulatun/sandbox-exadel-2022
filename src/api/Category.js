import { instance } from './ApiProvider';

export const getCategories = async () => {
  return instance.get('/api/v1/Category');
};

export const editCategory = async (data) => {
  return instance.put('/api/v1/Category', data);
};

export const createCategory = async (data) => {
  return instance.post('/api/v1/Category', data);
};
