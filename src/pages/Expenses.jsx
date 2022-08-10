import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Flex, HStack, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteExpense, editExpense, getExpenses } from '@/api/Transaction';
import {
  DeleteConfirmationModal,
  ExpenseItem,
  FiltersExpenses
} from '@/components';
import { EditExpenseModal } from '@/components/EditExpenseModal';
import { FiltersTag } from '@/components/FiltersTag';

export const Expenses = () => {
  const [chosenExpenseData, setChosenExpenseData] = useState({});

  const editExpenseModal = useDisclosure();
  const deleteExpenseModal = useDisclosure();

  const queryClient = useQueryClient();

  const { data: dataExpenses, isFetched: isFetchedExpenses } = useQuery(
    ['expenses'],
    getExpenses
  );

  const editingExpense = useMutation(
    (data) =>
      editExpense({
        ...chosenExpenseData,
        walletId: data.wallet,
        categoryId: data.category,
        payer: data.payer,
        dateOfTransaction: new Date(data.date),
        value: Number(data.amount),
        description: data.note
      })
        .then(() => alert(i18next.t('modal.editExpense.editedMessage.success')))
        .catch((error) => console.log(error)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses']);
      }
    }
  );

  const deletingTransaction = useMutation(
    () => deleteExpense(chosenExpenseData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses']);
      }
    }
  );

  const openOnEdit = (dataTransaction) => {
    setChosenExpenseData(dataTransaction);
    editExpenseModal.onOpen();
  };

  const openOnDelete = (dataTransaction) => {
    setChosenExpenseData(dataTransaction);
    deleteExpenseModal.onOpen();
  };

  const saveOnEdit = (data) => {
    editingExpense.mutate(data);
    editExpenseModal.onClose();
  };

  const saveOnDelete = () => {
    deletingTransaction.mutate();
    deleteExpenseModal.onClose();
  };

  const resetOnClose = () => {
    setChosenExpenseData({});
    editExpenseModal.onClose();
  };

  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="flex-start"
      py={8}
      px={4}
      w="100%"
    >
      <Box mb="50px" w="100%">
        <FiltersExpenses />
      </Box>

      <HStack spacing={4} w="100%">
        {['Food', 'Beauty', 'Utilities'].map((name) => (
          <FiltersTag key={name} text={name} />
        ))}
      </HStack>

      <VStack spacing={5} pt={5} w="100%">
        {!!dataExpenses &&
          !!dataExpenses.data &&
          isFetchedExpenses &&
          dataExpenses.data.map((expenseData) => (
            <ExpenseItem
              key={expenseData.id}
              expenseData={expenseData}
              onEdit={() => openOnEdit(expenseData)}
              onDelete={() => openOnDelete(expenseData)}
            />
          ))}
      </VStack>

      {!!Object.keys(chosenExpenseData).length && (
        <EditExpenseModal
          isOpen={editExpenseModal.isOpen}
          onSubmit={saveOnEdit}
          onClose={() => {
            if (confirm(i18next.t('modal.editExpense.editedMessage.cancel'))) {
              resetOnClose();
            }
          }}
          expenseData={chosenExpenseData}
        />
      )}
      {!!Object.keys(chosenExpenseData).length && (
        <DeleteConfirmationModal
          isOpen={deleteExpenseModal.isOpen}
          onSubmit={saveOnDelete}
          onClose={deleteExpenseModal.onClose}
          title={i18next.t('modal.deleteExpense.title')}
          text={i18next.t('modal.deleteExpense.text')}
        />
      )}
    </Flex>
  );
};
