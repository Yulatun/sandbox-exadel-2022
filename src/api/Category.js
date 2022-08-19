import { instance } from './ApiProvider';

export const getCategories = async () => {
  return instance.get('/api/v1/Category');
};

export const createCategory = async (data) => {
  return instance.post('/api/v1/Category', data);
};

export const editCategory = async (data) => {
  const { categoryId } = data;
  return instance.put(`/api/v1/Category/${categoryId}`, data);
};

export const deleteCategory = async (data) => {
  const { id: categoryId } = data;
  return instance.delete(`/api/v1/Category/${categoryId}`, data);
};
