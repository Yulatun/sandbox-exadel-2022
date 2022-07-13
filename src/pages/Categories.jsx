import { Link } from 'react-router-dom';
import { Flex, Box } from '@chakra-ui/react';
import i18next from 'i18next';
import Header from '../components';

export const Categories = () => {
  return (
    <>
      <Header />
      <Box bg="orange.300" w="100%" p={4} color="cornsilk">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('category.welcomeMessage')}</h2>
          </main>
          <nav>
            <Link to="/">{i18next.t('category.home')}</Link>
          </nav>
        </Flex>
      </Box>
    </>
  );
};
