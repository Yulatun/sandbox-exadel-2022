import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { createIncome, getExpenses, getIncomes } from '@/api/Transaction';
import { getUser } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import {
  AddExpenseModal,
  AddIncomeModal,
  NotificationModal,
  Preloader,
  TransactionList,
  WalletsList
} from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Landing = () => {
  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();
  const createTransactionModal = useDisclosure();
  const queryClient = useQueryClient();

  const { textColor } = useCentralTheme();

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const {
    data: { data: { incomes: dataIncomes } } = { data: { incomes: [] } },
    isFetched: isFetchedIncomes
  } = useQuery(['incomes'], getIncomes);

  const {
    data: { data: { expenses: dataExpenses } } = { data: { expenses: [] } },
    isFetched: isFetchedExpenses
  } = useQuery(['expenses'], getExpenses);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  let recentTransactions = [];

  if (
    !!dataIncomes &&
    !!dataExpenses &&
    !!dataWallets &&
    isFetchedIncomes &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    recentTransactions = getTransactionsList(
      dataWallets,
      dataIncomes,
      dataExpenses
    ).slice(0, 10);
  }

  const mutationCreateIncome = useMutation(
    (data) =>
      createIncome({
        walletId: data.wallet?.value,
        categoryId: data.category?.value,
        dateOfTransaction: new Date(
          `${data.date}T${new Date().toISOString().split('T')[1]}`
        ),
        value: Number(data.amount),
        description: data.note
      }),
    {
      onSuccess: () => {
        createTransactionModal.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['incomes']);
      }
    }
  );

  const createIncomeOnSubmit = (data) => {
    mutationCreateIncome.mutate(data);
    incomeModal.onClose();
  };

  return (
    <>
      <Flex flexDir="column" alignItems="center" w="100%" p={4}>
        <Flex my={8} direction="row" justify="center" align="center">
          <Button mr={8} onClick={expenseModal.onOpen}>
            {i18next.t('button.addExpense')}
          </Button>

          <Button onClick={incomeModal.onOpen}>
            {i18next.t('button.addIncome')}
          </Button>
        </Flex>

        <WalletsList
          walletsData={dataWallets}
          isFetchedWallets={isFetchedWallets}
        />

        <Text my={8} color={textColor} fontSize="xl">
          {i18next.t('transaction.recentTransactions')}
        </Text>

        {isFetchedIncomes && isFetchedExpenses && !recentTransactions.length ? (
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.noData')}
          </Text>
        ) : (
          <TransactionList list={recentTransactions} maxH="380px" isShortView />
        )}

        {(!isFetchedIncomes || !isFetchedExpenses) && <Preloader />}
      </Flex>

      {!incomeModal.isOpen && (
        <NotificationModal
          isOpen={createTransactionModal.isOpen}
          onSubmit={createTransactionModal.onClose}
          onClose={createTransactionModal.onClose}
          text={i18next.t('modal.addIncome.createdMessage')}
        />
      )}
      {!!dataUser && isFetchedUser && (
        <AddExpenseModal
          isOpen={expenseModal.isOpen}
          onSubmit={expenseModal.onClose}
          onClose={expenseModal.onClose}
        />
      )}
      {!!dataUser && !!dataWallets && isFetchedUser && isFetchedWallets && (
        <AddIncomeModal
          isOpen={incomeModal.isOpen}
          onSubmit={createIncomeOnSubmit}
          onClose={incomeModal.onClose}
          userData={dataUser}
          walletsData={dataWallets}
        />
      )}
    </>
  );
};
