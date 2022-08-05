import React from 'react';
import { Link } from 'react-router-dom';
import { CloseIcon, HamburgerIcon } from '@chakra-ui/icons';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
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

import { useCentralTheme } from '@/theme';

import { UserName } from './UserName';

export const NavDrawer = () => {
  const { isOpen, onClose, onToggle } = useDisclosure();
  const btnRef = React.useRef();
  const { bgColor, popupBgColor, textColor } = useCentralTheme();

  return (
    <>
      <Flex flexGrow={{ sm: '2', md: '2', lg: '0', xl: '0' }}>
        <IconButton
          marginLeft="auto"
          borderWidth="2px"
          borderStyle="solid"
          borderColor={textColor}
          bgColor={bgColor}
          color={textColor}
          ref={btnRef}
          size="sm"
          icon={isOpen ? <CloseIcon /> : <HamburgerIcon fontSize="20px" />}
          aria-label={i18next.t('header.drawer.open')}
          display={{ base: 'block', lg: 'none' }}
          onClick={onToggle}
          _hover={{
            bgColor: textColor,
            color: bgColor
          }}
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
            color={textColor}
          />
          <DrawerHeader pt="30px" minH="100px" pl={6} bg={bgColor}>
            <UserName />
          </DrawerHeader>
          <DrawerBody bg={popupBgColor}>
            <Breadcrumb
              spacing="16px"
              separator=""
              fontSize="xl"
              color={textColor}
              fontWeight="bold"
              sx={{
                ol: {
                  display: 'flex',
                  alignItems: 'flex-start',
                  flexDirection: 'column'
                }
              }}
            >
              <BreadcrumbItem mt={6} mb={2}>
                <BreadcrumbLink
                  as={Link}
                  to="/"
                  textUnderlineOffset="4px"
                  onClick={onClose}
                >
                  {i18next.t('header.navigation.home')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem my={2}>
                <BreadcrumbLink
                  as={Link}
                  to="/incomes"
                  textUnderlineOffset="4px"
                  onClick={onClose}
                >
                  {i18next.t('header.navigation.incomes')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem my={2}>
                <BreadcrumbLink
                  as={Link}
                  to="/categories"
                  textUnderlineOffset="4px"
                  onClick={onClose}
                >
                  {i18next.t('header.navigation.categories')}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbItem my={2}>
                <BreadcrumbLink
                  as={Link}
                  to="/expenses"
                  textUnderlineOffset="4px"
                  onClick={onClose}
                >
                  {i18next.t('header.navigation.expenses')}
                </BreadcrumbLink>
              </BreadcrumbItem>
            </Breadcrumb>
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};
