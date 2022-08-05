import React from 'react';
import { Badge, Box, Flex, Heading, Text } from '@chakra-ui/react';

import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const WalletCard = (props) => {
  const { wallet } = props;
  const { popupBgColor, popupTextColor, badgeBgColor } = useCentralTheme();

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(wallet.balance);

  return (
    <>
      <Box
        h="200px"
        m={[2, 5, 5, 5]}
        borderRadius={35}
        bg={popupBgColor}
        shadow="lg"
      >
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

        <Heading as="h1" size="md" color={popupTextColor} ml={10}>
          {wallet.name}
        </Heading>

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
