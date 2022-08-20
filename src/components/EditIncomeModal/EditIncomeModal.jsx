import { useForm } from 'react-hook-form';
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
  getChosenWalletData,
  getWalletCurrencyData,
  getWalletsOptions
} from '@/helpers/selectHelpers';

import { AddCategoryModal } from '../AddCategoryModal';
import { SelectControlled } from '../SelectControlled';

export const EditIncomeModal = ({
  isOpen,
  onClose,
  onSubmit,
  walletsData,
  categoriesData,
  incomeData
}) => {
  const categoryModal = useDisclosure();

  const {
    control,
    register,
    handleSubmit,
    watch,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: getChosenWalletData(incomeData, walletsData),
      amount: incomeData.value,
      category: getChosenCategoryData(incomeData, categoriesData),
      date: format(new Date(incomeData.dateOfTransaction), 'yyyy-MM-dd'),
      note: incomeData.description
    }
  });

  return (
    <>
      <Modal
        scrollBehavior="inside"
        size="2xl"
        closeOnOverlayClick={false}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{i18next.t('modal.editIncome.title')}</ModalHeader>
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
              <FormLabel>{i18next.t('modal.editIncome.amount')}</FormLabel>
              <InputGroup>
                <NumberInput w="100%" precision={2}>
                  <NumberInputField
                    {...register('amount', {
                      required: i18next.t(
                        'modal.editIncome.validationErrorMessage.amount'
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
              listOfOptions={getCategoriesOptions(categoriesData, 'Income')}
              isRequiredData
              data={categoriesData}
              modalOnOpen={categoryModal.onOpen}
            />

            <FormControl mb="20px" isRequired>
              <FormLabel>{i18next.t('modal.editIncome.date')}</FormLabel>
              <Input type="date" {...register('date')} />
              <FormHelperText>
                {i18next.t('modal.editIncome.date.helperText')}
              </FormHelperText>
            </FormControl>

            <FormControl>
              <FormLabel>{i18next.t('modal.editIncome.note')}</FormLabel>
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
        categoryType={'Income'}
      />
    </>
  );
};
