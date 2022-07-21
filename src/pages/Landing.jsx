import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddWallet, Footer } from '@/components';

export const Landing = () => {
  return (
    <>
      <Text fontSize="4xl" align="center">
        {i18next.t('landing.welcomeMessage')}
      </Text>
      <Box bg="bisque" w="100%" p={4} color="blueviolet">
        <Flex direction="column" justify="center" align="center" m="4">
          <AddWallet />
        </Flex>
        <Flex
          borderWidth="2px"
          borderColor="teal.600"
          direction="column"
          align="center"
          p="5"
          maxW="30%"
          m="0 auto"
        >
          <Text fontSize="1xl">
            Field with buttons and Input just to touch them
          </Text>
          <Flex justify="center" wrap="wrap" m="2">
            <Button m="2" variant="primary">
              Primary
            </Button>
            <Button m="2" variant="secondary">
              Secondary
            </Button>
            <Button m="2" variant="danger">
              Danger
            </Button>
          </Flex>
          <Input placeholder="Input" />
        </Flex>
      </Box>

      <Footer />
    </>
  );
};
