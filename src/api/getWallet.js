import { instance } from '../api/ApiProvider';

export default async function getWallets(userId) {
  return instance.get(`api/Wallet?userId=${userId}`);
}
