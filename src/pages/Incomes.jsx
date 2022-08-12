import { useQuery } from 'react-query';
import { Flex, Text } from '@chakra-ui/react';
import i18next from 'i18next';

import { getIncomes } from '@/api/Transaction';
import { getWallets } from '@/api/Wallet';
import { Preloader, TransactionList } from '@/components';
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

  const { textColor } = useCentralTheme();

  let allTransactions = [];

  if (!!dataWallets && !!dataIncomes && isFetchedIncomes && isFetchedWallets) {
    allTransactions = [...dataIncomes].map((transaction) => {
      const wallet = dataWallets.find(
        (wallet) => wallet.id === transaction.walletId
      );

      return { ...transaction, currency: wallet.currency };
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
