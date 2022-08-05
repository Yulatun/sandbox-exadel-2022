import { instance } from './ApiProvider';

export async function getCurrency() {
  return instance.get(`api/Currency`);
}
