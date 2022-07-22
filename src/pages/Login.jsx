import { Flex } from '@chakra-ui/react';

import { LoginForm } from '@/components';

export const Login = () => {
  return (
    <>
      <Flex
        bg="orange.100"
        w="100%"
        justify="center"
        p="100px"
        color="blueviolet"
        alignItems="center"
        flexDirection="column"
      >
        <main>
          <LoginForm />
        </main>
      </Flex>
    </>
  );
};
