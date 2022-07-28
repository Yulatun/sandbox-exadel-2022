import { Box, Flex, Text, useColorModeValue, VStack } from '@chakra-ui/react';

import { PiggyBankIcon } from '@/assets';

import { AddWalletModal } from '../AddWalletModal';
import { WalletCard } from '../WalletCard';

export const WalletsList = () => {
  const iconsThemeColor = useColorModeValue('teal.900', 'orange.300');
  const bgSection = useColorModeValue('orange.200', 'teal.700');

  return (
    <>
      <Box
        as="section"
        w="100%"
        maxW="container.xl"
        p={0}
        bg={bgSection}
        borderRadius={35}
        shadow="lg"
      >
        <Flex justify="center">
          <VStack
            w="50vw"
            p={8}
            spacing={8}
            alignItems="flex-start"
            justify="center"
            // bg="gray.400"
          >
            <Text as="h2" fontWeight="bold">
              Total Balance:{' '}
            </Text>
            <Text>Choose your wallet</Text>
            <AddWalletModal />
          </VStack>
          <VStack
            w="100vw"
            p={8}
            spacing={8}
            justify="center"
            // bg="gray.300"
          >
            <WalletCard />
          </VStack>
          <VStack
            w="50vw"
            p={8}
            spacing={8}
            alignItems="center"
            justify="center"
            // bg="gray.400"
          >
            <PiggyBankIcon w={24} h={24} color={iconsThemeColor} />
            <Text fontWeight="bold">0</Text>
          </VStack>
        </Flex>
      </Box>
    </>
  );
};
