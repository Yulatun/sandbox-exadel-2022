import { instance } from './ApiProvider';

export const createSubCategory = async (data) => {
  return instance.post('/api/v1/SubCategory', data);
};
