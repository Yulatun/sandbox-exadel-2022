import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Center,
  HStack,
  IconButton,
  Tooltip,
  useColorModeValue
} from '@chakra-ui/react';

import { i18n } from '@/i18n';

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
            <Tooltip label={transaction.notes}>{transaction.notes}</Tooltip>
          </Box>
          <Box w="5%">
            <IconButton onClick={onEdit} icon={<EditIcon />}>
              {i18n.t('expenses.tableExpenses.buttonEdit')}
            </IconButton>
          </Box>
          <Box w="5%">
            <IconButton onClick={onDelete} icon={<DeleteIcon />}>
              {i18n.t('expenses.tableExpenses.buttonDelete')}
            </IconButton>
          </Box>
        </HStack>
      </Center>
    </>
  );
};
