import { instance } from './ApiProvider';

export const createCategory = async (data, categoryType, color) => {
  const response = instance.post('/api/Category', {
    userId: 'c182e85e-af59-4793-ac75-e873a2d464e3',
    name: data.name,
    categoryType: categoryType,
    color: color
  });
  return response;
};

export const getCategory = async () => {
  return instance.get(
    '/api/Category?userId=c182e85e-af59-4793-ac75-e873a2d464e3'
  );
};
