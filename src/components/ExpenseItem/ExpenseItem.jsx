import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';

import { NoteIcon } from '@/assets';

export const ExpenseItem = ({ transaction, onEdit, onDelete, version }) => {
  const bgMain = useColorModeValue('orange.50', 'teal.700');
  const textColor = useColorModeValue('teal.900', 'orange.50');

  let fullVersionOfExpenseItem = (
    <HStack
      justify="space-around"
      w="100%"
      boxShadow="lg"
      bg={bgMain}
      color={textColor}
      paddingY={3}
    >
      <Box w="8%">{transaction.date}</Box>
      <Box
        w="15%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={transaction.category}>{transaction.category}</Tooltip>
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
  );

  let shortVersionOfExpenseItem = (
    <HStack
      justify="space-around"
      w="100%"
      boxShadow="lg"
      bg={bgMain}
      color={textColor}
      paddingY={3}
    >
      <Box w="8%">{transaction.date}</Box>
      <Box
        w="15%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={transaction.category}>{transaction.category}</Tooltip>
      </Box>
      <Box w="7%">{transaction.amount}</Box>
    </HStack>
  );

  const chooseVersion = (v) => {
    if (v == 'short') {
      return shortVersionOfExpenseItem;
    } else {
      return fullVersionOfExpenseItem;
    }
  };

  return <>{chooseVersion(version)}</>;
};
