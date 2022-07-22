import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import {
  AddExpenseModal,
  AddIncomeModal,
  AddWalletModal,
  Footer
} from '@/components';

export const Landing = () => {
  const expenseModal = useDisclosure();
  //const modal2 = useDisclosure()
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <>
      <Text fontSize="4xl" align="center">
        {i18next.t('landing.welcomeMessage')}
      </Text>
      <Box bg="orange.100" w="100%" p={4}>
        <Flex direction="column" justify="center" align="center" m="4">
          <Flex direction="row" justify="center" allign="center" m="4">
            <Button mb="20px" onClick={expenseModal.onOpen}>
              {i18next.t('button.addExpense')}
            </Button>
            <AddExpenseModal
              isOpen={expenseModal.isOpen}
              onSubmit={expenseModal.onClose}
              onClose={expenseModal.onClose}
            />
            <Button mb="20px" onClick={onOpen}>
              {i18next.t('button.addIncome')}
            </Button>
            <AddIncomeModal
              isOpen={isOpen}
              onSubmit={onClose}
              onClose={onClose}
            />
          </Flex>
          <AddWalletModal />
        </Flex>
      </Box>

      <Footer />
    </>
  );
};
