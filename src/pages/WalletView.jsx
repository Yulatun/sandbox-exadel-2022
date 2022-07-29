import React from 'react';
import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';

import { ExpenseItem, Footer, WalletCard } from '@/components';

export const WalletView = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');
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
      <Box bg={bgMain} px={24} py={6}>
        <Flex mr="30%" ml="35%">
          <WalletCard
            totalBalance={2000}
            currency="USD"
            name="nameOfWallet"
          ></WalletCard>
        </Flex>
        <VStack spacing={5} pt={5}>
          {transactionsTemplate.map((singleTransaction) => (
            <ExpenseItem
              key={singleTransaction.id}
              transaction={singleTransaction}
              version="short"
            />
          ))}
          ;
        </VStack>
      </Box>
      <Footer />
    </>
  );
};
