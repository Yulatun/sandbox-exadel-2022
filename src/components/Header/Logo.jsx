import React from 'react';
import { Box, Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import i18next from 'i18next';

import { LogoWalletIcon } from '@/assets';

export const Logo = () => {
  const iconsThemeColor = useColorModeValue('teal.900', 'orange.300');
  const headerTextColor = useColorModeValue('teal.900', 'orange.300');
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
          color={iconsThemeColor}
        />
        <Heading as="h1" size="md" color={headerTextColor} mr="16px" ml="16px">
          {i18next.t('login.appName')}
        </Heading>
      </Flex>
    </Box>
  );
};
