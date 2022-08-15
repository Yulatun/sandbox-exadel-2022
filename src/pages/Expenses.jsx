import { useQuery } from 'react-query';
import { Box, Flex, HStack, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getExpenses } from '@/api/Transaction';
import { getPayers } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import { FiltersExpenses, Preloader, TransactionList } from '@/components';
import { FiltersTag } from '@/components/FiltersTag';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Expenses = () => {
  const {
    data: { data: { expenses: dataExpenses } } = { data: { expenses: [] } },
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

  const { textColor } = useCentralTheme();

  let allTransactions = [];

  if (
    !!dataExpenses &&
    !!dataWallets &&
    isFetchedExpenses &&
    isFetchedWallets
  ) {
    allTransactions = getTransactionsList(dataWallets, dataExpenses);
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
        />
      )}

      {!isFetchedExpenses && <Preloader />}
    </Flex>
  );
};
