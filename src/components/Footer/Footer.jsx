import { Flex, Text, useColorModeValue } from '@chakra-ui/react';

export const Footer = () => {
  const bgFooter = useColorModeValue('orange.100', 'teal.900');
  return (
    <Flex h="10vh" bg={bgFooter} justify="center">
      <Text fontSize="5xl">Footer</Text>
    </Flex>
  );
};
