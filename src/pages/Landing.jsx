import {
  Box,
  Button,
  Flex,
  useColorModeValue,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { AddIncomeModal, AddWalletModal } from '@/components';

export const Landing = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const bgAddWallet = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <Box bg={bgAddWallet} w="100%" p={4}>
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
    </>
  );
};
