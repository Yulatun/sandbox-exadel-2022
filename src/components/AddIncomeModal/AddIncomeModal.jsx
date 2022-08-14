import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
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
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import {
  getCategoriesOptions,
  getDefaultWalletData,
  getWalletsOptions
} from '@/helpers/selectHelpers';

import { AddCategoryModal } from '../AddCategoryModal';
import { SelectControlled } from '../SelectControlled';

export const AddIncomeModal = ({
  isOpen,
  onClose,
  onSubmit,
  userData,
  walletsData
}) => {
  const categoryModal = useDisclosure();

  const {
    data: { data: dataCategories } = { data: [] },
    isFetched: isFetchedCategories
  } = useQuery(['categories'], getCategories);

  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: getDefaultWalletData(userData, walletsData),
      date: new Date().toISOString().split('T')[0],
      isRecurring: {
        label: 'No (as default)',
        value: 'recurring-no'
      }
    }
  });

  const resetForm = () => {
    reset({
      wallet: getDefaultWalletData(userData, walletsData),
      date: new Date().toISOString().split('T')[0],
      isRecurring: {
        label: 'No (as default)',
        value: 'recurring-no'
      }
    });
  };

  useEffect(() => resetForm(), [!isOpen]);

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
            <ModalHeader>{i18next.t('modal.addIncome.title')}</ModalHeader>
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
                <FormLabel>{i18next.t('modal.addIncome.amount')}</FormLabel>
                <InputGroup>
                  <NumberInput w="100%" precision={2}>
                    <NumberInputField
                      {...register('amount', {
                        required: i18next.t(
                          'modal.addIncome.validationErrorMessage.amount'
                        )
                      })}
                    />
                  </NumberInput>
                  <InputRightAddon>
                    {i18next.t('modal.addIncome.amount.dollarSign')}
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
                listOfOptions={getCategoriesOptions(dataCategories, 'Income')}
                isRequiredData
                data={dataCategories}
                modalOnOpen={categoryModal.onOpen}
              />

              <FormControl mb="20px" isRequired>
                <FormLabel>{i18next.t('modal.addIncome.date')}</FormLabel>
                <Input type="date" {...register('date')} />
                <FormHelperText>
                  {i18next.t('modal.addIncome.date.helperText')}
                </FormHelperText>
              </FormControl>

              <SelectControlled
                nameOfSelect="isRecurring"
                control={control}
                listOfOptions={[
                  {
                    label: 'No (as default)',
                    value: 'recurring-no'
                  },
                  {
                    label: 'Daily',
                    value: 'recurring-daily'
                  },
                  {
                    label: 'Weekly',
                    value: 'recurring-no'
                  },
                  {
                    label: 'Monthly',
                    value: 'recurring-monthly'
                  }
                ]}
              />

              <FormControl>
                <FormLabel>{i18next.t('modal.addIncome.note')}</FormLabel>
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
      )}

      {categoryModal.isOpen && (
        <AddCategoryModal
          isOpen={categoryModal.isOpen}
          onClose={categoryModal.onClose}
          categoryType={'Income'}
        />
      )}
    </>
  );
};
