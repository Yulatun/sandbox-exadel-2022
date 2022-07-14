import { Box, Flex } from '@chakra-ui/react';
import i18next from 'i18next';

export const Landing = () => {
  return (
    <>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('landing.welcomeMessage')}</h2>
          </main>
        </Flex>
      </Box>
    </>
  );
};
