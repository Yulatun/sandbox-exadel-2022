import React from 'react';
import { Navigate } from 'react-router-dom';

import useLoginAction from '@/api/AuthHook';

export function PrivateRoute({ children }) {
  const { user } = useLoginAction();
  return user ? children : <Navigate to="/login" />;
}
