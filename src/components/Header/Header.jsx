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
        minH={24}
        bg={bgColor}
        boxShadow="headerShadow"
        color={textColor}
      >
        <Flex
          align="center"
          justify="space-between"
          maxW="container.xl"
          w="full"
          px={8}
          py={4}
        >
          <Logo />

          <ColorModeToggle />

          <Navbar />

          <NotificationsMenu />

          <Box display={{ base: isOpen ? 'none' : 'block', lg: 'block' }}>
            <UserName />
          </Box>

          <UserMenu />

          <NavDrawer />
        </Flex>
      </Flex>
    </>
  );
};
