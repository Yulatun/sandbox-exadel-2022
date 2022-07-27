import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { Footer, WalletView } from '@/components';

export const WalletViewPage = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');

  return (
    <>
      <Box bg={bgMain} h="700px" w="850">
        <Flex mr="35%" ml="38%" pos="relative" top="50px">
          <WalletView
            totalBalance={2000}
            currency="USD"
            name="nameOfWallet"
          ></WalletView>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
