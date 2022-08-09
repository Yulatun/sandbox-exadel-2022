import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteTransaction, getTransactions } from '@/api/Transactions';
import { DeleteConfirmationModal, IncomeItem, Preloader } from '@/components';
import { useCentralTheme } from '@/theme';

export const Incomes = () => {
  const userData = {
    id: 'b5b4edac-1eab-489b-9796-d03041e708fd',
    defaultWallet: '7cfe651f-6e02-4e14-9872-6a6a308a3981'
  };

  const [chosenIncomeId, setChosenIncomeId] = useState();
  const { bgColor } = useCentralTheme();

  const deleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const { data: dataTransactions, isFetched: isFetchedTransactions } = useQuery(
    ['transactions', userData.id],
    getTransactions
  );

  const mutationTransaction = useMutation(
    () => deleteTransaction(chosenIncomeId),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['transactions']);
      }
    }
  );

  const onDelete = () => {
    mutationTransaction.mutate();
    deleteModal.onClose();
  };
  const onEdit = () => {
    // code to edit
  };

  return (
    <Box bg={bgColor} w="100%" mt={6}>
      <Flex bg={bgColor} direction="column" justify="center" align="center">
        <VStack w="80%" pt={5} spacing={5} align="stretch" justify="center">
          {!isFetchedTransactions ? <Preloader /> : null}
          {!!dataTransactions &&
            !!dataTransactions.data &&
            isFetchedTransactions &&
            dataTransactions.data
              .filter((data) => data.transactionType === 'Income')
              .map((dataTransaction) => (
                <IncomeItem
                  key={dataTransaction.id}
                  transaction={dataTransaction}
                  onEdit={onEdit}
                  onDelete={() => {
                    setChosenIncomeId(dataTransaction.id);
                    deleteModal.onOpen();
                  }}
                />
              ))}
        </VStack>
        <DeleteConfirmationModal
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
