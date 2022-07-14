import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import i18next from 'i18next';

export const Navbar = () => {
  return (
    <Breadcrumb spacing="30px" separator="" fontSize="xl">
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
