import { Link } from 'react-router-dom';
import { Flex, Heading } from '@chakra-ui/react';
import i18next from 'i18next';

import { LogoWalletIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

export const Logo = () => {
  const { textColor } = useCentralTheme();

  return (
    <>
      <Flex as={Link} to="/" w="auto" align="center" justify="flex-start">
        <LogoWalletIcon width={10} height={10} color={textColor} />

        <Heading as="h1" size="md" color={textColor} m={4}>
          {i18next.t('login.appName')}
        </Heading>
      </Flex>
    </>
  );
};
