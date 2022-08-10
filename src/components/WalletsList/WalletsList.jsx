import { useQuery } from 'react-query';
import { Box, Flex, Heading, Text, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { getWallets } from '@/api/Wallet';
import { PiggyBankIcon } from '@/assets';
import {
  AddWalletModal,
  Preloader,
  WalletCard,
  WalletCarousel
} from '@/components';
import { useCentralTheme } from '@/theme';

export const WalletsList = () => {
  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallet'],
    getWallets
  );

  const { textColor, sectionBgColor } = useCentralTheme();

  return (
    <Box
      as="section"
      w="full"
      maxW="container.xl"
      p={0}
      bg={sectionBgColor}
      borderRadius={35}
      shadow="lg"
    >
      <Box display="flex" justifyContent="center" mt="10px">
        <Heading as="h4" size="md" fontWeight="bold">
          {i18next.t('walletView.headOfBalanceMessage')}&#58;
        </Heading>
      </Box>

      <Flex alignItems="center" justifyContent="space-between">
        <AddWalletModal />
        {!isFetchedWallets ? <Preloader /> : null}
        {!!dataWallets &&
          !!dataWallets.data &&
          isFetchedWallets &&
          (dataWallets.data.length > 3 ? (
            <WalletCarousel walletsData={dataWallets.data} />
          ) : (
            <Box>
              {dataWallets.data.map((wallet) => {
                return <WalletCard key={wallet.id} walletData={wallet} />;
              })}
            </Box>
          ))}
        <VStack
          p={[8, 8, 4, 8]}
          spacing={8}
          alignItems="center"
          justify="center"
        >
          <PiggyBankIcon
            w={[16, 16, 16, 24]}
            h={[16, 16, 16, 24]}
            color={textColor}
          />
          <Text fontWeight="bold">0 &#36;</Text>
        </VStack>
      </Flex>
    </Box>
  );
};
