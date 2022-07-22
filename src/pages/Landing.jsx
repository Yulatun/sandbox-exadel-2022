import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddExpenseModal, AddWallet, Footer } from '@/components';

export const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <AddWallet />
          <Button mb="20px" onClick={onOpen}>
            {i18next.t('button.addExpense')}
          </Button>
          <AddExpenseModal
            isOpen={isOpen}
            onSubmit={onClose}
            onClose={onClose}
          />
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
