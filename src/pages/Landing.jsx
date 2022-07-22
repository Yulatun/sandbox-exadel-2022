import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddIncomeModal, AddWalletModal, Footer } from '@/components';

export const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Text fontSize="4xl" align="center">
        {i18next.t('landing.welcomeMessage')}
      </Text>
      <Box bg="orange.100" w="100%" p={4}>
        <Flex direction="column" justify="center" align="center" m="4">
          <Button mb="20px" onClick={onOpen}>
            {i18next.t('button.addIncome')}
          </Button>
          <AddIncomeModal
            isOpen={isOpen}
            onSubmit={onClose}
            onClose={onClose}
          />
          <AddWalletModal />
        </Flex>
      </Box>

      <Footer />
    </>
  );
};
