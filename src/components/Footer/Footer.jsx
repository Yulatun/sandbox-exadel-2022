import { Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex h="10vh" boxShadow="lg" justify="center">
      <footer>
        <Text color="#ccb" fontSize="xl">
          Exadel Internship {currentYear}
        </Text>
      </footer>
    </Flex>
  );
};
