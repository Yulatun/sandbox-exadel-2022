import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import i18next from 'i18next';

import { LogoWalletIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

export const Logo = () => {
  const { textColor } = useCentralTheme();
  return (
    <Box>
      <Flex
        w={{ base: '100%', md: 'auto', sm: 'auto' }}
        align="center"
        justify="flex-start"
      >
        <LogoWalletIcon
          width={{ base: '40px', xl: '45px' }}
          height={{ base: '40px', xl: '45px' }}
          color={textColor}
        />
        <Heading
          as="h1"
          size="md"
          color={textColor}
          mr={{ base: '16px', lg: '16px', xl: '36px' }}
          ml={{ base: '16px', lg: '36px', xl: '48px' }}
        >
          {i18next.t('login.appName')}
        </Heading>
      </Flex>
    </Box>
  );
};
