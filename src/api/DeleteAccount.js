import { instance } from './ApiProvider';

export const deleteAccount = async () => {
  const id = 'c182e85e-af59-4793-ac75-e873a2d464e3';
  return instance.delete(`/api/User/${id}`);
};
