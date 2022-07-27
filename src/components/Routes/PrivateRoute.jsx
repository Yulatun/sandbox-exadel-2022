import React from 'react';
import { Navigate } from 'react-router-dom';

import useLoginAction from '@/api/AuthHook';

export function PrivateRoute({ children }) {
  const { user } = useLoginAction();
  console.log(user);
  return user ? children : <Navigate to="/login" />;
}
