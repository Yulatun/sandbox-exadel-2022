import { Box, Flex } from '@chakra-ui/react';
import i18next from 'i18next';

import { Footer } from '@/components';

export const Landing = () => {
  return (
    <>
      <Box bg="bisque" w="100%" h="1000px" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('landing.welcomeMessage')}</h2>
          </main>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
