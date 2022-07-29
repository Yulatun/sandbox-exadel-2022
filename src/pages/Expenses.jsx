import {
  Box,
  Flex,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue
} from '@chakra-ui/react';

import { ExpenseItem, Footer } from '@/components';

export const FilterTag = ({ text }) => {
  return (
    <Tag size="lg" variant="solid" colorScheme="teal">
      <TagLabel>{text}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};

export const Expenses = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');
  const cardBg = useColorModeValue('orange.50', 'teal.600');
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
      />
    );
  });

  return (
    <>
      <Box bg={bgMain} w="100%">
        <Flex bg={cardBg} direction="column" justify="center" align="center">
          <Box bg={bgMain} w="100%" px={24} py={6}>
            <HStack spacing={4}>
              {['Food', 'Beauty', 'Utilities'].map((name) => (
                <FilterTag key={name} text={name} />
              ))}
            </HStack>

            <Box>{expensesTable}</Box>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
