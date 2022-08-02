import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { useCentralTheme } from '../../theme/theme';
import ColorModeToggle from '../ColorModeToggle';

import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { NavDrawer } from './NavDrawer';
import { Notification } from './Notification';
import { UserMenu } from './UserMenu';
import { UserName } from './UserName';

export const Header = (isOpen) => {
  const { bgColor, textColor } = useCentralTheme();
  return (
    <Flex
      as="header"
      justify="center"
      minH="100px"
      bg={bgColor}
      boxShadow="headerShadow"
      color={textColor}
    >
      <Flex
        align="center"
        justify="space-between"
        maxWidth="container.xl"
        w="100%"
        p="15px 30px"
      >
        <Logo />
        <ColorModeToggle />
        <Box
          display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
          ml={{ base: '16px', xl: '48px' }}
          mr={{ base: '16px', xl: '48px' }}
        >
          <Navbar />
        </Box>
        <Notification />
        <Box
          display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}
          flexBasis={{ base: '100%', md: 'auto' }}
          ml={{ base: '16px', xl: '36px' }}
          mr={{ base: '16px', xl: '36px' }}
        >
          <UserName />
        </Box>
        <UserMenu />
        <NavDrawer />
      </Flex>
    </Flex>
  );
};
