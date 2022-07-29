import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';

export const Incomes = ({ onEdit, onDelete }) => {
  const bgMain = useColorModeValue('orange.50', 'teal.700');
  const textColor = useColorModeValue('teal.900', 'orange.50');

  return (
    <>
      <Center paddingY={3}>
        <HStack
          justify="space-evenly"
          w="80%"
          bg={bgMain}
          color={textColor}
          paddingY={3}
          boxShadow="lg"
        >
          <Box w="8%">16.08.1993</Box>
          <Box w="15%">
            <Tooltip>Salary from Freelance</Tooltip>
          </Box>
          <Box w="10%">100$</Box>
          <Box w="15%">
            <Tooltip>Wallet in dollars</Tooltip>
          </Box>

          <Box w="10%">Notes</Box>

          <Flex w="10%" justify="space-around">
            <Box>
              <IconButton onClick={onEdit} icon={<EditIcon />}></IconButton>
            </Box>
            <Box>
              <IconButton onClick={onDelete} icon={<DeleteIcon />}></IconButton>
            </Box>
          </Flex>
        </HStack>
      </Center>
    </>
  );
};
