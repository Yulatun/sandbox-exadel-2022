import { Outlet } from 'react-router-dom';
import { Container } from '@chakra-ui/react';

import { Footer } from './Footer';
import { Header } from './Header';

export const AppLayout = () => {
  return (
    <>
      <Header />
      <Container flexGrow="1" maxWidth="container.xl">
        <Outlet />
      </Container>
      <Footer />
    </>
  );
};
