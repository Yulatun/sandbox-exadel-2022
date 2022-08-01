import {
  Box,
  Flex,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
  VStack
} from '@chakra-ui/react';

import { ExpenseItem, FiltersExpenses, Footer } from '@/components';

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

  return (
    <>
      <Box bg={bgMain} w="100%" mt={6}>
        <Flex bg={cardBg} direction="column" justify="center" align="center">
          <Box bg={bgMain} w="100%" px={24} py={6}>
            <Box mb="50px">
              <FiltersExpenses />
            </Box>
            <HStack spacing={4}>
              {['Food', 'Beauty', 'Utilities'].map((name) => (
                <FilterTag key={name} text={name} />
              ))}
            </HStack>

            <VStack spacing={5} pt={5}>
              {transactionsTemplate.map((singleTransaction) => (
                <ExpenseItem
                  key={singleTransaction.id}
                  transaction={singleTransaction}
                  onEdit={onEdit}
                  onDelete={onDelete}
                />
              ))}
            </VStack>
          </Box>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
