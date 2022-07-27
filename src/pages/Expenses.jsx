import { Box, Flex, useColorModeValue } from '@chakra-ui/react';
import i18next from 'i18next';

import { ExpensesTable, Footer } from '@/components';

export const Expenses = () => {
  const cardBg = useColorModeValue('orange.50', 'teal.600');
  const bgMain = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <Box bg={bgMain} w="100%" p={4}>
        <Flex bg={cardBg} direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('expenses.welcomeMessage')}</h2>
          </main>
        </Flex>
        <ExpensesTable
          category="food"
          amount="2000"
          wallet="name of Wallet"
          payer="Me"
          notes="Notes"
          edit="edit"
          delete="delete"
        ></ExpensesTable>
      </Box>
      <Footer />
    </>
  );
};
