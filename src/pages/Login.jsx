import { Box, Flex } from '@chakra-ui/react';

import { LoginForm } from '@/components';
import { useCentralTheme } from '@/theme';

import ColorModeToggle from '../components/ColorModeToggle/ColorModeToggle';
export const Login = () => {
  const { bgColor } = useCentralTheme();

  return (
    <Flex
      as="main"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      w="100%"
      h="100%"
      bg={bgColor}
    >
      <Box>
        <ColorModeToggle />
        <LoginForm />
      </Box>
    </Flex>
  );
};
