import {
  Box,
  Flex,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue
} from '@chakra-ui/react';
import i18next from 'i18next';

import { FiltersExpenses, Footer } from '@/components';

export const FilterTag = ({ text }) => {
  return (
    <Tag size="lg" variant="solid" colorScheme="teal">
      <TagLabel>{text}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};

export const Expenses = () => {
  const cardBg = useColorModeValue('orange.50', 'teal.600');
  const bgMain = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <Box bg={bgMain} w="100%" p={4}>
        <Flex bg={cardBg} direction="column" justify="center" align="center">
          <Box bg={bgMain} w="100%" px={24} py={6}>
            <Box mb="50px">
              <FiltersExpenses />
            </Box>
            <HStack spacing={4}>
              {['Food', 'Beauty', 'Utilities'].map((name) => (
                <FilterTag key={name} text={name} />
              ))}
            </HStack>
          </Box>
          <main>
            <h2>{i18next.t('expenses.welcomeMessage')}</h2>
          </main>
        </Flex>
      </Box>
      <Footer />
    </>
  );
};
