import { useQuery } from 'react-query';
import {
  Box,
  Button,
  Flex,
  Link,
  Text,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getTransactions } from '@/api/Transactions';
import { AddExpenseModal, AddIncomeModal, WalletsList } from '@/components';
import { TransactionItem } from '@/components';

export const Landing = () => {
  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();

  const bgMain = useColorModeValue('orange.100', 'teal.900');

  const { data, isFetched } = useQuery(['transactions'], () =>
    getTransactions()
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
      <Box bg={bgMain} w="100%" p={4}>
        <Flex bg={bgMain} direction="column" justify="center" align="center">
          <Text fontSize="xl">
            {i18next.t('transaction.recentTransactions')}
          </Text>
          <VStack w="80%" pt={5} spacing={5} align="stretch" justify="center">
            {isFetched &&
              data.data.map((dataTransaction) => (
                <TransactionItem
                  key={dataTransaction.id}
                  transaction={dataTransaction}
                />
              ))}
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
