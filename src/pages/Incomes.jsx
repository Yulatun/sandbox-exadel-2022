import { useInfiniteQuery, useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { getIncomes } from '@/api/Transaction';
import { getWallets } from '@/api/Wallet';
import { Preloader, TransactionList } from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const {
    data: incomesPages = { pages: [] },
    isLoading,
    isFetched: isFetchedIncomes,
    fetchNextPage,
    hasNextPage
  } = useInfiniteQuery(['incomes'], getIncomes, {
    getNextPageParam: (lastPage) => {
      return lastPage.data.pageInfo.pageNumber !==
        lastPage.data.pageInfo.totalPages
        ? lastPage.data.pageInfo.pageNumber + 1
        : undefined;
    }
  });
  console.log(incomesPages);

  const dataIncomes = incomesPages.pages.reduce(
    (result, page) => [...result, ...page.data.incomes],
    []
  );

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  const { textColor } = useCentralTheme();

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
      {isFetchedIncomes && !allTransactions.length ? (
        <Text color={textColor} fontSize="xl">
          {i18next.t('transaction.noData')}
        </Text>
      ) : (
        <TransactionList
          list={allTransactions}
          onShowMore={fetchNextPage}
          hasNextPage={hasNextPage}
          maxH="570px"
        />
      )}
    </Flex>
  );
};
