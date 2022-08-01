import { useQuery } from 'react-query';
import { Box, Flex, useColorModeValue, VStack } from '@chakra-ui/react';

import { getTransactions } from '@/api/Transactions';
import { IncomeItem } from '@/components';

export const Incomes = () => {
  const { data, isFetched } = useQuery(['transactions'], () =>
    getTransactions()
  );

  const bgMain = useColorModeValue('orange.100', 'teal.900');

  return (
    <Box bg={bgMain} w="100%" mt={6}>
      <Flex bg={bgMain} direction="column" justify="center" align="center">
        <VStack w="80%" pt={5} align="stretch" justify="center">
          {isFetched &&
            data.data
              .filter((data) => data.transactionType === 'Income')
              .map((dataTransaction) => (
                <IncomeItem
                  key={dataTransaction.id}
                  transaction={dataTransaction}
                />
              ))}
        </VStack>
      </Flex>
    </Box>
  );
};
