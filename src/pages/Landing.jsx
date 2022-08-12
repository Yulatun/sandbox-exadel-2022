import { useQuery } from 'react-query';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
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

  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );
  const { data: dataIncomes, isFetched: isFetchedIncomes } = useQuery(
    ['incomes'],
    getIncomes
  );
  const { data: dataExpenses, isFetched: isFetchedExpenses } = useQuery(
    ['expenses'],
    getExpenses
  );

  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );

  let allTransactions = [];
  if (
    !!dataIncomes &&
    !!dataExpenses &&
    !!dataWallets &&
    !!dataIncomes.data &&
    !!dataIncomes.data &&
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
    ];

    allTransactions
      .sort((a, b) => {
        return new Date(b.dateOfTransaction) - new Date(a.dateOfTransaction);
      })
      .forEach((transaction) => {
        let wallet = dataWallets.data.find(
          (wallet) => wallet.id === transaction.walletId
        );
        transaction.currency = wallet.currency;
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
      <Box w="100%" p={4}>
        <Flex m={4} direction="column" justify="center" align="center">
          <Flex m={4} direction="row" justify="center" align="center">
            <Button m={4} onClick={expenseModal.onOpen}>
              {i18next.t('button.addExpense')}
            </Button>
            <AddExpenseModal
              isOpen={expenseModal.isOpen}
              onSubmit={expenseModal.onClose}
              onClose={expenseModal.onClose}
            />
            <Button m={4} onClick={incomeModal.onOpen}>
              {i18next.t('button.addIncome')}
            </Button>
            {!!dataUser && !!dataUser.data && isFetchedUser && (
              <AddIncomeModal
                isOpen={incomeModal.isOpen}
                onSubmit={createIncomeOnSubmit}
                onClose={incomeModal.onClose}
                userData={dataUser}
              />
            )}
          </Flex>
          {!incomeModal.isOpen && (
            <NotificationModal
              isOpen={createTransactionModal.isOpen}
              onSubmit={createTransactionModal.onClose}
              onClose={createTransactionModal.onClose}
              text={i18next.t('modal.addIncome.createdMessage')}
            />
          )}
          <WalletsList />
        </Flex>
      </Box>

      <Box w="100%" p={4}>
        <Flex direction="column" justify="center" align="center">
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.recentTransactions')}
          </Text>
          {!isFetchedIncomes || !isFetchedExpenses ? <Preloader /> : null}

          <TransactionList list={allTransactions} />
        </Flex>
      </Box>
    </>
  );
};
