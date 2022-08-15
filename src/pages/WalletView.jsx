import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
  Box,
  createStandaloneToast,
  Flex,
  IconButton,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import {
  deleteExpense,
  deleteIncome,
  getExpenses,
  getIncomes
} from '@/api/Transaction';
import { getUser } from '@/api/User';
import { deleteWallet, editWallet, getWallets } from '@/api/Wallet';
import {
  ConfirmationModal,
  EditWalletModal,
  ExpenseItem,
  IncomeItem,
  NotificationModal,
  WalletCard
} from '@/components';
import { i18n } from '@/i18n';
import { useCentralTheme } from '@/theme';

export const WalletView = () => {
  const { id: walletId } = useParams();

  const [chosenWallet, setChosenWallet] = useState({});
  const [chosenTransactionObj, setChosenTransactionObj] = useState({});

  const editWalletModal = useDisclosure();
  const deleteWalletModal = useDisclosure();
  const deleteTransactionModal = useDisclosure();

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { toast } = createStandaloneToast();
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

  const editMutationWallet = useMutation(
    (data) =>
      editWallet(data.setDefault, {
        ...chosenWallet,
        name: data.name,
        currencyId: data.currencyId,
        dateOfChange: new Date().toJSON()
      }).catch((error) => toast({ title: error.message, status: 'error' })),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['wallets']);
      }
    }
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

  const openWalletOnEdit = (dataWallet) => {
    setChosenWallet(dataWallet);
    editWalletModal.onOpen();
  };

  const openWalletOnDelete = () => {
    deleteWalletModal.onOpen();
  };

  const openTransactionOnDelete = (dataTransaction) => {
    setChosenTransactionObj(dataTransaction);
    deleteTransactionModal.onOpen();
  };

  const updateWalletOnEdit = (data) => {
    // if (isFetchedTransactions && chosenWallet.currency.currencyCode !== data.currency && dataTransactions.data.length) {
    //   toast({title: i18n.t("modal.editWallet.editedCurrency.cancel")})
    //   return
    // }
    if (dataUser.data.defaultWallet === walletId && !data.setDefault) {
      toast({
        title: i18n.t('modal.editWallet.editedMessage.nonDefaultWallet.cancel')
      });
      resetEditOnClose();
      return;
    }
    editMutationWallet.mutate(data);
    editWalletModal.onClose();
    toast({
      title: i18n.t('modal.editWallet.editedWallet.success'),
      status: 'success'
    });
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

  const resetEditOnClose = () => {
    setChosenWallet({});
    editWalletModal.onClose();
  };

  const onEdit = () => {
    // code to edit
  };

  const currentWallet =
    isFetchedWallets &&
    dataWallets.data.find((wallet) => wallet.id === walletId);

  return (
    <Box bg={bgColor} px={24} py={6} mt={6}>
      <Flex width="45%" justify="space-between" m="0 auto">
        <IconButton
          onClick={() => openWalletOnEdit(currentWallet)}
          size="sm"
          icon={<EditIcon />}
        ></IconButton>
        <IconButton
          onClick={openWalletOnDelete}
          size="sm"
          icon={<DeleteIcon />}
        ></IconButton>
      </Flex>
      <Flex mr="30%" ml="30%">
        {!!dataWallets && !!dataWallets.data && isFetchedWallets && (
          <WalletCard walletData={currentWallet} />
        )}
      </Flex>
      <VStack spacing={5} pt={5}>
        {!!dataIncomes &&
          !!dataExpenses &&
          !!dataIncomes.data &&
          !!dataExpenses.data &&
          isFetchedIncomes &&
          isFetchedExpenses &&
          [...dataIncomes.data.incomes, ...dataExpenses.data.expenses]
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
        <ConfirmationModal
          isOpen={deleteWalletModal.isOpen}
          onSubmit={deleteWalletOnSubmit}
          onClose={deleteWalletModal.onClose}
          title={i18next.t('modal.deleteWallet.title')}
          text={i18next.t('modal.deleteWallet.text')}
        />
      )}

      <ConfirmationModal
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

      {!!Object.keys(chosenWallet).length && (
        <EditWalletModal
          isOpen={editWalletModal.isOpen}
          onSubmit={updateWalletOnEdit}
          onClose={resetEditOnClose}
          walletData={chosenWallet}
        />
      )}
    </Box>
  );
};
