import { useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query';
import {
  Box,
  Button,
  Flex,
  HStack,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { createExpense, getExpenses } from '@/api/Transaction';
import { getPayers, getUser } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import {
  AddExpenseModal,
  FiltersExpenses,
  Preloader,
  TransactionList
} from '@/components';
import { FiltersTag } from '@/components/FiltersTag';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Expenses = () => {
  const [sort, setSort] = useState('IsSortByDate');
  const [isSortDescending, setIsSortDescending] = useState(true);
  const expenseModal = useDisclosure();
  const queryClient = useQueryClient();
  const createExpenseModal = useDisclosure();

  const {
    data: expensesPage = { pages: [] },
    isFetched: isFetchedExpenses,
    isLoading,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ['expensesP', sort, isSortDescending],
    ({ pageParam }) =>
      getExpenses({
        pageParam: pageParam,
        IsSortByDate: sort === 'IsSortByDate',
        IsSortDescending: isSortDescending
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.pageInfo.pageNumber !==
          lastPage.data.pageInfo.totalPages
          ? lastPage.data.pageInfo.pageNumber + 1
          : undefined;
      }
    }
  );

  const onSetSortByAmount = () => {
    if (sort === 'IsSortByAmount') {
      setIsSortDescending(!isSortDescending);
    } else {
      setSort('IsSortByAmount');
      setIsSortDescending(true);
    }
  };

  const onSetSortDate = () => {
    if (sort === 'IsSortByDate') {
      setIsSortDescending(!isSortDescending);
    } else {
      setSort('IsSortByDate');
      setIsSortDescending(true);
    }
  };

  const dataExpenses = expensesPage.pages.reduce(
    (result, page) => [...result, ...page.data.data],
    []
  );

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

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const { textColor } = useCentralTheme();
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
        queryClient.invalidateQueries(['expensesP']);
      }
    }
  );
  const createExpenseOnSubmit = (data) => {
    mutationCreateExpense.mutate(data);
    expenseModal.onClose();
  };

  let allTransactions = [];

  if (
    !!dataExpenses &&
    !!dataWallets &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    allTransactions = getTransactionsList(dataWallets, dataExpenses);
  }

  if (isLoading) {
    return <Preloader />;
  }
  return (
    <Flex
      flexDir="column"
      alignItems="center"
      justifyContent="flex-start"
      py={8}
      px={4}
      w="100%"
    >
      <Box mb="50px" w="100%">
        <FiltersExpenses />
      </Box>
      <HStack spacing={4} mb="50px" w="100%">
        {['Food', 'Beauty', 'Utilities'].map((name) => (
          <FiltersTag key={name} text={name} />
        ))}
      </HStack>
      <Flex justify="flex-end" w="100%">
        <Button w="50%" mb={5} onClick={expenseModal.onOpen}>
          {i18next.t('button.addExpense')}
        </Button>
      </Flex>

      {!!dataWallets &&
      !!dataCategories &&
      !!dataPayers &&
      isFetchedExpenses &&
      isFetchedWallets &&
      isFetchedCategories &&
      isFetchedPayers &&
      !allTransactions.length ? (
        <Text color={textColor} fontSize="xl">
          {i18next.t('transaction.noData')}
        </Text>
      ) : (
        <TransactionList
          list={allTransactions}
          maxH="570px"
          isExpensesType
          walletsData={dataWallets}
          categoriesData={dataCategories}
          payersData={dataPayers}
          onShowMore={fetchNextPage}
          hasNextPage={hasNextPage}
          onSetSortByAmount={onSetSortByAmount}
          onSetSortDate={onSetSortDate}
        />
      )}
      {!isFetchedExpenses && <Preloader />}
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
    </Flex>
  );
};
