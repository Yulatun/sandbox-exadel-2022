import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Text,
  useColorModeValue
} from '@chakra-ui/react';
import i18next from 'i18next';

export const About = () => {
  const cardBg = useColorModeValue('orange.50', 'teal.600');
  const bgMain = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <Box bg={bgMain} w="100%" p={4}>
        <Flex direction="column" justify="center" align="center">
          <main>
            <h2>{i18next.t('about.welcomeMessage')}</h2>
          </main>
        </Flex>
        <Flex
          bg={cardBg}
          borderRadius="50"
          boxShadow="md"
          direction="column"
          align="center"
          p="50"
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
          <FormControl variant="floating">
            <Input placeholder=" " />
            <FormLabel>Input</FormLabel>
          </FormControl>
        </Flex>
      </Box>
    </>
  );
};
