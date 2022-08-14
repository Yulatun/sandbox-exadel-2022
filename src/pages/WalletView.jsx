import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { Flex, IconButton, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getExpenses, getIncomes } from '@/api/Transaction';
import { getPayers, getUser } from '@/api/User';
import { deleteWallet, getWallets } from '@/api/Wallet';
import {
  ConfirmationModal,
  NotificationModal,
  Preloader,
  TransactionList,
  WalletCard
} from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const { id: walletId } = useParams();

  const deleteWalletModal = useDisclosure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { bgColor } = useCentralTheme();

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  const {
    data: { data: { incomes: dataIncomes } } = { data: { incomes: [] } },
    isFetched: isFetchedIncomes
  } = useQuery(['incomes'], getIncomes);

  const {
    data: { data: { expenses: dataExpenses } } = { data: { expenses: [] } },
    isFetched: isFetchedExpenses
  } = useQuery(['expenses'], getExpenses);

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

  const {
    data: { data: dataPayers } = { data: [] },
    isFetched: isFetchedPayers
  } = useQuery(['payers'], getPayers);

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
    isFetchedIncomes &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    allTransactions = getTransactionsList(
      dataWallets,
      dataIncomes,
      dataExpenses
    ).filter((data) => data.walletId === walletId);
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
          {!!dataWallets && isFetchedWallets && (
            <WalletCard
              walletData={dataWallets.find((wallet) => wallet.id === walletId)}
            />
          )}
        </Flex>

        {!!dataWallets &&
        !!dataCategories &&
        !!dataPayers &&
        isFetchedIncomes &&
        isFetchedExpenses &&
        isFetchedWallets &&
        isFetchedCategories &&
        isFetchedPayers &&
        !allTransactions.length ? (
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.noData')}
          </Text>
        ) : (
          <TransactionList
            list={allTransactions}
            maxH="550px"
            isShortView
            walletsData={dataWallets}
            categoriesData={dataCategories}
            payersData={dataPayers}
          />
        )}

        {(!isFetchedIncomes || !isFetchedExpenses) && <Preloader />}
      </Flex>

      {!!dataUser && isFetchedUser && dataUser.defaultWallet === walletId ? (
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
