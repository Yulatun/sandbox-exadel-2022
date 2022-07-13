import { Flex, Heading, IconButton, Text } from '@chakra-ui/react';
import React, { useState } from 'react';
import Navbar from './Navbar';
import { SunIcon } from '@chakra-ui/icons';
import {
  LogoWalletIcon,
  MoonIcon,
  NotificationsIcon,
  SettingsIcon,
  UserIcon
} from '../assets';

export default function Header() {
  const [isDarkMode, setIsDark] = useState(false);
  const [isAuth, setIsAuth] = useState(false);

  return (
    <Flex
      as="header"
      justify="center"
      minH="100px"
      bgColor="#D6BCFA"
      boxShadow="2px 0 3px #322659"
    >
      <Flex
        align="center"
        justify="space-between"
        maxW="1200px"
        w="100%"
        p="15px 30px"
      >
        <Flex align="center" justify="flex-start">
          <LogoWalletIcon width="45" height="45" color="#322659" />
          <Heading as="h1" mr="25px" ml="5px" size="lg">
            BudgetTracker
          </Heading>
          {isDarkMode ? (
            <IconButton
              mr="20px"
              w="50px"
              h="50px"
              border="2px"
              borderRadius="50%"
              colorScheme="gray"
              bgColor="rgba(237, 242, 247, .2)"
              variant="outline"
              aria-label="Light theme button"
              icon={<SunIcon w="30px" h="30px" />}
              onClick={() => setIsDark(false)}
            />
          ) : (
            <IconButton
              mr="20px"
              w="50px"
              h="50px"
              border="2px"
              borderRadius="50%"
              colorScheme="gray"
              bgColor="rgba(237, 242, 247, .2)"
              variant="outline"
              aria-label="Dark theme button"
              icon={<MoonIcon color="#000" />}
              onClick={() => setIsDark(true)}
            />
          )}
        </Flex>
        <Navbar />
        <Flex>
          {isAuth ? (
            <Flex align="center">
              <Flex direction="column" align="flex-end" mr="10px" p="5px 15px">
                <Text>{'props.userName'}</Text>
                <Text>{'props.userEmail'}</Text>
              </Flex>
              <IconButton
                mr="10px"
                w="50px"
                h="50px"
                borderRadius="50%"
                colorScheme="gray"
                variant="ghost"
                aria-label="Settings"
                onClick={() => setIsAuth(false)}
                icon={<SettingsIcon color="#322659" />}
              />
              <IconButton
                w="50px"
                h="50px"
                borderRadius="50%"
                colorScheme="gray"
                variant="ghost"
                aria-label="Notifications"
                icon={<NotificationsIcon color="#322659" />}
              />
            </Flex>
          ) : (
            <IconButton
              p="0"
              w="50px"
              h="50px"
              borderRadius="50%"
              colorScheme="gray"
              variant="ghost"
              onClick={() => setIsAuth(true)}
              aria-label="LogIn button"
              icon={<UserIcon color="#322659" />}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}
