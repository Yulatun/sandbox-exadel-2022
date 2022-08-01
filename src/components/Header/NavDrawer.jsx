import React from 'react';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  Flex,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { CentralTheme } from '../../theme/theme';

import { Navbar } from './Navbar';
import { UserName } from './UserName';

export const NavDrawer = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();

  return (
    <>
      <Flex flexGrow={{ sm: '2', md: '2', lg: '0', xl: '0' }}>
        <IconButton
          marginLeft="auto"
          borderWidth="2px"
          borderStyle="solid"
          borderColor={CentralTheme().textColor}
          bgColor={CentralTheme().bgColor}
          color={CentralTheme().textColor}
          ref={btnRef}
          size="sm"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon fontSize="20px" />}
          aria-label={i18next.t('header.drawer.open')}
          display={{ base: 'block', lg: 'none' }}
          onClick={onToggle}
        />
      </Flex>
      <Drawer
        size="xs"
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        m={4}
      >
        <DrawerOverlay />
        <DrawerContent display={'flex'} direction={{ md: 'column' }}>
          <DrawerCloseButton
            size="22px"
            top={10}
            right={10}
            color={CentralTheme().textColor}
          />
          <DrawerHeader
            pt="30px"
            minH="100px"
            pl={6}
            bg={CentralTheme().bgColor}
          >
            <UserName />
          </DrawerHeader>
          <DrawerBody bg={CentralTheme().popupBgColor}>
            <Navbar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
