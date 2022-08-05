import { instance } from './ApiProvider';

export const getDefaultCategories = async () => {
  return instance.get('/api/DefaultCategory');
};
