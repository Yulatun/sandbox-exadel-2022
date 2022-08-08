import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  HStack,
  IconButton,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import { format } from 'date-fns';

import { NoteIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

export const TransactionList = ({ list }) => {
  const { popupBgColor, textColor } = useCentralTheme();

  const onEdit = () => {
    // onEdit
  };

  const onDelete = () => {
    // onDelete
  };

  return (
    <VStack w="80%" pt={5} spacing={5} align="stretch" justify="center">
      {list.map((transaction) => (
        <HStack
          justify="space-evenly"
          w="100%"
          bg={popupBgColor}
          color={textColor}
          paddingY={4}
          boxShadow="lg"
          key={transaction.id}
        >
          <Box w="8%">
            {format(new Date(transaction.dateOfTransaction), 'dd.MM.yyyy')}
          </Box>
          <Box w="15%">{transaction.categoryId}</Box>
          <Box w="5%">{transaction.value}</Box>
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
      ))}
    </VStack>
  );
};
