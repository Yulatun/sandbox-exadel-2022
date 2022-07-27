import { Flex, useColorModeValue } from '@chakra-ui/react';

import { LoginForm } from '@/components';

import ColorModeToggle from '../components/ColorModeToggle/ColorModeToggle';

export const Login = () => {
  const headerBgThemeColor = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <Flex
        bg={headerBgThemeColor}
        w="100%"
        justify="center"
        p="100px"
        alignItems="center"
        flexDirection="column"
      >
        <main>
          <ColorModeToggle />
          <LoginForm />
        </main>
      </Flex>
    </>
  );
};
