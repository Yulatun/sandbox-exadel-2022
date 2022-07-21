import { Box, Button, Flex, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddIncomeModal, AddWallet, Footer } from '@/components';

export const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <Button mb="20px" onClick={onOpen}>
            {i18next.t('button.addIncome')}
          </Button>
          <AddIncomeModal
            isOpen={isOpen}
            onSubmit={onClose}
            onClose={onClose}
          />
          <AddWallet />
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
