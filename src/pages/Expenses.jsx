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
  createStandaloneToast,
  Flex,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
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
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Expenses = () => {
  const [sort, setSort] = useState('IsSortByDate');
  const [filters, setFilters] = useState({
    dateFilter: {},
    categoryFilter: [],
    walletFilter: [],
    payerFilter: []
  });

  const [isSortDescending, setIsSortDescending] = useState(true);
  const expenseModal = useDisclosure();
  const queryClient = useQueryClient();
  const createExpenseModal = useDisclosure();

  const { toast } = createStandaloneToast();

  const {
    data: expensesPage = { pages: [] },
    isFetched: isFetchedExpenses,
    fetchNextPage,
    isLoading,
    hasNextPage
  } = useInfiniteQuery(
    ['expensesP', sort, isSortDescending, filters],
    ({ pageParam }) =>
      getExpenses({
        pageParam: pageParam,
        IsSortByDate: sort === 'IsSortByDate',
        IsSortByAmount: sort === 'IsSortByAmount',
        IsSortDescending: isSortDescending,
        DateFrom: filters.dateFilter.start
          ? `${format(filters.dateFilter.start, 'yyyy-MM-dd')}T00:00:00.000Z`
          : '',
        DateTo: filters.dateFilter.end
          ? `${format(filters.dateFilter.end, 'yyyy-MM-dd')}T23:59:59.999Z`
          : '',
        CategoriesFilter: filters.categoryFilter.map(
          (category) => category.value
        ),
        WalletsFilter: filters.walletFilter.map((wallet) => wallet.value),
        PayersFilter: filters.payerFilter.map((payer) => payer.value)
      }),
    {
      getNextPageParam: (lastPage) => {
        return lastPage.data.pageInfo?.pageNumber !==
          lastPage.data.pageInfo?.totalPages
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
        createExpenseModal.onOpen();
        queryClient.invalidateQueries(['wallets']);
        queryClient.invalidateQueries(['expensesP']);

        toast({
          title: i18next.t('modal.addExpense.createdMessage'),
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
      <Box mb="42px" w="100%">
        <FiltersExpenses
          dataWallets={dataWallets}
          dataCategories={dataCategories}
          dataPayers={dataPayers}
          onChange={setFilters}
        />
      </Box>
      <Flex justify="flex-end" w="100%">
        <Button
          w="50%"
          mb={5}
          isDisabled={dataWallets.length ? false : true}
          onClick={expenseModal.onOpen}
        >
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
          maxH="580px"
          isExpensesType
          walletsData={dataWallets}
          categoriesData={dataCategories}
          payersData={dataPayers}
          onShowMore={fetchNextPage}
          hasNextPage={hasNextPage}
          onSetSortByAmount={onSetSortByAmount}
          onSetSortDate={onSetSortDate}
          filters={filters}
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
    </Flex>
  );
};
