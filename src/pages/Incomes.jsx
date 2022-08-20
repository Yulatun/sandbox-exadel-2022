import {
  useInfiniteQuery,
  useMutation,
  useQuery,
  useQueryClient
} from 'react-query';
import { Button, Flex, Text, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { createIncome, getIncomes } from '@/api/Transaction';
import { getUser } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import { AddIncomeModal, Preloader, TransactionList } from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const expenseModal = useDisclosure();
  const queryClient = useQueryClient();
  const createIncomeModal = useDisclosure();
  const {
    data: incomesPages = { pages: [] },
    isLoading,
    isFetched: isFetchedIncomes,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['incomesPagination'], getIncomes, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.pageInfo.pageNumber !==
        lastPage.data.pageInfo.totalPages
        ? lastPage.data.pageInfo.pageNumber + 1
        : undefined;
    }
  });

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
  const mutationCreateExpense = useMutation(
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
    mutationCreateExpense.mutate(data);
    expenseModal.onClose();
  };

  let allTransactions = [];

  if (!!dataWallets && !!dataIncomes && isFetchedIncomes && isFetchedWallets) {
    allTransactions = getTransactionsList(dataWallets, dataIncomes);
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
      <Flex justify="flex-end" w="100%">
        <Button w="50%" mb={5} onClick={expenseModal.onOpen}>
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
          list={allTransactions}
          onShowMore={fetchNextPage}
          hasNextPage={hasNextPage}
          walletsData={dataWallets}
          categoriesData={dataCategories}
          maxH="570px"
        />
      )}

      {!isFetchedIncomes && <Preloader />}
      {!!dataUser && !!dataWallets && isFetchedUser && isFetchedWallets && (
        <AddIncomeModal
          isOpen={expenseModal.isOpen}
          onSubmit={createExpenseOnSubmit}
          onClose={expenseModal.onClose}
          userData={dataUser}
          walletsData={dataWallets}
        />
      )}
    </Flex>
  );
};
