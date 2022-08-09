import { instance } from './ApiProvider';

export const createCategory = async (data, categoryType, color) => {
  const response = instance.post('/api/v1/Category', {
    userId: 'b5b4edac-1eab-489b-9796-d03041e708fd',
    name: data.name,
    categoryType: categoryType,
    color: color
  });
  return response;
};

export const getCategory = async () => {
  return instance.get(
    '/api/v1/Category?userId=b5b4edac-1eab-489b-9796-d03041e708fd'
  );
};
