import { instance } from './ApiProvider';

export const deleteAccount = async () => {
  const id = 'b5b4edac-1eab-489b-9796-d03041e708fd';
  return instance.delete(`/api/v1/User/${id}`);
};
