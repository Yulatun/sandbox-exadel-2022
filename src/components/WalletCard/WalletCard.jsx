import { useQuery } from 'react-query';
import { Badge, Flex, Heading, Text } from '@chakra-ui/react';

import { getUser } from '@/api/User';
import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const WalletCard = ({ walletData }) => {
  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const { popupBgColor, popupTextColor, badgeBgColor } = useCentralTheme();

  const totalBalanceView = new Intl.NumberFormat('de-DE', {
    minimumFractionDigits: 2
  }).format(walletData.balance);

  return (
    <Flex
      position="relative"
      flexDir="column"
      justifyContent="center"
      alignItems="center"
      w="95%"
      h="200px"
      borderRadius={35}
      bg={popupBgColor}
      shadow="lg"
    >
      {!!dataUser &&
        !!dataUser.data &&
        isFetchedUser &&
        walletData.id === dataUser.data.defaultWallet && (
          <Badge
            position="absolute"
            top="0"
            right="20px"
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
        )}

      <Heading as="h1" mb="20px" size="md" color={popupTextColor}>
        {walletData.name}
      </Heading>
      <Text>{i18n.t('walletView.headOfBalanceMessage')}</Text>
      <Text fontSize="2xl" fontWeight="bold" color={popupTextColor}>
        {totalBalanceView}
      </Text>
      <Text>{walletData.currency.currencyCode}</Text>
    </Flex>
  );
};
