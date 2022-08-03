import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import { Header } from './Header';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Container maxWidth="container.xl">
        <Outlet />
      </Container>
    </>
  );
};
