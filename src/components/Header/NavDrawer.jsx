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
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';

import { Navbar } from './Navbar';
import { UserName } from './UserName';

export const NavDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = React.useRef();
  const headerBgThemeColor = useColorModeValue('orange.100', 'teal.900');
  const iconsThemeColor = useColorModeValue('teal.900', 'orange.300');
  const userMenuBgThemeColor = useColorModeValue('orange.50', 'teal.800');

  return (
    <>
      <Flex flexGrow={{ sm: '2', md: '2', lg: '0', xl: '0' }}>
        <IconButton
          marginLeft="auto"
          borderWidth={'2px'}
          borderStyle={'solid'}
          borderColor={iconsThemeColor}
          bgColor={headerBgThemeColor}
          color={iconsThemeColor}
          ref={btnRef}
          size={'sm'}
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon fontSize={'20px'} />}
          aria-label={'Open Menu'}
          display={{ base: 'block', lg: 'none' }}
          onClick={isOpen ? onClose : onOpen}
        />
      </Flex>
      <Drawer
        size={'xs'}
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
        m={4}
      >
        <DrawerOverlay />
        <DrawerContent display={'flex'} direction={{ md: 'column' }}>
          <DrawerCloseButton
            size={'22px'}
            top={10}
            right={10}
            color={iconsThemeColor}
          />
          <DrawerHeader pt="30px" minH="100px" pl={6} bg={headerBgThemeColor}>
            <UserName />
          </DrawerHeader>
          <DrawerBody bg={userMenuBgThemeColor}>
            <Navbar />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
