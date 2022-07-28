import { Outlet } from 'react-router-dom';

import { PrivateRoute } from './Routes/PrivateRoute';
import { Header } from './Header';

export const AppLayout = () => {
  return (
    <>
      <PrivateRoute>
        <Header />
      </PrivateRoute>

      <Outlet />
    </>
  );
};
