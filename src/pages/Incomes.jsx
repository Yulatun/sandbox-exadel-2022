import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Box, Flex, useDisclosure, VStack } from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteIncome, getIncomes } from '@/api/Transaction';
import { DeleteConfirmationModal, IncomeItem, Preloader } from '@/components';
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
          {!isFetchedIncomes ? <Preloader /> : null}
          {!!dataIncomes &&
            !!dataIncomes.data &&
            isFetchedIncomes &&
            dataIncomes.data.map((incomeData) => (
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
