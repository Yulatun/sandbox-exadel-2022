import { Flex, Text } from '@chakra-ui/react';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      position="absolute"
      width="100%"
      textAlign="center"
      bottom="0"
      height="10vh"
      boxShadow="lg"
      justify="center"
      marginTop="20px"
      zIndex="-1"
    >
      <footer>
        <Text color="#ccb" fontSize="xl">
          Exadel Internship {currentYear}
        </Text>
      </footer>
    </Flex>
  );
};
