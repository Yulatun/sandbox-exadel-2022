import { Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Flex
      as="footer"
      justifyContent="center"
      textAlign="center"
      mt="20px"
      w="100%"
      minH="100px"
      boxShadow="lg"
    >
      <Text color="#ccb" fontSize="xl">
        {i18next.t('footer.message')} {currentYear}
      </Text>
    </Flex>
  );
};
