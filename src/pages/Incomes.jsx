import { useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getIncomes } from '@/api/Transaction';
import { getWallets } from '@/api/Wallet';
import { Preloader, TransactionList } from '@/components';
import { getTransactionsList } from '@/helpers/helpers';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const {
    data: { data: { incomes: dataIncomes } } = { data: { incomes: [] } },
    isFetched: isFetchedIncomes
  } = useQuery(['incomes'], getIncomes);

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

  const { textColor } = useCentralTheme();

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
          maxH="570px"
          walletsData={dataWallets}
          categoriesData={dataCategories}
        />
      )}

      {!isFetchedIncomes && <Preloader />}
    </Flex>
  );
};
