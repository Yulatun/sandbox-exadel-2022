import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { DeleteIcon } from '@chakra-ui/icons';
import { Box, Flex, IconButton, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import {
  deleteExpense,
  deleteIncome,
  getExpenses,
  getIncomes
} from '@/api/Transaction';
import { getUser } from '@/api/User';
import { deleteWallet } from '@/api/Wallet';
import { getWallets } from '@/api/Wallet';
import {
  DeleteConfirmationModal,
  ExpenseItem,
  IncomeItem,
  NotificationModal,
  WalletCard
} from '@/components';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const { id: walletId } = useParams();

  const [chosenTransactionObj, setChosenTransactionObj] = useState({});

  const deleteWalletModal = useDisclosure();
  const deleteTransactionModal = useDisclosure();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { bgColor } = useCentralTheme();

  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

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

  const mutationWallet = useMutation(() => deleteWallet(walletId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['wallets']);
      navigate('/', { replace: true });
    }
  });

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

  const openWalletOnDelete = () => {
    deleteWalletModal.onOpen();
  };

  const openTransactionOnDelete = (dataTransaction) => {
    setChosenTransactionObj(dataTransaction);
    deleteTransactionModal.onOpen();
  };

  const deleteWalletOnSubmit = () => {
    mutationWallet.mutate();
    deleteWalletModal.onClose();
  };

  const deleteTransactionOnSubmit = () => {
    if (chosenTransactionObj.transactionType === 'Income') {
      mutationIncome.mutate();
      deleteTransactionModal.onClose();
      return;
    }

    mutationExpense.mutate();
    deleteTransactionModal.onClose();
  };

  const onEdit = () => {
    // code to edit
  };

  return (
    <Box bg={bgColor} px={24} py={6} mt={6}>
      <IconButton
        onClick={openWalletOnDelete}
        ml="70%"
        size="sm"
        icon={<DeleteIcon />}
      ></IconButton>
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
                    openTransactionOnDelete(dataTransaction);
                  }}
                />
              ) : (
                <ExpenseItem
                  key={dataTransaction.id}
                  expenseData={dataTransaction}
                  onEdit={onEdit}
                  onDelete={() => {
                    openTransactionOnDelete(dataTransaction);
                  }}
                />
              );
            })}
      </VStack>
      {!!dataUser &&
      !!dataUser.data &&
      isFetchedUser &&
      dataUser.data.defaultWallet === walletId ? (
        <NotificationModal
          isOpen={deleteWalletModal.isOpen}
          onSubmit={deleteWalletOnSubmit}
          onClose={deleteWalletModal.onClose}
          text={i18next.t('modal.deleteWalletDefault.text')}
        />
      ) : (
        <DeleteConfirmationModal
          isOpen={deleteWalletModal.isOpen}
          onSubmit={deleteWalletOnSubmit}
          onClose={deleteWalletModal.onClose}
          title={i18next.t('modal.deleteWallet.title')}
          text={i18next.t('modal.deleteWallet.text')}
        />
      )}

      <DeleteConfirmationModal
        isOpen={deleteTransactionModal.isOpen}
        onSubmit={deleteTransactionOnSubmit}
        onClose={deleteTransactionModal.onClose}
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
