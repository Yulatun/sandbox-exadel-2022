import { Box, Flex } from '@chakra-ui/react';

import { LoginForm } from '@/components';

export const Login = () => {
  return (
    <>
      <Box bg="bisque" w="100%" p="100px" color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <main>
            <LoginForm />
          </main>
        </Flex>
      </Box>
    </>
  );
};
