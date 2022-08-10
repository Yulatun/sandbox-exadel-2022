import { instance } from './ApiProvider';

export const getDefaultCategories = async () => {
  return instance.get('/api/v1/DefaultCategory');
};
