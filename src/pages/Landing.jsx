import { Box, Flex } from '@chakra-ui/react';

import { AddWallet, Footer } from '@/components';

export const Landing = () => {
  return (
    <>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <AddWallet />
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
