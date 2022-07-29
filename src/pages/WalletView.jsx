import React from 'react';
import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { Footer, WalletCard } from '@/components';

export const WalletView = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');

  return (
    <>
      <Box bg={bgMain} h="700px" w="850">
        <Flex mr="35%" ml="38%" pos="relative" top="50px">
          <WalletCard
            totalBalance={2000}
            currency="USD"
            name="nameOfWallet"
          ></WalletCard>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
