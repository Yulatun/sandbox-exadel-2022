import { useQuery } from 'react-query';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { createIncome, getExpenses, getIncomes } from '@/api/Transaction';
import { getUser } from '@/api/User';
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
          {!!dataIncomes &&
            !!dataExpenses &&
            !!dataIncomes.data &&
            !!dataIncomes.data.incomes &&
            !!dataExpenses.data &&
            isFetchedIncomes &&
            isFetchedExpenses && (
              <TransactionList
                list={[...dataIncomes.data.incomes, ...dataExpenses.data]}
              />
            )}
        </Flex>
      </Box>
    </>
  );
};
