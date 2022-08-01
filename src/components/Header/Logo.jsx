import React from 'react';
import { Box, Flex, Heading } from '@chakra-ui/react';
import i18next from 'i18next';

import { LogoWalletIcon } from '@/assets';

import { CentralTheme } from '../../theme/theme';

export const Logo = () => {
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
          color={CentralTheme().textColor}
        />
        <Heading
          as="h1"
          size="md"
          color={CentralTheme().textColor}
          mr="16px"
          ml="16px"
        >
          {i18next.t('login.appName')}
        </Heading>
      </Flex>
    </Box>
  );
};
