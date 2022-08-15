import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import {
  Box,
  Flex,
  Heading,
  Link,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import {
  deleteExpense,
  deleteIncome,
  editExpense,
  editIncome
} from '@/api/Transaction';
import { useCentralTheme } from '@/theme';

import { ConfirmationModal } from '../ConfirmationModal';
import { EditExpenseModal } from '../EditExpenseModal';
import { EditIncomeModal } from '../EditIncomeModal';
import { NotificationModal } from '../NotificationModal';
import { TransactionItem } from '../TransactionItem';

export const TransactionList = ({
  list,
  maxH,
  isExpensesType = false,
  isShortView = false,
  onShowMore,
  hasNextPage,
  walletsData,
  categoriesData,
  payersData = null
}) => {
  const [chosenTransactionData, setChosenTransactionData] = useState({});

  const editIncomeModal = useDisclosure();
  const editExpenseModal = useDisclosure();
  const editTransactionModalSuccess = useDisclosure();
  const editTransactionModalCancel = useDisclosure();
  const deleteTransactionModal = useDisclosure();

  const queryClient = useQueryClient();

  const { transactionTitleBgColor, textColor } = useCentralTheme();

  const sortTransactionsByDate = (a, b) =>
    new Date(b.dateOfTransaction) - new Date(a.dateOfTransaction);

  const editingIncome = useMutation(
    (data) =>
      editIncome({
        ...chosenTransactionData,
        walletId: data.wallet?.value,
        categoryId: data.category?.value,
        dateOfTransaction: new Date(
          `${data.date}T${new Date().toISOString().split('T')[1]}`
        ),
        value: Number(data.amount),
        description: data.note
      }),
    {
      onSuccess: () => {
        editTransactionModalSuccess.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['incomes']);
      }
    }
  );

  const editingExpense = useMutation(
    (data) =>
      editExpense({
        ...chosenTransactionData,
        walletId: data.wallet?.value,
        categoryId: data.category?.value,
        subCategoryId: data.subcategory?.value,
        payer: data.payer?.value,
        dateOfTransaction: new Date(
          `${data.date}T${new Date().toISOString().split('T')[1]}`
        ),
        value: Number(data.amount),
        description: data.note
      }),
    {
      onSuccess: () => {
        editTransactionModalSuccess.onOpen();
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
      editIncomeModal.onOpen();
      return;
    }

    editExpenseModal.onOpen();
  };

  const openModalOnDelete = (dataTransaction) => {
    setChosenTransactionData(dataTransaction);
    deleteTransactionModal.onOpen();
  };

  const editOnSubmit = (data) => {
    if (chosenTransactionData.transactionType === 'Income') {
      editIncomeModal.onClose();
      editingIncome.mutate(data);
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
    editTransactionModalCancel.onClose();
    editIncomeModal.onClose();
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
        {hasNextPage ? (
          <Flex justify="flex-end" w="100%">
            <Link onClick={onShowMore}>Show more</Link>
          </Flex>
        ) : null}
      </VStack>

      {!!Object.keys(chosenTransactionData).length && (
        <EditIncomeModal
          isOpen={editIncomeModal.isOpen}
          onClose={editTransactionModalCancel.onOpen}
          onSubmit={editOnSubmit}
          walletsData={walletsData}
          categoriesData={categoriesData}
          incomeData={chosenTransactionData}
        />
      )}
      {!!Object.keys(chosenTransactionData).length && (
        <EditExpenseModal
          isOpen={editExpenseModal.isOpen}
          onClose={editTransactionModalCancel.onOpen}
          onSubmit={editOnSubmit}
          walletsData={walletsData}
          categoriesData={categoriesData}
          payersData={payersData}
          expenseData={chosenTransactionData}
        />
      )}
      {(!editIncomeModal.isOpen || !editExpenseModal.isOpen) && (
        <NotificationModal
          isOpen={editTransactionModalSuccess.isOpen}
          onSubmit={editTransactionModalSuccess.onClose}
          onClose={editTransactionModalSuccess.onClose}
          text={i18next.t(
            `modal.edit${chosenTransactionData.transactionType}.editedMessage.success`
          )}
        />
      )}
      <ConfirmationModal
        isOpen={editTransactionModalCancel.isOpen}
        onSubmit={resetEditingOnSubmit}
        onClose={editTransactionModalCancel.onClose}
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
