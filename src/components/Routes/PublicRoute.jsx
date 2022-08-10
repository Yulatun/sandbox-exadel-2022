import { Navigate } from 'react-router-dom';

import { isTokenValid } from '@/helpers/authorization';

export const PublicRoute = ({
  children,
  restricted = false,
  redirectTo = '/'
}) => {
  const shouldRedirect = isTokenValid() && restricted;

  return (
    <>
      {shouldRedirect ? <Navigate to={redirectTo} replace={false} /> : children}
    </>
  );
};
