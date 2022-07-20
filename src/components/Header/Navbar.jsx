import React from 'react';
import { Link } from 'react-router-dom';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  useColorModeValue
} from '@chakra-ui/react';
import i18next from 'i18next';

export const Navbar = () => {
  const navbartextcolor = useColorModeValue('teal.900', 'orange.300');

  return (
    <Breadcrumb
      spacing="30px"
      separator=""
      fontSize="xl"
      color={navbartextcolor}
      fontWeight="bold"
    >
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/">
          {i18next.t('header.navigation.home')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/about">
          {i18next.t('header.navigation.about')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem>
        <BreadcrumbLink as={Link} to="/categories">
          {i18next.t('header.navigation.categories')}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
