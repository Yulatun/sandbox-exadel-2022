import { useQuery } from 'react-query';
import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import getWallets from '@/api/getWallet';
import { PiggyBankIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

import { AddWalletModal } from '../AddWalletModal';
import { WalletCard } from '../WalletCard';
import { WalletCarousel } from '../WalletCarousel';

export const WalletsList = () => {
  const { textColor, sectionBgColor } = useCentralTheme();
  const { data, isFetched } = useQuery(['wallet'], () =>
    getWallets('34e7bbf8-1685-4fb8-8a77-7964ec3e90ca')
  );

  return (
    <>
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

        <Grid
          templateAreas={{
            base: `'left right' 'center center'`,
            md: `'left center right'`
          }}
          templateRows={'auto'}
          templateColumns={{
            base: '2fr 1fr',
            md: '1fr 3fr 1fr'
          }}
        >
          <GridItem area="left">
            <VStack
              w="full"
              h="full"
              p={3}
              spacing={8}
              alignItems="center"
              justify="center"
            >
              <AddWalletModal />
            </VStack>
          </GridItem>
          {isFetched && (
            <GridItem area="center">
              <VStack
                w="full"
                h="full"
                p={2}
                spacing={8}
                justify="center"
                flexDirection="row"
                alignItems="baseline"
              >
                {data.data.length > 3 ? (
                  <WalletCarousel wallets={data.data} />
                ) : (
                  data.data.map((wallet) => {
                    return <WalletCard key={wallet.id} wallet={wallet} />;
                  })
                )}
              </VStack>
            </GridItem>
          )}
          <GridItem area="right">
            <VStack
              w="full"
              h="full"
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
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
