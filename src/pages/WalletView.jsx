import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Box,
  Flex,
  useColorModeValue,
  useDisclosure,
  VStack
} from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteTransactions, getTransactions } from '@/api/Transactions';
import { DeleteConfirmationModal, ExpenseItem, WalletCard } from '@/components';

export const WalletView = () => {
  const [chosenTransactionObj, setChosenTransactionObj] = useState({});

  const deleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const { data: dataTransactions, isFetched: isFetchedTransactions } = useQuery(
    ['transactions'],
    () => getTransactions()
  );

  const mutationTransaction = useMutation(
    () => deleteTransactions(chosenTransactionObj.id),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['transactions']);
      }
    }
  );

  const bgMain = useColorModeValue('orange.100', 'teal.900');

  const onDelete = () => {
    mutationTransaction.mutate();
    deleteModal.onClose();
  };
  const onEdit = () => {
    // code to edit
  };

  return (
    <Box bg={bgMain} px={24} py={6} mt={6}>
      <Flex mr="30%" ml="35%">
        <WalletCard
          totalBalance={2000}
          currency="USD"
          name="nameOfWallet"
        ></WalletCard>
      </Flex>
      <VStack spacing={5} pt={5}>
        {isFetchedTransactions &&
          dataTransactions.data
            .filter((data) => data.id === data.id)
            .map((dataTransaction) => (
              <ExpenseItem
                key={dataTransaction.id}
                transaction={dataTransaction}
                onEdit={onEdit}
                onDelete={() => {
                  setChosenTransactionObj(dataTransaction);
                  deleteModal.onOpen();
                }}
              />
            ))}
      </VStack>
      <DeleteConfirmationModal
        isOpen={deleteModal.isOpen}
        onSubmit={onDelete}
        onClose={deleteModal.onClose}
        title={
          !!chosenTransactionObj.transactionType &&
          chosenTransactionObj.transactionType === 'Income'
            ? i18next.t('modal.deleteIncome.title')
            : i18next.t('modal.deleteExpense.title')
        }
        text={
          !!chosenTransactionObj.transactionType &&
          chosenTransactionObj.transactionType === 'Income'
            ? i18next.t('modal.deleteIncome.text')
            : i18next.t('modal.deleteExpense.text')
        }
      />
    </Box>
  );
};
