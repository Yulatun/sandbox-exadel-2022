import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Badge,
  Box,
  Center,
  Flex,
  Heading,
  Link,
  Text
} from '@chakra-ui/react';

import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const WalletCard = (props) => {
  const { wallet, showLink } = props;
  const { popupBgColor, popupTextColor, badgeBgColor } = useCentralTheme();

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(wallet.balance);

  return (
    <>
      <Box h="200px" borderRadius={35} bg={popupBgColor} shadow="lg">
        <Badge
          ml="80%"
          mt="5%"
          fontSize="50%"
          align="center"
          p={1}
          bg={badgeBgColor}
          borderRadius={5}
          color={popupTextColor}
        >
          {i18n.t('walletView.nameOfDefaultBadge')}
        </Badge>

        <Center>
          {showLink ? (
            <Link
              as={RouterLink}
              to={`wallet/${wallet.id}`}
              size="lg"
              color={popupTextColor}
            >
              <Heading size="md" color={popupTextColor}>
                {wallet.name}{' '}
              </Heading>
            </Link>
          ) : (
            <Heading as="h1" size="md" color={popupTextColor}>
              {wallet.name}
            </Heading>
          )}{' '}
        </Center>

        <Flex direction="column" m={5} align="center" color={popupTextColor}>
          <Flex>{i18n.t('walletView.headOfBalanceMessage')}</Flex>
          <Flex fontSize="2xl" fontWeight="bold" color={popupTextColor}>
            {totalBalanceView}
          </Flex>
          <Text>{wallet.currency.currencyCode}</Text>
        </Flex>
        <Flex
          direction="column"
          p={2}
          m={2}
          align="start"
          justify="flex-end"
          h="20%"
        ></Flex>
      </Box>
    </>
  );
};
