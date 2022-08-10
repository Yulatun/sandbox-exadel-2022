import { Navigate } from 'react-router-dom';

import { isTokenValid, logout } from '@/helpers/authorization';

export const PrivateRoute = ({ children }) => {
  const isTokenValidValue = isTokenValid();

  if (!isTokenValidValue) logout();

  return isTokenValidValue ? children : <Navigate to="/login" />;
};
