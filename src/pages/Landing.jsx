import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Button,
  createStandaloneToast,
  Flex,
  Text,
  useDisclosure} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
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
  const { toast } = createStandaloneToast();
  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const {
    data: { data: { data: dataIncomes } } = { data: { incomes: [] } },
    isFetched: isFetchedIncomes
  } = useQuery(['incomes'], getIncomes);

  const {
    data: { data: { data: dataExpenses } } = { data: { expenses: [] } },
    isFetched: isFetchedExpenses
  } = useQuery(['expenses'], getExpenses);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

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
    )
      .sort(
        (a, b) => new Date(b.dateOfTransaction) - new Date(a.dateOfTransaction)
      )
      .slice(0, 10);
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
        toast({
          title: i18next.t('modal.addExpense.createdMessage'),
          status: 'success'
        });
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
        toast({
          title: i18next.t('modal.addIncome.createdMessage'),
          status: 'success'
        });
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
      {(!!dataUser && !!dataWallets && isFetchedUser && isFetchedWallets && (
        <Flex flexDir="column" alignItems="center" w="100%" p={4}>
          <Flex my={8} direction="row" justify="center" align="center">
            <Button mr={8} onClick={expenseModal.onOpen}>
              {i18next.t('button.addExpense')}
            </Button>

            <Button onClick={incomeModal.onOpen}>
              {i18next.t('button.addIncome')}
            </Button>
          </Flex>

          <WalletsList userData={dataUser} walletsData={dataWallets} />

          <Text my={8} color={textColor} fontSize="xl">
            {i18next.t('transaction.recentTransactions')}
          </Text>

          {(!!dataCategories &&
          !!dataPayers &&
          isFetchedCategories &&
          isFetchedPayers &&
          !recentTransactions.length ? (
            <Text color={textColor} fontSize="xl">
              {i18next.t('transaction.noData')}
            </Text>
          ) : mutationCreateExpense.isLoading ||
            mutationCreateIncome.isLoading ? (
            <Preloader />
          ) : (
            <TransactionList
              list={recentTransactions}
              maxH="380px"
              isShortView
              walletsData={dataWallets}
              categoriesData={dataCategories}
              payersData={dataPayers}
            />
          )) || <Preloader />}
        </Flex>
      )) || <Preloader />}

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
