import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import {
  createExpense,
  createIncome,
  getExpenses,
  getIncomes
} from '@/api/Transaction';
import { getPayers, getUser } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import {
  AddExpenseModal,
  AddIncomeModal,
  NotificationModal,
  Preloader,
  TransactionList,
  WalletsList
} from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Landing = () => {
  const expenseModal = useDisclosure();
  const incomeModal = useDisclosure();
  const createExpenseModal = useDisclosure();
  const createIncomeModal = useDisclosure();
  const queryClient = useQueryClient();

  const { textColor } = useCentralTheme();

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const {
    data: { data: { incomes: dataIncomes } } = { data: { incomes: [] } },
    isFetched: isFetchedIncomes
  } = useQuery(['incomes'], getIncomes);

  const {
    data: { data: { expenses: dataExpenses } } = { data: { expenses: [] } },
    isFetched: isFetchedExpenses
  } = useQuery(['expenses'], getExpenses);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  const {
    data: { data: dataPayers } = { data: [] },
    isFetched: isFetchedPayers
  } = useQuery(['payers'], getPayers);

  let recentTransactions = [];

  if (
    !!dataIncomes &&
    !!dataExpenses &&
    !!dataWallets &&
    isFetchedIncomes &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    recentTransactions = getTransactionsList(
      dataWallets,
      dataIncomes,
      dataExpenses
    ).slice(0, 10);
  }

  const mutationCreateExpense = useMutation(
    (data) =>
      createExpense({
        walletId: data.wallet?.value,
        categoryId: data.category?.value,
        subCategoryId:
          data.subcategory?.value || '00000000-0000-0000-0000-000000000000',
        payer: data.payer?.value,
        dateOfTransaction: new Date(
          `${data.date}T${new Date().toISOString().split('T')[1]}`
        ),
        value: Number(data.amount),
        description: data.note
      }),
    {
      onSuccess: () => {
        createExpenseModal.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['expenses']);
      }
    }
  );

  const mutationCreateIncome = useMutation(
    (data) =>
      createIncome({
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
        createIncomeModal.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['incomes']);
      }
    }
  );

  const createExpenseOnSubmit = (data) => {
    mutationCreateExpense.mutate(data);
    expenseModal.onClose();
  };

  const createIncomeOnSubmit = (data) => {
    mutationCreateIncome.mutate(data);
    incomeModal.onClose();
  };

  return (
    <>
      <Flex flexDir="column" alignItems="center" w="100%" p={4}>
        <Flex my={8} direction="row" justify="center" align="center">
          <Button mr={8} onClick={expenseModal.onOpen}>
            {i18next.t('button.addExpense')}
          </Button>

          <Button onClick={incomeModal.onOpen}>
            {i18next.t('button.addIncome')}
          </Button>
        </Flex>

        <WalletsList
          walletsData={dataWallets}
          isFetchedWallets={isFetchedWallets}
        />

        <Text my={8} color={textColor} fontSize="xl">
          {i18next.t('transaction.recentTransactions')}
        </Text>

        {isFetchedIncomes && isFetchedExpenses && !recentTransactions.length ? (
          <Text color={textColor} fontSize="xl">
            {i18next.t('transaction.noData')}
          </Text>
        ) : (
          <TransactionList list={recentTransactions} maxH="380px" isShortView />
        )}

        {(!isFetchedIncomes || !isFetchedExpenses) && <Preloader />}
      </Flex>

      {!expenseModal.isOpen && (
        <NotificationModal
          isOpen={createExpenseModal.isOpen}
          onSubmit={createExpenseModal.onClose}
          onClose={createExpenseModal.onClose}
          text={i18next.t('modal.addExpense.createdMessage')}
        />
      )}
      {!incomeModal.isOpen && (
        <NotificationModal
          isOpen={createIncomeModal.isOpen}
          onSubmit={createIncomeModal.onClose}
          onClose={createIncomeModal.onClose}
          text={i18next.t('modal.addIncome.createdMessage')}
        />
      )}
      {!!dataUser &&
        !!dataWallets &&
        !!dataPayers &&
        isFetchedUser &&
        isFetchedWallets &&
        isFetchedPayers && (
          <AddExpenseModal
            isOpen={expenseModal.isOpen}
            onSubmit={createExpenseOnSubmit}
            onClose={expenseModal.onClose}
            userData={dataUser}
            walletsData={dataWallets}
            payersData={dataPayers}
          />
        )}
      {!!dataUser && !!dataWallets && isFetchedUser && isFetchedWallets && (
        <AddIncomeModal
          isOpen={incomeModal.isOpen}
          onSubmit={createIncomeOnSubmit}
          onClose={incomeModal.onClose}
          userData={dataUser}
          walletsData={dataWallets}
        />
      )}
    </>
  );
};
