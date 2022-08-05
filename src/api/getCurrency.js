import { instance } from '../api/ApiProvider';

export default async function getCurrency() {
  return instance.get(`api/Currency`);
}
