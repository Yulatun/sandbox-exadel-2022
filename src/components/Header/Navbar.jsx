import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Flex
} from '@chakra-ui/react';
import i18next from 'i18next';

import { CentralTheme } from '../../theme/theme';

export const Navbar = () => {
  return (
    <Breadcrumb
      spacing="16px"
      separator=""
      fontSize="xl"
      color={CentralTheme().textColor}
      fontWeight="bold"
    >
      <Flex direction={{ base: 'column', lg: 'row', xl: 'row' }}>
        <BreadcrumbItem mr={6} mb={{ base: 4, lg: 0 }} mt={{ base: 6, lg: 0 }}>
          <BreadcrumbLink as={Link} to="/" textUnderlineOffset="4px">
            {i18next.t('header.navigation.home')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem mr={6} mb={{ base: 4, lg: 0 }}>
          <BreadcrumbLink as={Link} to="/about" textUnderlineOffset="4px">
            {i18next.t('header.navigation.about')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem mr={6} mb={{ base: 4, lg: 0 }}>
          <BreadcrumbLink as={Link} to="/categories" textUnderlineOffset="4px">
            {i18next.t('header.navigation.categories')}
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbItem mr={6} mb={{ base: 4, lg: 0 }}>
          <BreadcrumbLink as={Link} to="/expenses" textUnderlineOffset="4px">
            {i18next.t('header.navigation.expenses')}
          </BreadcrumbLink>
        </BreadcrumbItem>
      </Flex>
    </Breadcrumb>
  );
};
