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
  const bg = useColorModeValue('orange.100', 'teal.900');
  const bgcard = useColorModeValue('orange.50', 'teal.800');
  const buttoncolor = useColorModeValue('teal.800', 'orange.100');
  const textcollor = useColorModeValue('orange.100', 'teal.900');
  const buttoncolor2 = useColorModeValue('orange.50', 'teal.800');
  const textbuttoncollor2 = useColorModeValue('teal.900', 'orange.100');
  const inputbgcolor = useColorModeValue('orang.100', 'teal.600');
  const disablebuttoncolor = useColorModeValue('red.500', 'red.500');
  const textdisablebuttoncolor = useColorModeValue('orange.100', 'teal.900');
  return (
    <>
      <div backgroundcolor="black">
        <Center flexDirection="column" bg={bg}>
          <Box
            m={10}
            p={0}
            w="50%"
            h="50%"
            borderRadius="50"
            boxShadow="md"
            bg={bgcard}
          >
            <Center flexDirection="column" m={5} p={5}>
              <Heading color={buttoncolor} p={5}>
                Some title
              </Heading>
              <Text color={buttoncolor} p={5}>
                some long text some long text
              </Text>
              <Input
                placeholder="Placeholder"
                w="60%"
                p={5}
                borderRadius="10"
                border="2px"
                bg={inputbgcolor}
                borderColor={bg}
              />
            </Center>

            <Center>
              <Flex direction="column">
                {/* <Center bg="orange.300" h={150} flexDirection="column"> */}
                <Wrap spacing={4} m={5}>
                  <Button
                    bg={buttoncolor}
                    color={textcollor}
                    borderRadius="10"
                    size="lg"
                    _hover={{ bg: 'teal.600' }}
                  >
                    Button1
                  </Button>

                  <Button
                    bg={buttoncolor2}
                    color={textbuttoncollor2}
                    borderRadius="10"
                    border="1px"
                    size="lg"
                  >
                    Button2
                  </Button>
                </Wrap>
                <Wrap spacing={4} m={5}>
                  <Button
                    bg={disablebuttoncolor}
                    color={textdisablebuttoncolor}
                    borderRadius="10"
                    size="lg"
                  >
                    Delete
                  </Button>
                  <IconButton
                    bg="teal.800"
                    icon={<AddIcon color="orange.100" />}
                  ></IconButton>
                </Wrap>
                {/* </Center> */}
              </Flex>
            </Center>
          </Box>

          <Center flexDirection="column" color={buttoncolor}>
            <Heading>Some title</Heading>
            <Text> some long text </Text>
          </Center>
        </Center>
      </div>
    </>
  );
};
