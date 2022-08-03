import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import { PiggyBankIcon } from '@/assets';

import { AddWalletModal } from '../AddWalletModal';
import { WalletCard } from '../WalletCard';

export const WalletsList = () => {
  const iconsThemeColor = useColorModeValue('teal.900', 'orange.300');
  const bgSection = useColorModeValue('orange.200', 'teal.700');

  return (
    <>
      <Box
        as="section"
        w="full"
        maxW="container.xl"
        p={0}
        bg={bgSection}
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
          templateColumns={{ base: '2fr 1fr', md: '1fr 3fr 1fr' }}
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
          <GridItem area="center">
            <VStack
              w="full"
              h="full"
              p={8}
              spacing={8}
              justify="center"
              flexDirection="row"
            >
              {/* Next step will be adopting the view of this component for that layout */}
              <WalletCard />
            </VStack>
          </GridItem>
          <GridItem area="right">
            <VStack
              w="full"
              h="full"
              p={8}
              spacing={8}
              alignItems="center"
              justify="center"
            >
              <PiggyBankIcon w={24} h={24} color={iconsThemeColor} />
              <Text fontWeight="bold">0 &#36;</Text>
            </VStack>
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};
