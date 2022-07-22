import { Box, Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddWalletModal, Footer } from '@/components';

export const Landing = () => {
  return (
    <>
      <Text fontSize="4xl" align="center">
        {i18next.t('landing.welcomeMessage')}
      </Text>
      <Box bg="orange.100" w="100%" p={4}>
        <Flex direction="column" justify="center" align="center" m="4">
          <AddWalletModal />
        </Flex>
      </Box>

      <Footer />
    </>
  );
};
