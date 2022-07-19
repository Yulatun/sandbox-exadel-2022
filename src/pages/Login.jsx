import { Box, Flex } from '@chakra-ui/react';
import i18next from 'i18next';

import { LoginForm } from '@/components';

export const Login = () => {
  return (
    <>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('login.welcomeMessage')}</h2>
            <LoginForm />
          </main>
        </Flex>
      </Box>
    </>
  );
};
