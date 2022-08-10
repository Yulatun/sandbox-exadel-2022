import { useQuery, useQueryClient } from 'react-query';
import {
  Box,
  Grid,
  GridItem,
  Heading,
  Text,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getWallets } from '@/api/Wallet';
import { deleteWallet } from '@/api/Wallet';
import { PiggyBankIcon } from '@/assets';
import { DeleteConfirmationModal } from '@/components';
import {
  AddWalletModal,
  Preloader,
  WalletCard,
  WalletCarousel
} from '@/components';
import { useCentralTheme } from '@/theme';

export const WalletsList = () => {
  const { textColor, sectionBgColor } = useCentralTheme();
  const { data, isFetched } = useQuery(['wallets'], async () => {
    const response = await getWallets();
    return { data: [...response.data] };
  });

  const queryClient = useQueryClient();
  const deleteModal = useDisclosure();

  const onDelete = (id) => {
    deleteWallet(id);
    queryClient.setQueryData(['wallets'], () =>
      data.data.filter((id) => data.id !== id)
    );
    WalletsList();
    deleteModal.onClose();
  };

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
            base: "'left right' 'center center'",
            lg: "'left center center right'"
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
          <GridItem area="center">
            {!isFetched ? <Preloader /> : null}
            {isFetched &&
              (data.data.length > 3 ? (
                <WalletCarousel wallets={data.data} />
              ) : (
                <Grid
                  templateColumns={`repeat(${data.data.length}, 1fr)`}
                  gap={3}
                >
                  {data.data.map((wallet) => {
                    return (
                      <GridItem key={wallet.id}>
                        <WalletCard
                          wallet={wallet}
                          onDelete={() => {
                            deleteModal.onOpen();
                          }}
                        />
                      </GridItem>
                    );
                  })}
                  <DeleteConfirmationModal
                    isOpen={deleteModal.isOpen}
                    onSubmit={onDelete}
                    onClose={deleteModal.onClose}
                    text={i18next.t('modal.deleteWallet.text')}
                  />
                </Grid>
              ))}
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
