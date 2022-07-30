import { Navigate } from 'react-router-dom';

export function PublicRoute({
  children,
  restricted = false,
  redirectTo = '/'
}) {
  const token = localStorage.getItem('token');
  const shouldRedirect = token && restricted;
  return (
    <>
      {shouldRedirect ? <Navigate to={redirectTo} replace={false} /> : children}
    </>
  );
}
