import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { AddWalletModal } from '@/components';

export const Landing = () => {
  const bgAddWallet = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <Box bg={bgAddWallet} w="100%" p={4}>
        <Flex direction="column" justify="center" align="center" m="4">
          <AddWalletModal />
        </Flex>
      </Box>
    </>
  );
};
