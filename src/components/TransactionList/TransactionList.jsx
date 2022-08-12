import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Flex, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteExpense, deleteIncome, editExpense } from '@/api/Transaction';
import { useCentralTheme } from '@/theme';

import { ConfirmationModal } from '../ConfirmationModal';
import { EditExpenseModal } from '../EditExpenseModal';
import { TransactionItem } from '../TransactionItem';

export const TransactionList = ({
  list,
  maxH,
  isExpensesType = false,
  isShortView = false
}) => {
  const [chosenTransactionData, setChosenTransactionData] = useState({});

  const editExpenseModal = useDisclosure();
  const deleteTransactionModal = useDisclosure();

  const queryClient = useQueryClient();

  const { transactionTitleBgColor, textColor } = useCentralTheme();

  const sortTransactionsByDate = (a, b) =>
    new Date(b.dateOfTransaction) - new Date(a.dateOfTransaction);

  const editingExpense = useMutation(
    (data) =>
      editExpense({
        ...chosenTransactionData,
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

  const deletingIncome = useMutation(
    () => deleteIncome(chosenTransactionData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['incomes']);
      }
    }
  );

  const deletingExpense = useMutation(
    () => deleteExpense(chosenTransactionData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses']);
      }
    }
  );

  const openModalOnEdit = (dataTransaction) => {
    setChosenTransactionData(dataTransaction);

    if (dataTransaction.transactionType === 'Income') {
      return;
    }

    editExpenseModal.onOpen();
  };

  const openModalOnDelete = (dataTransaction) => {
    setChosenTransactionData(dataTransaction);
    deleteTransactionModal.onOpen();
  };

  const editOnSubmit = (data) => {
    if (data.transactionType === 'Income') {
      return;
    }

    editExpenseModal.onClose();
    editingExpense.mutate(data);
  };

  const deleteOnSubmit = () => {
    deleteTransactionModal.onClose();

    if (chosenTransactionData.transactionType === 'Income') {
      deletingIncome.mutate();
      return;
    }

    deletingExpense.mutate();
  };

  const resetOnClose = () => {
    setChosenTransactionData({});
    editExpenseModal.onClose();
  };

  return (
    <>
      <Flex
        justify="space-between"
        w="100%"
        color={textColor}
        mb={6}
        py={4}
        px={8}
        boxShadow="2xl"
        bg={transactionTitleBgColor}
      >
        <Flex justifyContent="space-between" mr={6} w="100%">
          <Heading
            as="h2"
            size="sm"
            mr="10px"
            minW="85px"
            w="15%"
            textAlign="center"
          >
            {i18next.t('transaction.title.data')}
          </Heading>

          <Heading as="h2" size="sm" mr="10px" w="25%" textAlign="center">
            {i18next.t('transaction.title.category')}
          </Heading>

          <Heading as="h2" size="sm" mr="10px" w="20%" textAlign="center">
            {i18next.t('transaction.title.amount')}
          </Heading>

          <Heading as="h2" size="sm" mr="10px" w="15%" textAlign="center">
            {i18next.t('transaction.title.walletName')}
          </Heading>

          {!isShortView && (
            <>
              {isExpensesType && (
                <Heading as="h2" size="sm" mr="10px" w="20%" textAlign="center">
                  {i18next.t('transaction.title.payer')}
                </Heading>
              )}

              <Heading as="h2" size="sm" minW="40px" w="5%" textAlign="center">
                {i18next.t('transaction.title.note')}
              </Heading>
            </>
          )}
        </Flex>

        <Box minW="90px" w="12%" />
      </Flex>

      <VStack spacing={5} w="100%" maxH={maxH} overflowY="scroll">
        {list.sort(sortTransactionsByDate).map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transactionData={transaction}
            onEdit={() => openModalOnEdit(transaction)}
            onDelete={() => openModalOnDelete(transaction)}
            isExpensesType={isExpensesType}
            isShortView={isShortView}
          />
        ))}
      </VStack>

      {!!Object.keys(chosenTransactionData).length && (
        <EditExpenseModal
          isOpen={editExpenseModal.isOpen}
          onSubmit={editOnSubmit}
          onClose={() => {
            if (confirm(i18next.t('modal.editExpense.editedMessage.cancel'))) {
              resetOnClose();
            }
          }}
          expenseData={chosenTransactionData}
        />
      )}
      {!!Object.keys(chosenTransactionData).length && (
        <ConfirmationModal
          isOpen={deleteTransactionModal.isOpen}
          onSubmit={deleteOnSubmit}
          onClose={deleteTransactionModal.onClose}
          title={
            chosenTransactionData.transactionType === 'Income'
              ? i18next.t('modal.deleteIncome.title')
              : i18next.t('modal.deleteExpense.title')
          }
          text={
            chosenTransactionData.transactionType === 'Income'
              ? i18next.t('modal.deleteIncome.text')
              : i18next.t('modal.deleteExpense.text')
          }
        />
      )}
    </>
  );
};
