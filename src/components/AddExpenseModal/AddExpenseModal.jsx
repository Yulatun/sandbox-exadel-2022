import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery, useQueryClient } from 'react-query';
import {
  Button,
  createStandaloneToast,
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
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import {
  AddPayerModal,
  AddSubCategoryModal,
  ConfirmationModal
} from '@/components';
import {
  getCategoriesOptions,
  getDefaultPayerData,
  getDefaultWalletData,
  getPayersOptions,
  getSubcategoriesOptions,
  getWalletCurrencyData,
  getWalletsOptions
} from '@/helpers/selectHelpers';
import { useCentralTheme } from '@/theme';

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
  const { borderColor } = useCentralTheme();

  const categoryModal = useDisclosure();
  const payerModal = useDisclosure();
  const subcategoryModal = useDisclosure();

  const { toast } = createStandaloneToast();
  const queryClient = useQueryClient();
  const expenseCancelModal = useDisclosure();

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
      isDirty,
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: getDefaultWalletData(userData, walletsData),
      payer: getDefaultPayerData(payersData),
      date: new Date().toISOString().split('T')[0]
    }
  });

  const resetForm = () => {
    reset({
      wallet: getDefaultWalletData(userData, walletsData),
      payer: getDefaultPayerData(payersData),
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

  const setNewCategory = (newCategory) => {
    queryClient.invalidateQueries(['categories']).then(() => {
      setValue('category', {
        value: newCategory.name,
        label: newCategory.name
      });
    });
    categoryModal.onClose();
  };

  const setNewSubCategory = (newSubCategory) => {
    queryClient.invalidateQueries(['subcategories']).then(() => {
      setValue('subcategory', {
        value: newSubCategory.name,
        label: newSubCategory.name
      });
    });
    subcategoryModal.onClose();
  };

  const selectedCategory = dataCategories.find(
    (category) => category.id === watch('category')?.value
  );

  const openSubcategoryModal = () => {
    watch('category')
      ? subcategoryModal.onOpen()
      : toast({
          title: i18next.t('modal.addSubcategory.preventAlert'),
          duration: 3000,
          isClosable: true,
          position: 'top'
        });
  };

  const closeAllModals = () => {
    expenseCancelModal.onClose();
    onClose();
  };

  const onCancel = () => {
    isDirty ? expenseCancelModal.onOpen() : onClose();
  };

  return (
    <>
      {!!dataCategories && isFetchedCategories && (
        <Modal
          scrollBehavior="inside"
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
                        ),
                        validate: {
                          notNegative: (value) =>
                            value >= 0 ||
                            i18next.t(
                              'modal.addExpense.validationErrorMessage.notNegativeAmount'
                            )
                        }
                      })}
                    />
                  </NumberInput>
                  <InputRightAddon>
                    {!!watch('wallet') &&
                      getWalletCurrencyData(watch('wallet'), walletsData)
                        ?.symbol}
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
                modalOnOpen={openSubcategoryModal}
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
                <Textarea
                  borderColor={borderColor}
                  rows={4}
                  {...register('note')}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button mr="20px" onClick={handleSubmit(onSubmit)}>
                {i18next.t('button.submit')}
              </Button>
              <Button variant="secondary" onClick={onCancel}>
                {i18next.t('button.cancel')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}

      <AddCategoryModal
        isOpen={categoryModal.isOpen}
        onClose={categoryModal.onClose}
        categoryType={'Expense'}
        setNewCategory={setNewCategory}
      />
      <AddPayerModal
        isOpen={payerModal.isOpen}
        onClose={payerModal.onClose}
        setNewPayer={setNewPayer}
      />
      <AddSubCategoryModal
        isOpen={subcategoryModal.isOpen}
        onClose={subcategoryModal.onClose}
        categoryData={selectedCategory}
        setNewSubCategory={setNewSubCategory}
      />
      <ConfirmationModal
        isOpen={expenseCancelModal.isOpen}
        onClose={expenseCancelModal.onClose}
        onSubmit={closeAllModals}
        text={i18next.t('modal.confirmationModal.cancelAddNewExpenses')}
      />
    </>
  );
};
