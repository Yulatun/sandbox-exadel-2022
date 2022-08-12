import { useQuery } from 'react-query';
import { Link as RouterLink } from 'react-router-dom';
import { Box, Flex, Heading, Link, Text, VStack } from '@chakra-ui/react';
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

  const { popupTextColor, textColor, sectionBgColor } = useCentralTheme();

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
      <Flex justifyContent="center" my="10px">
        <Heading as="h4" size="md" fontWeight="bold">
          {i18next.t('walletView.headOfBalanceMessage')}&#58;
        </Heading>
      </Flex>

      <Flex alignItems="center" justifyContent="space-between">
        <AddWalletModal />
        {!isFetchedWallets && <Preloader />}
        {!!dataWallets &&
          !!dataWallets.data &&
          isFetchedWallets &&
          (dataWallets.data.length > 3 ? (
            <WalletCarousel walletsData={dataWallets.data} />
          ) : dataWallets.data.length === 1 ? (
            <Flex justifyContent="center" w="40%">
              {dataWallets.data.map((wallet) => (
                <Link
                  key={wallet.id}
                  as={RouterLink}
                  to={`wallet/${wallet.id}`}
                  w="100%"
                  color={popupTextColor}
                  _hover={{ textDecoration: 'none' }}
                >
                  <WalletCard walletData={wallet} isLink />
                </Link>
              ))}
            </Flex>
          ) : (
            <Flex justifyContent="center" w="70%">
              {dataWallets.data.map((wallet) => (
                <Link
                  key={wallet.id}
                  as={RouterLink}
                  to={`wallet/${wallet.id}`}
                  w="100%"
                  color={popupTextColor}
                  _hover={{ textDecoration: 'none' }}
                >
                  <WalletCard walletData={wallet} isLink />
                </Link>
              ))}
            </Flex>
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
