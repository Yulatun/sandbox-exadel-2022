import { Flex } from '@chakra-ui/react';

import { LoginForm } from '@/components';
import { useCentralTheme } from '@/theme';

import ColorModeToggle from '../components/ColorModeToggle/ColorModeToggle';
export const Login = () => {
  const { bgColor } = useCentralTheme();

  return (
    <Flex
      bg={bgColor}
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
  );
};
