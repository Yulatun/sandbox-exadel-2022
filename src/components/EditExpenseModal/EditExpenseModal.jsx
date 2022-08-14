import { useForm } from 'react-hook-form';
import { useQueryClient } from 'react-query';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
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
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

import {
  getCategoriesOptions,
  getChosenCategoryData,
  getChosenPayerData,
  getChosenSubcategoryData,
  getChosenWalletData,
  getPayersOptions,
  getSubcategoriesOptions,
  getWalletCurrencyData,
  getWalletsOptions
} from '@/helpers/selectHelpers';

import { AddCategoryModal } from '../AddCategoryModal';
import { AddPayerModal } from '../AddPayerModal';
import { SelectControlled } from '../SelectControlled';

export const EditExpenseModal = ({
  isOpen,
  onClose,
  onSubmit,
  walletsData,
  categoriesData,
  payersData,
  expenseData
}) => {
  const categoryModal = useDisclosure();
  const payerModal = useDisclosure();

  const queryClient = useQueryClient();

  const {
    control,
    register,
    handleSubmit,
    setValue,
    watch,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: getChosenWalletData(expenseData, walletsData),
      amount: expenseData.value,
      category: getChosenCategoryData(expenseData, categoriesData),
      subcategory: getChosenSubcategoryData(expenseData, categoriesData),
      payer: getChosenPayerData(expenseData, payersData),
      date: format(new Date(expenseData.dateOfTransaction), 'yyyy-MM-dd'),
      note: expenseData.description
    }
  });

  const setNewPayer = (newPayer) => {
    queryClient.invalidateQueries(['payers']).then(() => {
      setValue('payer', { value: newPayer.name, label: newPayer.name });
    });
    payerModal.onClose();
  };

  return (
    <>
      <Modal
        size="2xl"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{i18next.t('modal.editExpense.title')}</ModalHeader>
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
              <FormLabel>{i18next.t('modal.editExpense.amount')}</FormLabel>
              <InputGroup>
                <NumberInput w="100%" precision={2}>
                  <NumberInputField
                    {...register('amount', {
                      required: i18next.t(
                        'modal.editExpense.validationErrorMessage.amount'
                      )
                    })}
                  />
                </NumberInput>
                <InputRightAddon>
                  {!!watch('wallet') &&
                    getWalletCurrencyData(watch('wallet'), walletsData)?.symbol}
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
              listOfOptions={getCategoriesOptions(categoriesData, 'Expense')}
              isRequiredData
              data={categoriesData}
              modalOnOpen={categoryModal.onOpen}
            />

            <SelectControlled
              nameOfSelect="subcategory"
              control={control}
              listOfOptions={
                !!watch('category') &&
                getSubcategoriesOptions(categoriesData, watch('category'))
              }
              data={categoriesData}
            />

            <SelectControlled
              nameOfSelect="payer"
              control={control}
              listOfOptions={getPayersOptions(payersData)}
              data={payersData}
              modalOnOpen={payerModal.onOpen}
            />

            <FormControl mb="20px" isRequired>
              <FormLabel>{i18next.t('modal.editExpense.date')}</FormLabel>
              <Input type="date" {...register('date')} />
              <FormHelperText>
                {i18next.t('modal.editExpense.date.helperText')}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>{i18next.t('modal.editExpense.note')}</FormLabel>
              <Textarea rows={4} {...register('note')} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr="20px" onClick={handleSubmit(onSubmit)}>
              {i18next.t('button.submit')}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              {i18next.t('button.cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>

      <AddCategoryModal
        isOpen={categoryModal.isOpen}
        onClose={categoryModal.onClose}
        categoryType={'Expense'}
      />
      <AddPayerModal
        isOpen={payerModal.isOpen}
        onClose={payerModal.onClose}
        setNewPayer={setNewPayer}
      />
    </>
  );
};
