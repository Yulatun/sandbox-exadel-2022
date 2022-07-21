import { Button, Flex, Input, Text } from '@chakra-ui/react';

// import i18next from 'i18next';
// import { Footer } from '@/components';

export const Landing = () => {
  return (
    <>
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
      {/* <Footer /> */}
    </>
  );
};
