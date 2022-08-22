import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { ArrowUpDownIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  createStandaloneToast,
  Flex,
  Heading,
  IconButton,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import { useAutoAnimate } from '@formkit/auto-animate/react';
import i18next from 'i18next';

import {
  deleteExpense,
  deleteIncome,
  editExpense,
  editIncome
} from '@/api/Transaction';
import { Preloader } from '@/components';
import { useCentralTheme } from '@/theme';

import { ConfirmationModal } from '../ConfirmationModal';
import { EditExpenseModal } from '../EditExpenseModal';
import { EditIncomeModal } from '../EditIncomeModal';
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
  payersData = [],
  onSetSortDate
}) => {
  const [chosenTransactionData, setChosenTransactionData] = useState({});

  const editIncomeModal = useDisclosure();
  const editExpenseModal = useDisclosure();
  const editTransactionModalSuccess = useDisclosure();
  const editTransactionModalCancel = useDisclosure();
  const deleteTransactionModal = useDisclosure();

  const queryClient = useQueryClient();

  const { transactionTitleBgColor, textColor } = useCentralTheme();

  const { toast } = createStandaloneToast();
  const [parent] = useAutoAnimate();

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
      }).catch((err) =>
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        })
      ),
    {
      onSuccess: () => {
        editTransactionModalSuccess.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['incomes']);
        queryClient.invalidateQueries(['incomesPagination']);
        queryClient.invalidateQueries(['totalBalance']);

        toast({
          title: i18next.t('modal.editExpense.editedMessage.success'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
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
        queryClient.invalidateQueries(['expensesP']);
        queryClient.invalidateQueries(['totalBalance']);

        toast({
          title: i18next.t('modal.editExpense.editedMessage.success'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
      }
    }
  );

  const deletingIncome = useMutation(
    () => deleteIncome(chosenTransactionData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['incomes']);
        queryClient.invalidateQueries(['incomesPagination']);
        queryClient.invalidateQueries(['totalBalance']);

        toast({
          title: i18next.t('delete.transaction.successful.message'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
      }
    }
  );

  const deletingExpense = useMutation(
    () => deleteExpense(chosenTransactionData.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['expenses']);
        queryClient.invalidateQueries(['expensesP']);
        queryClient.invalidateQueries(['totalBalance']);

        toast({
          title: i18next.t('delete.transaction.successful.message'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
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
        boxShadow="md"
        bg={transactionTitleBgColor}
        borderRadius={8}
      >
        <Flex
          justifyContent="space-between"
          mr={6}
          w="100%"
          alignItems="baseline"
        >
          {isShortView ? (
            <>
              <Heading
                as="h2"
                size="sm"
                mr="10px"
                minW="85px"
                w="15%"
                textAlign="center"
              >
                {i18next.t('transaction.title.date')}
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
            </>
          ) : (
            <>
              <Heading
                as="h2"
                size="sm"
                mr="10px"
                minW="85px"
                w="15%"
                textAlign="center"
                onClick={() => onSetSortDate()}
              >
                <IconButton icon={<ArrowUpDownIcon />} variant="unstyled" />
                {i18next.t('transaction.title.date')}
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
            </>
          )}

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
      {editingIncome.isLoading || editingExpense.isLoading ? (
        <Preloader />
      ) : (
        <VStack
          spacing={5}
          w="100%"
          maxH={maxH}
          overflowY="scroll"
          ref={parent}
        >
          {list.map((transaction) => (
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
            <Flex justify="center" w="100%" fontSize="xl">
              <Button onClick={onShowMore}>
                {i18next.t('add.moreTransactions.pagination')}
              </Button>
            </Flex>
          ) : null}
        </VStack>
      )}

      {!!Object.keys(chosenTransactionData).length && (
        <EditIncomeModal
          isOpen={editIncomeModal.isOpen}
          onClose={editTransactionModalCancel.onOpen}
          onCloseWithNoChangeData={editIncomeModal.onClose}
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
          onCloseWithNoChangeData={editExpenseModal.onClose}
          onSubmit={editOnSubmit}
          walletsData={walletsData}
          categoriesData={categoriesData}
          payersData={payersData}
          expenseData={chosenTransactionData}
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
