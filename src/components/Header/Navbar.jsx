import { Link } from 'react-router-dom';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink } from '@chakra-ui/react';
import i18next from 'i18next';

import { useCentralTheme } from '@/theme';

export const Navbar = () => {
  const { textColor } = useCentralTheme();

  return (
    <Breadcrumb
      display={{ base: 'none', lg: 'flex' }}
      mx={2}
      spacing={4}
      separator=""
      fontSize="xl"
      color={textColor}
      fontWeight="bold"
      sx={{ ol: { display: 'flex', alignItems: 'center' } }}
    >
      <BreadcrumbItem
        mr={{ base: 0, xl: 4 }}
        fontSize={{ base: 'lg', xl: 'xl' }}
      >
        <BreadcrumbLink as={Link} to="/incomes" textUnderlineOffset="4px">
          {i18next.t('header.navigation.incomes')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        mr={{ base: 0, xl: 4 }}
        fontSize={{ base: 'lg', xl: 'xl' }}
      >
        <BreadcrumbLink as={Link} to="/expenses" textUnderlineOffset="4px">
          {i18next.t('header.navigation.expenses')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem
        mr={{ base: 0, xl: 4 }}
        fontSize={{ base: 'lg', xl: 'xl' }}
      >
        <BreadcrumbLink as={Link} to="/categories" textUnderlineOffset="4px">
          {i18next.t('header.navigation.categories')}
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbItem fontSize={{ base: 'lg', xl: 'xl' }}>
        <BreadcrumbLink as={Link} to="/statistics" textUnderlineOffset="4px">
          {i18next.t('header.navigation.statistics')}
        </BreadcrumbLink>
      </BreadcrumbItem>
    </Breadcrumb>
  );
};
