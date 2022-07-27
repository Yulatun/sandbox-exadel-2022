import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import i18next from 'i18next';

import { ExpensesTable, Footer } from '@/components';

export const Expenses = () => {
  const cardBg = useColorModeValue('orange.50', 'teal.600');
  const bgMain = useColorModeValue('orange.100', 'teal.900');

  const onDelete = () => {
    // code with delete request
  };
  const onEdit = () => {
    // code with path request
  };

  const transactionsTemplate = [
    {
      date: '07.26',
      category: 'food',
      amount: '100',
      wallet: 'name of Wallet',
      payer: 'Me',
      notes: 'Notes',
      key: '1'
    },
    {
      date: '07.25',
      category: 'long name of category',
      amount: '200',
      wallet: 'name of Wallet',
      payer: 'Me',
      notes: 'Notes',
      key: '2'
    },
    {
      date: '07.24',
      category: 'go out',
      amount: '300',
      wallet: 'long name of Wallet',
      payer: 'Child',
      notes: 'Notes',
      key: '3'
    }
  ];
  const listTransactions = transactionsTemplate.map((singleTransaction) => {
    return (
      <ExpensesTable
        key={singleTransaction.key}
        date={singleTransaction.date}
        category={singleTransaction.category}
        amount={singleTransaction.amount}
        wallet={singleTransaction.wallet}
        payer={singleTransaction.payer}
        notes={singleTransaction.notes}
        edit={onEdit}
        delete={onDelete}
      ></ExpensesTable>
    );
  });

  return (
    <>
      <Box bg={bgMain} w="100%" p={4}>
        <Flex bg={cardBg} direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('expenses.welcomeMessage')}</h2>
          </main>
        </Flex>
        {listTransactions}
      </Box>
      <Footer />
    </>
  );
};
