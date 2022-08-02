import React from 'react';
import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import i18next from 'i18next';

import { useCentralTheme } from '../../theme/theme';

export const Navbar = () => {
  const { textColor } = useCentralTheme();
  return (
    <Breadcrumb
      spacing="16px"
      separator=""
      fontSize="xl"
      color={textColor}
      fontWeight="bold"
      sx={{ ol: { display: 'flex', alignItems: 'center' } }}
    >
      <BreadcrumbItem mr={{ base: 2, xl: 4 }}>
        <BreadcrumbLink as={Link} to="/" textUnderlineOffset="4px">
          {i18next.t('header.navigation.home')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem mr={{ base: 2, xl: 4 }}>
        <BreadcrumbLink as={Link} to="/incomes">
          {i18next.t('header.navigation.incomes')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem mr={{ base: 2, xl: 4 }}>
        <BreadcrumbLink as={Link} to="/categories" textUnderlineOffset="4px">
          {i18next.t('header.navigation.categories')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem mr={{ base: 2, xl: 4 }}>
        <BreadcrumbLink as={Link} to="/expenses" textUnderlineOffset="4px">
          {i18next.t('header.navigation.expenses')}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
