import { useQuery } from 'react-query';
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
import { useCentralTheme } from '@/theme';

export const Landing = () => {
  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();
  const createTransactionModal = useDisclosure();

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
    recentTransactions = [...dataIncomes, ...dataExpenses]
      .slice(0, 10)
      .map((transaction) => {
        const wallet = dataWallets.find(
          (wallet) => wallet.id === transaction.walletId
        );

        return { ...transaction, currency: wallet.currency };
      });
  }

  const createIncomeOnSubmit = (data) => {
    createIncome({
      walletId: data.wallet,
      categoryId: data.category,
      dateOfTransaction: new Date(
        `${data.date}T${new Date().toISOString().split('T')[1]}`
      ),
      value: Number(data.amount),
      description: data.note
    })
      .then(() => {
        createTransactionModal.onOpen();
      })
      .catch((err) => console.log(err));
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

        <WalletsList />

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

        {!isFetchedIncomes || !isFetchedExpenses ? <Preloader /> : null}
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
      {!!dataUser && isFetchedUser && (
        <AddIncomeModal
          isOpen={incomeModal.isOpen}
          onSubmit={createIncomeOnSubmit}
          onClose={incomeModal.onClose}
          userData={dataUser}
        />
      )}
    </>
  );
};
