import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';

import { NoteIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

export const IncomeItem = ({ incomeData, onEdit, onDelete }) => {
  const { popupExpBgColor, popupExpTextColor } = useCentralTheme();

  return (
    <HStack
      justify="space-evenly"
      w="100%"
      bg={popupExpBgColor}
      color={popupExpTextColor}
      paddingY={4}
      boxShadow="lg"
    >
      <Box w="8%">
        {format(new Date(incomeData.dateOfTransaction), 'dd.MM.yyyy')}
      </Box>
      <Box
        w="15%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={incomeData.id}>{incomeData.transactionType}</Tooltip>
      </Box>
      <Box w="10%">
        {incomeData.value}
        {incomeData.currency.symbol}
      </Box>
      <Box
        w="15%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={incomeData.categoryId}>Wallet in dollars</Tooltip>
      </Box>

      <Box
        w="10%"
        textOverflow="ellipsis"
        overflow="hidden"
        whiteSpace="nowrap"
      >
        <Tooltip label={incomeData.description}>
          <Flex align="center" justify="center">
            <NoteIcon color={popupExpTextColor}></NoteIcon>
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
