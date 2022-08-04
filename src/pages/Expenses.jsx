import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Box,
  Flex,
  HStack,
  Tag,
  TagCloseButton,
  TagLabel,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteTransactions, getTransactions } from '@/api/Transactions';
import {
  DeleteConfirmationModal,
  ExpenseItem,
  FiltersExpenses
} from '@/components';

export const FilterTag = ({ text }) => {
  return (
    <Tag size="lg" variant="solid" colorScheme="teal">
      <TagLabel>{text}</TagLabel>
      <TagCloseButton />
    </Tag>
  );
};

export const Expenses = () => {
  const [chosenExpenseId, setChosenExpenseId] = useState();

  const bgMain = useColorModeValue('orange.100', 'teal.900');
  const cardBg = useColorModeValue('orange.50', 'teal.600');

  const deleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const { data, isFetched } = useQuery(['transactions'], () =>
    getTransactions()
  );

  const mutationTransaction = useMutation(
    () => deleteTransactions(chosenExpenseId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['transactions']);
      }
    }
  );
  const onDelete = () => {
    mutationTransaction.mutate();
    deleteModal.onClose();
  };
  const onEdit = () => {
    // code to edit
  };

  return (
    <Box bg={bgMain} w="100%" mt={6}>
      <Flex bg={cardBg} direction="column" justify="center" align="center">
        <Box bg={bgMain} w="100%" px={24} py={6}>
          <Box mb="50px">
            <FiltersExpenses />
          </Box>
          <HStack spacing={4}>
            {['Food', 'Beauty', 'Utilities'].map((name) => (
              <FilterTag key={name} text={name} />
            ))}
          </HStack>

          <VStack spacing={5} pt={5}>
            {isFetched &&
              data.data
                .filter((data) => data.transactionType === 'Expense')
                .map((dataTransaction) => (
                  <ExpenseItem
                    key={dataTransaction.id}
                    transaction={dataTransaction}
                    onEdit={onEdit}
                    onDelete={() => {
                      setChosenExpenseId(dataTransaction.id);
                      deleteModal.onOpen();
                    }}
                  />
                ))}
          </VStack>
          <DeleteConfirmationModal
            isOpen={deleteModal.isOpen}
            onSubmit={onDelete}
            onClose={deleteModal.onClose}
            title={i18next.t('modal.deleteExpense.title')}
            text={i18next.t('modal.deleteExpense.text')}
          />
        </Box>
      </Flex>
    </Box>
  );
};
