import { Box, Button, Flex, Link, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddExpenseModal, AddIncomeModal, WalletsList } from '@/components';

export const Landing = () => {
  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();

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
    </>
  );
};
