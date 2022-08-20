import React from 'react';
import { Box, Flex } from '@chakra-ui/react';

import { useAutoLogout } from '@/hooks';
import { useCentralTheme } from '@/theme';

import ColorModeToggle from '../ColorModeToggle';

import { Logo } from './Logo';
import { Navbar } from './Navbar';
import { NavDrawer } from './NavDrawer';
import { NotificationsMenu } from './NotificationsMenu';
import { UserMenu } from './UserMenu';
import { UserName } from './UserName';

export const Header = (isOpen) => {
  const { bgColor, textColor } = useCentralTheme();
  const autoLogout = useAutoLogout();

  return (
    <>
      {autoLogout}
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
          maxW="container.xl"
          w="100%"
          p="15px 30px"
        >
          <Logo />
          <ColorModeToggle />

          <Box
            display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
            ml={{ base: '8px', xl: '48px' }}
            mr={{ base: '8px', xl: '48px' }}
          >
            <Navbar />
          </Box>

          <NotificationsMenu />
          <Box
            display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}
            flexBasis={{ base: '100%', md: 'auto' }}
            ml={{ base: '8px', xl: '10px' }}
            mr={{ lg: 0, xl: '10px' }}
            justifyContent="center"
          >
            <UserName />
          </Box>

          <UserMenu />

          <NavDrawer />
        </Flex>
      </Flex>
    </>
  );
};
