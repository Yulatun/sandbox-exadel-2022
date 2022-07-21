import React from 'react';
import { BellIcon } from '@chakra-ui/icons';
import {
  Flex,
  Heading,
  IconButton,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import i18next from 'i18next';

import { LogoWalletIcon } from '@/assets';
import { theme } from '@/theme';

import ColorModeToggle from '../ColorModeToggle';

import { Navbar } from './Navbar';
import { UserMenu } from './UserMenu';

export const Header = () => {
  const headerBgThemeColor = useColorModeValue('purple.200', 'purple.700');
  const iconsThemeColor = useColorModeValue('purple.900', 'white');

  return (
    <Flex
      as="header"
      justify="center"
      minH="100px"
      bg={headerBgThemeColor}
      boxShadow="base"
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        w="100%"
        p="15px 30px"
      >
        <Flex align="center" justify="flex-start">
          <LogoWalletIcon width="45" height="45" color={iconsThemeColor} />
          <Heading as="h1" mr="25px" ml="5px" size="lg">
            BudgetTracker
          </Heading>
          <ColorModeToggle initialColorMode={theme.config.initialColorMode} />
        </Flex>
        <Navbar />
        <Flex>
          <Flex align="center">
            <IconButton
              w="50px"
              h="50px"
              borderRadius="50%"
              colorScheme="gray"
              variant="ghost"
              aria-label={i18next.t('header.btn.notifications')}
              icon={<BellIcon w="30px" h="30px" />}
            />
            <Flex direction="column" align="flex-end" mr="10px" p="5px 15px">
              <Text>{'props.userName'}</Text>
              <Text>{'props.userEmail'}</Text>
            </Flex>
            <UserMenu />
          </Flex>
        </Flex>
      </Flex>
    </Flex>
  );
};
