import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { Box, Flex, HStack, IconButton, Tooltip } from '@chakra-ui/react';
import { format } from 'date-fns';

import { NoteIcon } from '@/assets';
import { useCentralTheme } from '@/theme';

export const ExpenseItem = ({ transaction, onEdit, onDelete, isShortView }) => {
  const { popupExpBgColor, popupExpTextColor } = useCentralTheme();

  const isLongDisplayVersion = !isShortView;

  const renderLongVersionFragment = () => {
    return (
      <>
        <Box
          w="20%"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          <Tooltip label={'transaction.wallet'}>{'transaction.wallet'}</Tooltip>
        </Box>
        <Box w="10%">{'transaction.payer'}</Box>
        <Box
          w="10%"
          textOverflow="ellipsis"
          overflow="hidden"
          whiteSpace="nowrap"
        >
          <Tooltip label={transaction.description}>
            <Flex align="center" justify="center">
              <NoteIcon color={popupExpTextColor}></NoteIcon>
            </Flex>
          </Tooltip>
        </Box>

        <Flex w="10%" justify="space-around">
          <Box>
            <IconButton onClick={onEdit} icon={<EditIcon />} />
          </Box>
          <Box>
            <IconButton onClick={onDelete} icon={<DeleteIcon />} />
          </Box>
        </Flex>
      </>
    );
  };

  return (
    <HStack
      justify="space-around"
      w="100%"
      boxShadow="lg"
      bg={popupExpBgColor}
      color={popupExpTextColor}
      paddingY={5}
      maxW="container.xl"
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
        <Tooltip label={'transaction.subcategory'}>
          {'transaction.category'}
        </Tooltip>
      </Box>
      <Box w="7%">{transaction.value}</Box>
      {isLongDisplayVersion && renderLongVersionFragment()}
    </HStack>
  );
};
