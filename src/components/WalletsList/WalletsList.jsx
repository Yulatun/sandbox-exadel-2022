import { Box, Grid, GridItem, Heading, Text, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { PiggyBankIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

import { AddWalletModal } from '../AddWalletModal';
import { WalletCard } from '../WalletCard';

export const WalletsList = () => {
  const { textColor, sectionBgColor } = useCentralTheme();

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
              p={8}
              spacing={8}
              alignItems="flex-start"
              justify="center"
            >
              <Heading as="h4" size="md" fontWeight="bold">
                {i18next.t('walletView.headOfBalanceMessage')}&#58;
              </Heading>
              <Text>{i18next.t('modal.addExpense.wallet')}</Text>
              <AddWalletModal />
            </VStack>
          </GridItem>
          <GridItem area="center">
            <VStack w="full" h="full" p={2} spacing={8} justify="center">
              {/* Next step will be adopting the view of this component for that layout */}
              <WalletCard />
            </VStack>
          </GridItem>
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
