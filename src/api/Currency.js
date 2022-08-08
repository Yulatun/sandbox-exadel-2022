import { instance } from './ApiProvider';

export async function getCurrency() {
  return instance.get(`api/v1/Currency`);
}
