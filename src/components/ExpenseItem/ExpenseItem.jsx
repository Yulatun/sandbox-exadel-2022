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

import { NoteIcon } from '@/assets';

export const ExpenseItem = ({ transaction, onEdit, onDelete }) => {
  const bgMain = useColorModeValue('orange.50', 'teal.700');
  const textColor = useColorModeValue('teal.900', 'orange.50');

  return (
    <>
      <Center>
        <HStack
          justify="space-around"
          w="80%"
          boxShadow="lg"
          bg={bgMain}
          color={textColor}
          p={3}
          m={2}
        >
          <Box w="8%">{transaction.date}</Box>
          <Box
            w="15%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            <Tooltip label={transaction.category}>
              {transaction.category}
            </Tooltip>
          </Box>
          <Box w="7%">{transaction.amount}</Box>
          <Box
            w="20%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            <Tooltip label={transaction.wallet}>{transaction.wallet}</Tooltip>
          </Box>
          <Box w="10%">{transaction.payer}</Box>
          <Box
            w="10%"
            textOverflow="ellipsis"
            overflow="hidden"
            whiteSpace="nowrap"
          >
            <Tooltip label={transaction.notes}>
              <Flex align="center" justify="center">
                <NoteIcon color={textColor}></NoteIcon>
              </Flex>
            </Tooltip>
          </Box>

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
