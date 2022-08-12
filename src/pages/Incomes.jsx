import { useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { getIncomes } from '@/api/Transaction';
import { getWallets } from '@/api/Wallet';
import { Preloader, TransactionList } from '@/components';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const { data: dataIncomes, isFetched: isFetchedIncomes } = useQuery(
    ['incomes'],
    getIncomes
  );

  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );

  const { textColor } = useCentralTheme();

  let allTransactions = [];

  if (
    !!dataIncomes &&
    !!dataWallets &&
    !!dataIncomes.data &&
    !!dataWallets.data &&
    !!dataIncomes.data.incomes &&
    isFetchedIncomes &&
    isFetchedWallets
  ) {
    allTransactions = [...dataIncomes.data.incomes];

    allTransactions.forEach((transaction) => {
      let wallet = dataWallets.data.find(
        (wallet) => wallet.id === transaction.walletId
      );

      transaction.currency = wallet.currency;
    });
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
        <TransactionList list={allTransactions} maxH="570px" />
      )}

      {!isFetchedIncomes ? <Preloader /> : null}
    </Flex>
  );
};
