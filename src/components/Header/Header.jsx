import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import ColorModeToggle from '../ColorModeToggle';

import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { NavDrawer } from './NavDrawer';
import { Notification } from './Notification';
import { UserMenu } from './UserMenu';
import { UserName } from './UserName';

export const Header = (isOpen) => {
  const headerBgThemeColor = useColorModeValue('orange.100', 'teal.900');
  const headerTextColor = useColorModeValue('teal.900', 'orange.300');
  return (
    <Flex
      as="header"
      justify="center"
      minH="100px"
      bg={headerBgThemeColor}
      boxShadow="headerShadow"
      color={headerTextColor}
    >
      <Flex
        align="center"
        justify="space-between"
        maxWidth="1200px"
        w={'100%'}
        p="15px 30px"
      >
        <Logo />
        <ColorModeToggle />
        <Box
          display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
          ml={{ base: '24px', xl: '48px' }}
          mr={{ base: '24px', xl: '48px' }}
        >
          <Navbar />
        </Box>
        <Notification />
        <Box
          display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
          ml={{ base: '24px', xl: '36px' }}
          mr={{ base: '24px', xl: '36px' }}
        >
          <UserName />
        </Box>
        <UserMenu />
        <NavDrawer />
      </Flex>
    </Flex>
  );
};
