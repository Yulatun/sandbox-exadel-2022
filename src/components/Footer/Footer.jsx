import { Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

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
          {i18next.t('footer.message')} {currentYear}
        </Text>
      </footer>
    </Flex>
  );
};
