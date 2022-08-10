import jwtDecode from 'jwt-decode';

import { LOCAL_STORAGE_API_KEY } from './constants';

export const isTokenValid = () => {
  const token = localStorage.getItem(LOCAL_STORAGE_API_KEY);

  if (!token) return false;

  const tokenUserData = jwtDecode(token);

  return tokenUserData.exp < new Date().getTime();
};

export const logout = () => {
  localStorage.removeItem(LOCAL_STORAGE_API_KEY);

  return window.location.replace('/login');
};
