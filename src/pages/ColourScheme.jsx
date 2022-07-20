import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Center,
  Flex,
  Heading,
  IconButton,
  Input,
  Text,
  useColorModeValue,
  Wrap
} from '@chakra-ui/react';

export const ColourScheme = () => {
  const bgMain = useColorModeValue('orange.100', 'teal.900');
  const bgCard = useColorModeValue('orange.50', 'teal.800');
  const buttonColor1 = useColorModeValue('teal.800', 'orange.100');
  const buttonColor2 = useColorModeValue('orange.50', 'teal.800');
  const btnTextColor2 = useColorModeValue('teal.900', 'orange.100');
  const inputBgColor = useColorModeValue('orang.100', 'teal.600');
  const bgColorIcon = useColorModeValue('teal.900', 'teal.900');

  return (
    <>
      <Center flexDirection="column" bg={bgMain}>
        <Box
          m={10}
          w="50%"
          h="50%"
          borderRadius="50"
          boxShadow="md"
          bg={bgCard}
        >
          <Center flexDirection="column" m={5} p={5}>
            <Heading color={buttonColor1} p={5}>
              Some title
            </Heading>
            <Text color={buttonColor1} p={5}>
              some long text some long text
            </Text>
            <Input
              placeholder="Placeholder"
              w="60%"
              p={5}
              borderRadius="10"
              border="2px"
              bg={inputBgColor}
              borderColor={bgMain}
            />
          </Center>

          <Center>
            <Flex direction="column">
              <Wrap spacing={4} m={5}>
                <Button
                  bg={buttonColor1}
                  color={bgMain}
                  borderRadius="10"
                  size="lg"
                  _hover={{ bg: 'teal.600' }}
                >
                  Button1
                </Button>

                <Button
                  bg={buttonColor2}
                  color={btnTextColor2}
                  borderRadius="10"
                  border="1px"
                  size="lg"
                >
                  Button2
                </Button>
              </Wrap>
              <Wrap spacing={4} m={5}>
                <Button bg="red.500" color={bgMain} borderRadius="10" size="lg">
                  Delete
                </Button>
                <IconButton
                  bg={bgColorIcon}
                  icon={<AddIcon color="orange.100" />}
                ></IconButton>
              </Wrap>
            </Flex>
          </Center>
        </Box>
        <Center flexDirection="column" color={buttonColor1}>
          <Heading>Some title</Heading>
          <Text> some long text </Text>
        </Center>
      </Center>
    </>
  );
};
