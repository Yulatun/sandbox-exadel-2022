import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteIncome, getIncomes } from '@/api/Transaction';
import { getWallets } from '@/api/Wallet';
import { ConfirmationModal, IncomeItem, Preloader } from '@/components';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const [chosenIncomeId, setChosenIncomeId] = useState();
  const { bgColor } = useCentralTheme();

  const deleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const { data: dataIncomes, isFetched: isFetchedIncomes } = useQuery(
    ['incomes'],
    getIncomes
  );

  const mutationTransaction = useMutation(() => deleteIncome(chosenIncomeId), {
    onSuccess: () => {
      queryClient.invalidateQueries(['incomes']);
    }
  });

  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );

  const onDelete = () => {
    mutationTransaction.mutate();
    deleteModal.onClose();
  };
  const onEdit = () => {
    // code to edit
  };

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
    <Box bg={bgColor} w="100%" mt={6}>
      <Flex bg={bgColor} direction="column" justify="center" align="center">
        <VStack w="80%" pt={5} spacing={5} align="stretch" justify="center">
          {!isFetchedIncomes ? <Preloader /> : null}
          {allTransactions.map((incomeData) => (
            <IncomeItem
              key={incomeData.id}
              incomeData={incomeData}
              onEdit={onEdit}
              onDelete={() => {
                setChosenIncomeId(incomeData.id);
                deleteModal.onOpen();
              }}
            />
          ))}
        </VStack>
        <ConfirmationModal
          isOpen={deleteModal.isOpen}
          onSubmit={onDelete}
          onClose={deleteModal.onClose}
          title={i18next.t('modal.deleteIncome.title')}
          text={i18next.t('modal.deleteIncome.text')}
        />
      </Flex>
    </Box>
  );
};
