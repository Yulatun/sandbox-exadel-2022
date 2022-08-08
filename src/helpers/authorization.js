import { LOCAL_STORAGE_API_KEY } from './constants';

export default function logout() {
  localStorage.removeItem(LOCAL_STORAGE_API_KEY);
  return window.location.replace('/login');
}
