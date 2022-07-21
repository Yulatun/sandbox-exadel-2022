import { Box, Button, Flex, Input, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddWallet, Footer } from '@/components';

export const Landing = () => {
  return (
    <>
      <Text fontSize="4xl" align="center">
        {i18next.t('landing.welcomeMessage')}
      </Text>
      <Box bg="orange.200" w="100%" p={4}>
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
          <Text fontSize="1xl">{i18next.t('button.input.field')}</Text>
          <Flex justify="center" wrap="wrap" m="2">
            <Button m="2" variant="primary">
              {i18next.t('button.primary')}
            </Button>
            <Button m="2" variant="secondary">
              {i18next.t('button.secondary')}
            </Button>
            <Button m="2" variant="danger">
              {i18next.t('button.danger')}
            </Button>
          </Flex>
          <Input placeholder="Input" />
        </Flex>
      </Box>

      <Footer />
    </>
  );
};
