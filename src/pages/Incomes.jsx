import { Box, Flex, useColorModeValue } from '@chakra-ui/react';

import { IncomeItem } from '@/components';

export const Incomes = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');
  const cardBg = useColorModeValue('orange.50', 'teal.600');

  return (
    <>
      <Box bg={bgMain} w="100%">
        <Flex bg={cardBg} direction="column" justify="center" align="center">
          <Box bg={bgMain} w="100%">
            <IncomeItem />
            <IncomeItem />
            <IncomeItem />
          </Box>
        </Flex>
      </Box>
    </>
  );
};
