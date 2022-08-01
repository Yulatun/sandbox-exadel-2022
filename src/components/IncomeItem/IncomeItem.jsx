import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { NoteIcon } from '@/assets';
export const IncomeItem = ({ transaction, onEdit, onDelete }) => {
  const bgMain = useColorModeValue('orange.50', 'teal.700');
  const textColor = useColorModeValue('teal.900', 'orange.50');

  return (
    <HStack
      justify="space-evenly"
      w="100%"
      bg={bgMain}
      color={textColor}
      paddingY={4}
      boxShadow="lg"
    >
      <Box w="8%">
        {format(new Date(transaction.dateOfTransaction), 'dd.MM.yyyy')}
      </Box>
      <Box
        w="15%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={transaction.id}>{transaction.transactionType}</Tooltip>
      </Box>
      <Box w="10%">{transaction.value}</Box>
      <Box
        w="15%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={transaction.categoryId}>Wallet in dollars</Tooltip>
      </Box>

      <Box
        w="10%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={transaction.description}>
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
  );
};
