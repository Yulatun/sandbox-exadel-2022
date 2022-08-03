import { instance } from './ApiProvider';

export const createCategory = async (data, categoryType, color) => {
  const response = instance.post('/api/Category', {
    name: data.name,
    categoryType: categoryType,
    color: color
  });
  return response;
};
