import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputRightAddon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { AddPayerModal } from '@/components';
import {
  getCategoriesOptions,
  getDefaultPayerData,
  getDefaultWalletData,
  getPayersOptions,
  getSubcategoriesOptions,
  getWalletsOptions
} from '@/helpers/selectHelpers';

import { AddCategoryModal } from '../AddCategoryModal';
import { SelectControlled } from '../SelectControlled';

export const AddExpenseModal = ({
  isOpen,
  onClose,
  onSubmit,
  userData,
  walletsData,
  payersData
}) => {
  const categoryModal = useDisclosure();
  const payerModal = useDisclosure();

  const queryClient = useQueryClient();

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

  const {
    control,
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: getDefaultWalletData(userData, walletsData),
      payer: getDefaultPayerData(userData, payersData),
      date: new Date().toISOString().split('T')[0]
    }
  });

  const resetForm = () => {
    reset({
      wallet: getDefaultWalletData(userData, walletsData),
      payer: getDefaultPayerData(userData, payersData),
      date: new Date().toISOString().split('T')[0]
    });
  };

  useEffect(() => resetForm(), [!isOpen]);

  const setNewPayer = (newPayer) => {
    queryClient.invalidateQueries(['payers']).then(() => {
      setValue('payer', { value: newPayer.name, label: newPayer.name });
    });
    payerModal.onClose();
  };

  return (
    <>
      {!!dataCategories && isFetchedCategories && (
        <Modal
          size="2xl"
          closeOnOverlayClick={false}
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{i18next.t('modal.addExpense.title')}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <SelectControlled
                nameOfSelect="wallet"
                control={control}
                listOfOptions={getWalletsOptions(walletsData)}
                isRequiredData
                data={walletsData}
              />

              <FormControl mb="20px" isRequired isInvalid={amount}>
                <FormLabel>{i18next.t('modal.addExpense.amount')}</FormLabel>
                <InputGroup>
                  <NumberInput w="100%" precision={2}>
                    <NumberInputField
                      {...register('amount', {
                        required: i18next.t(
                          'modal.addExpense.validationErrorMessage.amount'
                        )
                      })}
                    />
                  </NumberInput>
                  <InputRightAddon>
                    {i18next.t('modal.addExpense.amount.dollarSign')}
                  </InputRightAddon>
                </InputGroup>
                <FormErrorMessage>
                  <Text>{amount && amount.message}</Text>
                </FormErrorMessage>
              </FormControl>

              <SelectControlled
                nameOfSelect="category"
                control={control}
                errorData={category}
                listOfOptions={getCategoriesOptions(dataCategories, 'Expense')}
                isRequiredData
                data={dataCategories}
                modalOnOpen={categoryModal.onOpen}
              />

              <SelectControlled
                nameOfSelect="subcategory"
                control={control}
                listOfOptions={
                  !!watch('category') &&
                  getSubcategoriesOptions(dataCategories, watch('category'))
                }
                isDisabled={!watch('category') && true}
                data={dataCategories}
              />

              <SelectControlled
                nameOfSelect="payer"
                control={control}
                listOfOptions={getPayersOptions(payersData)}
                data={payersData}
                modalOnOpen={payerModal.onOpen}
              />

              <FormControl mb="20px" isRequired>
                <FormLabel>{i18next.t('modal.addExpense.date')}</FormLabel>
                <Input type="date" {...register('date')} />
              </FormControl>

              <FormControl>
                <FormLabel>{i18next.t('modal.addExpense.note')}</FormLabel>
                <Textarea rows={4} {...register('note')} />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Stack direction="row" spacing={5}>
                <Button type="submit" onClick={handleSubmit(onSubmit)}>
                  {i18next.t('modal.addExpense.button.add')}
                </Button>
                <Button variant="secondary" mr="20px" onClick={onClose} invert>
                  {i18next.t('modal.addExpense.button.cancel')}
                </Button>
              </Stack>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      {categoryModal.isOpen && (
        <AddCategoryModal
          isOpen={categoryModal.isOpen}
          onClose={categoryModal.onClose}
          categoryType={'Expense'}
        />
      )}
      {payerModal.isOpen && (
        <AddPayerModal isOpen={payerModal.isOpen} onClose={setNewPayer} />
      )}
    </>
  );
};
