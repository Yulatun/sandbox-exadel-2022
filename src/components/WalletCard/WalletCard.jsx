import React from 'react';
import {
  Badge,
  Box,
  Flex,
  Heading,
  Text,
  useColorModeValue
} from '@chakra-ui/react';

import { i18n } from '@/i18n';

export const WalletCard = (props) => {
  const { wallet } = props;
  const bgMain = useColorModeValue('orange.50', 'teal.800');
  const textColor = useColorModeValue('teal.900', 'orange.100');
  const bgBadge = useColorModeValue('orange.100', 'teal.700');

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(wallet.balance);

  return (
    <>
      <Box h="200px" m={2} mb={10} borderRadius={35} bg={bgMain} shadow="lg">
        <Badge
          ml="80%"
          mt="5%"
          fontSize="50%"
          align="center"
          p={1}
          bg={bgBadge}
          borderRadius={5}
          color={textColor}
        >
          {i18n.t('walletView.nameOfDefaultBadge')}
        </Badge>

        <Heading as="h1" size="md" color={textColor} ml={10}>
          {wallet.name}
        </Heading>

        <Flex direction="column" m={5} align="center" color={textColor}>
          <Flex>{i18n.t('walletView.headOfBalanceMessage')}</Flex>
          <Flex fontSize="2xl" fontWeight="bold" color={textColor}>
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
