import { createContext } from 'react';
import { useQuery } from 'react-query';
import jwtDecode from 'jwt-decode';

import { getUser } from '@/api/User';

export const AuthContext = createContext([]);

export const AuthProvider = ({ children }) => {
  const token = localStorage.getItem('token');
  let userId;

  if (token) {
    const tokenUserData = token ? jwtDecode(token) : { UserId: '' };

    userId = tokenUserData.UserId;
  }

  const { data: dataUser } = useQuery(['userData', userId], getUser);

  return (
    <>
      <AuthContext.Provider
        value={{ userData: token ? dataUser.data : undefined }}
      >
        {children}
      </AuthContext.Provider>
    </>
  );
};
