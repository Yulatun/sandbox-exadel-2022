import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Flex,
  Heading,
  HStack,
  IconButton,
  Tooltip,
  VStack
} from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

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
      <HStack
        justify="space-evenly"
        w="100%"
        color={textColor}
        pt="15px"
        pb="15px"
        mt="10px"
        boxShadow="2xl"
        bg={popupBgColor}
      >
        <Box w="27%">
          <Heading as="h2" pl="60px" size="sm" color={textColor}>
            {i18next.t('transaction.title.data')}
          </Heading>
        </Box>
        <Box w="23%">
          <Heading as="h2" size="sm" color={textColor}>
            {i18next.t('transaction.title.category')}
          </Heading>
        </Box>
        <Box w="17%">
          <Heading as="h2" size="sm" color={textColor}>
            {i18next.t('transaction.title.amount')}
          </Heading>
        </Box>
        <Box w="18%">
          <Heading as="h2" size="sm" color={textColor}>
            {i18next.t('transaction.title.walletName')}
          </Heading>
        </Box>
        <Box>
          <Heading as="h2" size="sm" color={textColor}>
            {i18next.t('transaction.title.edit')}
          </Heading>
        </Box>
        <Box w="15%">
          <Heading as="h2" size="sm" color={textColor}>
            {i18next.t('transaction.title.delete')}
          </Heading>
        </Box>
      </HStack>

      {list.slice(0, 10).map((transaction) => (
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
          <Box w="10%">
            {transaction.value} {transaction.currency.symbol}
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
      ))}
    </VStack>
  );
};
