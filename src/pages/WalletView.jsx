import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import {
  deleteExpense,
  deleteIncome,
  getExpenses,
  getIncomes
} from '@/api/Transaction';
import { getWallets } from '@/api/Wallet';
import {
  ConfirmationModal,
  ExpenseItem,
  IncomeItem,
  WalletCard
} from '@/components';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const { id: walletId } = useParams();

  const [chosenTransactionObj, setChosenTransactionObj] = useState({});

  const deleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const { bgColor } = useCentralTheme();

  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );

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
        queryClient.invalidateQueries(['incomes']);
      }
    }
  );

  const mutationExpense = useMutation(
    () => deleteExpense(chosenTransactionObj.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['expenses']);
      }
    }
  );

  const openOnDelete = (dataTransaction) => {
    setChosenTransactionObj(dataTransaction);
    deleteModal.onOpen();
  };

  const deleteOnSubmit = () => {
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
        {!!dataWallets && !!dataWallets.data && isFetchedWallets && (
          <WalletCard
            walletData={dataWallets.data.find(
              (wallet) => wallet.id === walletId
            )}
          />
        )}
      </Flex>
      <VStack spacing={5} pt={5}>
        {!!dataIncomes &&
          !!dataExpenses &&
          !!dataIncomes.data &&
          !!dataExpenses.data &&
          isFetchedIncomes &&
          isFetchedExpenses &&
          [...dataIncomes.data, ...dataExpenses.data]
            .filter((data) => data.walletId === walletId)
            .sort((transactionA, transactionB) => {
              transactionA.dateOfTransaction - transactionB.dateOfTransaction;
            })
            .map((dataTransaction) => {
              return dataTransaction.transactionType === 'Income' ? (
                <IncomeItem
                  key={dataTransaction.id}
                  incomeData={dataTransaction}
                  onEdit={onEdit}
                  onDelete={() => {
                    openOnDelete(dataTransaction);
                  }}
                />
              ) : (
                <ExpenseItem
                  key={dataTransaction.id}
                  expenseData={dataTransaction}
                  onEdit={onEdit}
                  onDelete={() => {
                    openOnDelete(dataTransaction);
                  }}
                />
              );
            })}
      </VStack>
      <ConfirmationModal
        isOpen={deleteModal.isOpen}
        onSubmit={deleteOnSubmit}
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
