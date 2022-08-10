import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import {
  deleteExpense,
  deleteIncome,
  getExpenses,
  getIncomes
} from '@/api/Transaction';
import {
  DeleteConfirmationModal,
  ExpenseItem,
  IncomeItem,
  WalletCard
} from '@/components';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const [chosenTransactionObj, setChosenTransactionObj] = useState({});

  const deleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const { data: dataIncomes, isFetched: isFetchedIncomes } = useQuery(
    ['incomes'],
    getIncomes
  );

  const { data: dataExpenses, isFetched: isFetchedExpenses } = useQuery(
    ['expenses'],
    getExpenses
  );

  const mutationIncome = useMutation(
    () => deleteIncome(chosenTransactionObj.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['income']);
      }
    }
  );

  const mutationExpense = useMutation(
    () => deleteExpense(chosenTransactionObj.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expense']);
      }
    }
  );

  const { bgColor } = useCentralTheme();

  const onDelete = () => {
    if (chosenTransactionObj.transactionType === 'Income') {
      mutationIncome.mutate();
      deleteModal.onClose();
      return;
    }

    mutationExpense.mutate();
    deleteModal.onClose();
  };
  const onEdit = () => {
    // code to edit
  };

  return (
    <Box bg={bgColor} px={24} py={6} mt={6}>
      <Flex mr="30%" ml="35%">
        {/* It doesn't work with static props */}
        <WalletCard
          totalBalance={2000}
          currency="USD"
          name="nameOfWallet"
        ></WalletCard>
      </Flex>
      <VStack spacing={5} pt={5}>
        {!!dataIncomes &&
          !!dataExpenses &&
          !!dataIncomes.data &&
          !!dataExpenses.data &&
          isFetchedIncomes &&
          isFetchedExpenses &&
          [...dataIncomes.data, ...dataExpenses.data]
            .filter((data) => data.id === data.id)
            .map((dataTransaction) => {
              return dataTransaction.transactionType === 'Income' ? (
                <IncomeItem
                  key={dataTransaction.id}
                  incomeData={dataTransaction}
                  onEdit={onEdit}
                  onDelete={() => {
                    setChosenTransactionObj(dataTransaction);
                    deleteModal.onOpen();
                  }}
                />
              ) : (
                <ExpenseItem
                  key={dataTransaction.id}
                  expenseData={dataTransaction}
                  onEdit={onEdit}
                  onDelete={() => {
                    setChosenTransactionObj(dataTransaction);
                    deleteModal.onOpen();
                  }}
                />
              );
            })}
      </VStack>
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onSubmit={onDelete}
        onClose={deleteModal.onClose}
        title={
          !!chosenTransactionObj.transactionType &&
          chosenTransactionObj.transactionType === 'Income'
            ? i18next.t('modal.deleteIncome.title')
            : i18next.t('modal.deleteExpense.title')
        }
        text={
          !!chosenTransactionObj.transactionType &&
          chosenTransactionObj.transactionType === 'Income'
            ? i18next.t('modal.deleteIncome.text')
            : i18next.t('modal.deleteExpense.text')
        }
      />
    </Box>
  );
};
