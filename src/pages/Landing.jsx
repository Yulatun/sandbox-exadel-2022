import { useQuery } from 'react-query';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { createIncome, getTransactions } from '@/api/Transactions';
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
  const userData = {
    id: 'b5b4edac-1eab-489b-9796-d03041e708fd',
    defaultWallet: '7cfe651f-6e02-4e14-9872-6a6a308a3981'
  };

  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();
  const createTransactionModal = useDisclosure();

  const { textColor } = useCentralTheme();

  const { data: dataTransactions, isFetched: isFetchedTransactions } = useQuery(
    ['transactions', userData.id],
    getTransactions
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
            <AddIncomeModal
              isOpen={incomeModal.isOpen}
              onSubmit={createIncomeOnSubmit}
              onClose={incomeModal.onClose}
              userData={userData}
            />
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
          {!isFetchedTransactions ? <Preloader /> : null}
          {!!dataTransactions &&
            !!dataTransactions.data &&
            isFetchedTransactions && (
              <TransactionList list={dataTransactions.data} />
            )}
        </Flex>
      </Box>
    </>
  );
};
