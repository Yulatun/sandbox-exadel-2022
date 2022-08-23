import { instance } from './ApiProvider';

export const createSubCategory = async (data) => {
  return instance.post('/api/v1/SubCategory', data);
};

export const deleteSubCategory = async (categoryId, subCategoryId) => {
  return instance.delete('/api/v1/SubCategory', {
    params: {
      categoryId: categoryId,
      subCategoryId: subCategoryId
    }
  });
};
