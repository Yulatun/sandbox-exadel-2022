import { FaRegCopyright } from 'react-icons/fa';
import { Center, Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { FooterNav } from './FooterNav';

export const Footer = () => {
  return (
    <>
      <Flex h="10vh" boxShadow="lg">
        <Center flex="1 0 40%" align="center">
          <Text fontSize="3xl">Space for something interesting</Text>
        </Center>
        <Flex flex="1 0 20%" justify="space-evenly" align="center">
          <FooterNav />
        </Flex>
        <Flex flex="1 0 40%" direction="column" justify="center" align="center">
          <Center>
            <FaRegCopyright />
            <Text m={(0, 1)}>{i18next.t('copyright')}</Text>
          </Center>
          <Text>{i18next.t('rights.reserved')}</Text>
        </Flex>
      </Flex>
    </>
  );
};
