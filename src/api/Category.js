import { instance } from './ApiProvider';

export const createCategory = async (data, categoryType, color) => {
  const response = instance.post('/api/v1/Category', {
    userId: '34e7bbf8-1685-4fb8-8a77-7964ec3e90ca',
    name: data.name,
    categoryType: categoryType,
    color: color
  });
  return response;
};

export const getCategory = async () => {
  return instance.get(
    '/api/v1/Category?userId=34e7bbf8-1685-4fb8-8a77-7964ec3e90ca'
  );
};
