import { instance } from './ApiProvider';

export const getPayers = async () => {
  return instance.get(
    '/api/v1/User/Payers?userId=8447bcb3-c54d-49b3-83d0-bfad4320ae12'
  );
};

export const createPayer = async (data) => {
  return instance.post(
    `/api/v1/User/Payers?userId=8447bcb3-c54d-49b3-83d0-bfad4320ae12&payerName=${data.name}`
  );
};
