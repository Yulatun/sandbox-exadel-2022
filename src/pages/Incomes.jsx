import { useState } from 'react';
import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query';
import { Box, Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { createIncome, getIncomes } from '@/api/Transaction';
import { getUser } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import { AddIncomeModal, FiltersIncomes, TransactionList } from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const [sort, setSort] = useState('IsSortByDate');
  const [isSortDescending, setIsSortDescending] = useState(true);
  const [filters, setFilters] = useState({
    dateFilter: {},
    categoryFilter: [],
    walletFilter: []
  });
  const incomeModal = useDisclosure();
  const queryClient = useQueryClient();
  const createIncomeModal = useDisclosure();

  const {
    data: incomesPages = { pages: [] },
    isFetched: isFetchedIncomes,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(
    ['incomesPagination', sort, isSortDescending, filters],
    ({ pageParam }) =>
      getIncomes({
        pageParam: pageParam,
        IsSortByDate: sort === 'IsSortByDate',
        IsSortDescending: isSortDescending,
        DateFrom:
          'start' in filters.dateFilter
            ? `${format(filters.dateFilter.start, 'yyyy-MM-dd')}T00:00:00.000Z`
            : '',
        DateTo:
          'end' in filters.dateFilter
            ? `${format(filters.dateFilter.end, 'yyyy-MM-dd')}T23:59:59.999Z`
            : '',
        CategoriesFilter: filters.categoryFilter.map(
          (category) => category.value
        ),
        WalletsFilter: filters.walletFilter.map((wallet) => wallet.value)
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

  const dataIncomes = incomesPages.pages.reduce(
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

  const { data: { data: dataUser } = { data: [] }, isFetched: isFetchedUser } =
    useQuery(['user'], getUser);

  const { textColor } = useCentralTheme();
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
        queryClient.invalidateQueries(['incomesPagination']);
      }
    }
  );
  const createExpenseOnSubmit = (data) => {
    mutationCreateIncome.mutate(data);
    incomeModal.onClose();
  };

  let allTransactions = [];

  if (!!dataWallets && !!dataIncomes && isFetchedIncomes && isFetchedWallets) {
    allTransactions = getTransactionsList(dataWallets, dataIncomes);
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
        <FiltersIncomes
          dataWallets={dataWallets}
          dataCategories={dataCategories}
          onChange={setFilters}
        />
      </Box>
      <Flex justify="flex-end" w="100%">
        <Button
          w="50%"
          mb={5}
          isDisabled={dataWallets.length ? false : true}
          onClick={incomeModal.onOpen}
        >
          {i18next.t('button.addIncome')}
        </Button>
      </Flex>

      {!!dataWallets &&
      !!dataCategories &&
      isFetchedIncomes &&
      isFetchedWallets &&
      isFetchedCategories &&
      !allTransactions.length ? (
        <Text color={textColor} fontSize="xl">
          {i18next.t('transaction.noData')}
        </Text>
      ) : (
        <TransactionList
          maxH="320px"
          isIncomesType
          list={allTransactions}
          walletsData={dataWallets}
          categoriesData={dataCategories}
          onShowMore={fetchNextPage}
          hasNextPage={hasNextPage}
          onSetSortByAmount={onSetSortByAmount}
          onSetSortDate={onSetSortDate}
        />
      )}

      {!!dataUser && !!dataWallets && isFetchedUser && isFetchedWallets && (
        <AddIncomeModal
          isOpen={incomeModal.isOpen}
          onSubmit={createExpenseOnSubmit}
          onClose={incomeModal.onClose}
          userData={dataUser}
          walletsData={dataWallets}
        />
      )}
    </Flex>
  );
};
