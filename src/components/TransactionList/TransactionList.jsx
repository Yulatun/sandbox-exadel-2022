import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Box, Flex, Heading, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteExpense, deleteIncome, editExpense } from '@/api/Transaction';
import { useCentralTheme } from '@/theme';

import { ConfirmationModal } from '../ConfirmationModal';
import { EditExpenseModal } from '../EditExpenseModal';
import { NotificationModal } from '../NotificationModal';
import { TransactionItem } from '../TransactionItem';

export const TransactionList = ({
  list,
  maxH,
  isExpensesType = false,
  isShortView = false,
  walletsData,
  categoriesData,
  payersData = null
}) => {
  const [chosenTransactionData, setChosenTransactionData] = useState({});

  const editExpenseModal = useDisclosure();
  const editExpenseModalSuccess = useDisclosure();
  const editExpenseModalCancel = useDisclosure();
  const deleteTransactionModal = useDisclosure();

  const queryClient = useQueryClient();

  const { transactionTitleBgColor, textColor } = useCentralTheme();

  const sortTransactionsByDate = (a, b) =>
    new Date(b.dateOfTransaction) - new Date(a.dateOfTransaction);

  const editingExpense = useMutation(
    (data) =>
      editExpense({
        ...chosenTransactionData,
        walletId: data.wallet?.value,
        categoryId: data.category?.value,
        payer: data.payer?.value,
        dateOfTransaction: new Date(
          `${data.date}T${new Date().toISOString().split('T')[1]}`
        ),
        value: Number(data.amount),
        description: data.note
      }),
    {
      onSuccess: () => {
        editExpenseModalSuccess.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['expenses']);
      }
    }
  );

  const deletingIncome = useMutation(
    () => deleteIncome(chosenTransactionData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['incomes']);
      }
    }
  );

  const deletingExpense = useMutation(
    () => deleteExpense(chosenTransactionData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['wallets']);
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

  const resetEditingOnSubmit = () => {
    setChosenTransactionData({});
    editExpenseModalCancel.onClose();
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
          onClose={editExpenseModalCancel.onOpen}
          onSubmit={editOnSubmit}
          walletsData={walletsData}
          categoriesData={categoriesData}
          payersData={payersData}
          expenseData={chosenTransactionData}
        />
      )}
      {!editExpenseModal.isOpen && (
        <NotificationModal
          isOpen={editExpenseModalSuccess.isOpen}
          onSubmit={editExpenseModalSuccess.onClose}
          onClose={editExpenseModalSuccess.onClose}
          text={i18next.t('modal.editExpense.editedMessage.success')}
        />
      )}
      <ConfirmationModal
        isOpen={editExpenseModalCancel.isOpen}
        onSubmit={resetEditingOnSubmit}
        onClose={editExpenseModalCancel.onClose}
        title={i18next.t(
          `modal.edit${chosenTransactionData.transactionType}.editedMessage.cancel.title`
        )}
        text={i18next.t(
          `modal.edit${chosenTransactionData.transactionType}.editedMessage.cancel.text`
        )}
      />

      {!!Object.keys(chosenTransactionData).length && (
        <ConfirmationModal
          isOpen={deleteTransactionModal.isOpen}
          onSubmit={deleteOnSubmit}
          onClose={deleteTransactionModal.onClose}
          title={i18next.t(
            `modal.delete${chosenTransactionData.transactionType}.title`
          )}
          text={i18next.t(
            `modal.delete${chosenTransactionData.transactionType}.text`
          )}
        />
      )}
    </>
  );
};
