import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

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

  const transactions = transactionsTemplate.map((singleTransaction) => {
    return (
      <ExpenseItem
        key={singleTransaction.id}
        transaction={singleTransaction}
        version="short"
      />
    );
  });
  return (
    <>
      <Box bg={bgMain} h="700px" w="850">
        <Flex mr="35%" ml="38%" pos="relative" top="50px">
          <WalletCard
            totalBalance={2000}
            currency="USD"
            name="nameOfWallet"
          ></WalletCard>
        </Flex>
        {transactions}
      </Box>
      <Footer />
    </>
  );
};
