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

export const WalletView = (props) => {
  const bgMain = useColorModeValue('orange.50', 'teal.800');
  const textColor = useColorModeValue('teal.900', 'orange.100');
  const bgBadge = useColorModeValue('orange.100', 'teal.700');

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(props.totalBalance);

  return (
    <>
      <Box
        h="200px"
        w="350px"
        m={5}
        borderRadius={10}
        border="1px"
        borderColor="green"
        bg={bgMain}
      >
        <Flex
          direction="column"
          m={5}
          align="center"
          justify="center"
          color={textColor}
        >
          <Flex>{i18n.t('walletView.headOfBalanceTitle')}</Flex>
          <Flex fontSize="4xl" fontWeight="bold" color={textColor}>
            {totalBalanceView}
          </Flex>
          <Text>{props.currency}</Text>
        </Flex>
        <Flex
          direction="column"
          p={2}
          m={2}
          align="start"
          justify="flex-end"
          h="20%"
        >
          <Heading as="h1" size="md" color={textColor}>
            {props.name}
          </Heading>
          <Badge w="20%" fontSize="50%" align="center" bg={bgBadge}>
            default
          </Badge>
        </Flex>
      </Box>
    </>
  );
};
