import { Box, Flex } from '@chakra-ui/react';
import i18next from 'i18next';

import { Footer } from '@/components';

export const Expenses = () => {
  return (
    <>
      <Box bg="orange.300" w="100%" p={4} color="cornsilk">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('expenses.welcomeMessage')}</h2>
          </main>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
