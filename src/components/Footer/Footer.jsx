import { InfoOutlineIcon } from '@chakra-ui/icons';
import { Center, Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

export const Footer = () => {
  return (
    <>
      <Flex h="10vh" boxShadow="lg">
        <Center flex="1 0 40%" align="center">
          <Text fontSize="3xl">Space for something interesting</Text>
        </Center>
        <Flex flex="1 0 20%" justify="space-evenly" align="center">
          <Text fontSize="5xl">Footer</Text>
        </Flex>
        <Flex flex="1 0 40%" direction="column" justify="center" align="center">
          <Center>
            <InfoOutlineIcon />
            <Text m={(0, 1)}>{i18next.t('copyright')}</Text>
          </Center>
          <Text>{i18next.t('rights.reserved')}</Text>
        </Flex>
      </Flex>
    </>
  );
};
