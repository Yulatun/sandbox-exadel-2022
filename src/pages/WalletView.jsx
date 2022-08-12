import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { getExpenses, getIncomes } from '@/api/Transaction';
import { getUser } from '@/api/User';
import { deleteWallet, getWallets } from '@/api/Wallet';
import {
  ConfirmationModal,
  NotificationModal,
  Preloader,
  TransactionList,
  WalletCard
} from '@/components';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const { id: walletId } = useParams();

  const deleteWalletModal = useDisclosure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { bgColor } = useCentralTheme();

  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );

  const { data: dataIncomes, isFetched: isFetchedIncomes } = useQuery(
    ['incomes'],
    getIncomes
  );

  const { data: dataExpenses, isFetched: isFetchedExpenses } = useQuery(
    ['expenses'],
    getExpenses
  );

  const mutationWallet = useMutation(() => deleteWallet(walletId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['wallets']);
      navigate('/', { replace: true });
    }
  });

  const openWalletOnDelete = () => {
    deleteWalletModal.onOpen();
  };

  const deleteWalletOnSubmit = () => {
    mutationWallet.mutate();
    deleteWalletModal.onClose();
  };

  const { textColor } = useCentralTheme();

  let allTransactions = [];

  if (
    !!dataIncomes &&
    !!dataExpenses &&
    !!dataWallets &&
    !!dataIncomes.data &&
    !!dataExpenses.data &&
    !!dataIncomes.data.incomes &&
    !!dataExpenses.data.expenses &&
    !!dataWallets.data &&
    isFetchedIncomes &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    allTransactions = [
      ...dataIncomes.data.incomes,
      ...dataExpenses.data.expenses
    ].filter((data) => data.walletId === walletId);

    allTransactions.forEach((transaction) => {
      let wallet = dataWallets.data.find(
        (wallet) => wallet.id === transaction.walletId
      );

      transaction.currency = wallet.currency;
    });
  }

  return (
    <>
      <Flex
        flexDir="column"
        alignItems="center"
        mt={6}
        px={24}
        py={6}
        w="100%"
        bg={bgColor}
      >
        <IconButton
          onClick={openWalletOnDelete}
          ml="70%"
          size="sm"
          icon={<DeleteIcon />}
        />

        <Flex justifyContent="center" mb={8} w="400px">
          {!!dataWallets && !!dataWallets.data && isFetchedWallets && (
            <WalletCard
              walletData={dataWallets.data.find(
                (wallet) => wallet.id === walletId
              )}
            />
          )}
        </Flex>

        {isFetchedIncomes && isFetchedExpenses && !allTransactions.length ? (
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.noData')}
          </Text>
        ) : (
          <TransactionList list={allTransactions} maxH="600px" isShortView />
        )}

        {!isFetchedIncomes || !isFetchedExpenses ? <Preloader /> : null}
      </Flex>

      {!!dataUser &&
      !!dataUser.data &&
      isFetchedUser &&
      dataUser.data.defaultWallet === walletId ? (
        <NotificationModal
          isOpen={deleteWalletModal.isOpen}
          onSubmit={deleteWalletOnSubmit}
          onClose={deleteWalletModal.onClose}
          text={i18next.t('modal.deleteWalletDefault.text')}
        />
      ) : (
        <ConfirmationModal
          isOpen={deleteWalletModal.isOpen}
          onSubmit={deleteWalletOnSubmit}
          onClose={deleteWalletModal.onClose}
          title={i18next.t('modal.deleteWallet.title')}
          text={i18next.t('modal.deleteWallet.text')}
        />
      )}
    </>
  );
};
