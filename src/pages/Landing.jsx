import { useQuery } from 'react-query';
import { Box, Button, Flex, Link, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { getTransactions } from '@/api/Transactions';
import {
  AddExpenseModal,
  AddIncomeModal,
  TransactionList,
  WalletsList
} from '@/components';
import { useCentralTheme } from '@/theme';

export const Landing = () => {
  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();

  const { textColor } = useCentralTheme();

  const { data: dataTransactions, isFetched: isFetchedTransactions } = useQuery(
    ['transactions'],
    getTransactions
  );

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
              onSubmit={incomeModal.onClose}
              onClose={incomeModal.onClose}
            />
          </Flex>
          <WalletsList />
        </Flex>
      </Box>
      <Link href="/wallet/123"> Draft of Wallet Page</Link>
      <Box w="100%" p={4}>
        <Flex direction="column" justify="center" align="center">
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.recentTransactions')}
          </Text>
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
