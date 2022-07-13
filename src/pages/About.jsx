import { Box, Flex } from '@chakra-ui/react';
import i18next from 'i18next';

const About = () => {
  return (
    <>
      <Box bg="teal" w="100%" p={4} color="white">
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('about.welcomeMessage')}</h2>
          </main>
        </Flex>
      </Box>
    </>
  );
};

export default About;
