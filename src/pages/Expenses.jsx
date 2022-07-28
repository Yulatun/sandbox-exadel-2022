import { Box, useColorModeValue } from '@chakra-ui/react';

// import i18next from 'i18next';
import { ExpenseItem, Footer } from '@/components';

export const Expenses = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');

  const onDelete = () => {
    // code to delete
  };
  const onEdit = () => {
    // code to edit
  };

  const transactionsTemplate = [
    {
      id: '2c984cb7-70c5-44e9-bc92-65661f3209d9',
      date: '07.26',
      category: 'food',
      amount: 100,
      wallet: 'name of Wallet',
      payer: 'Me',
      notes: 'Notes'
    },
    {
      id: 'eb3608e5-4791-47a7-acfe-d3a7d9427e7f',
      date: '07.25',
      category: 'very long name of category',
      amount: 200,
      wallet: 'name of Wallet',
      payer: 'Me',
      notes: 'Notes'
    },
    {
      id: '397cbf58-5558-4a3c-844d-f09650085b84',
      date: '07.24',
      category: 'go out',
      amount: 300,
      wallet: 'very long name of Wallet',
      payer: 'Child',
      notes: 'really super long-long notes about expenses'
    }
  ];
  const expensesTable = transactionsTemplate.map((singleTransaction) => {
    return (
      <ExpenseItem
        key={singleTransaction.id}
        transaction={singleTransaction}
        onEdit={onEdit}
        onDelete={onDelete}
      ></ExpenseItem>
    );
  });

  return (
    <>
      <Box bg={bgMain} w="100%" p={4} h="1000px">
        {expensesTable}
      </Box>
      <Footer />
    </>
  );
};
