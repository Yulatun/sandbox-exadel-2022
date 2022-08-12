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
  Select,
  Skeleton,
  Text,
  Textarea
} from '@chakra-ui/react';
import { format } from 'date-fns';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getPayers } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import { SelectControlled } from '@/components/Selector/SelectControlled';

export const EditExpenseModal = ({
  isOpen,
  onClose,
  onSubmit,
  expenseData
}) => {
  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );
  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

  const { data, isFetched } = useQuery(['payers'], getPayers);
  let categoriesOptions = [];

  let walletOptions = [];
  if (!!dataWallets && !!dataWallets.data && isFetchedWallets)
    walletOptions =
      !!Object.keys(dataWallets).length &&
      dataWallets.data.map((wallet) => ({
        label: wallet.name,
        value: wallet.id
      }));

  if (!!dataCategories && !!dataCategories.data && isFetchedCategories) {
    categoriesOptions = dataCategories.data.map((category) => ({
      value: category.id,
      label: category.name
    }));
  }

  let PayerOptions = [];
  if (isFetched && data.data) {
    PayerOptions = data.data.map((payer) => ({
      value: payer,
      label: payer
    }));
  }
  const {
    control,
    register,
    handleSubmit,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: expenseData.walletId,
      amount: expenseData.value,
      category: expenseData.categoryId,
      subcategory: '',
      payer: expenseData.payer,
      date: format(new Date(expenseData.dateOfTransaction), 'yyyy-MM-dd'),
      note: expenseData.description
    }
  });

  return (
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
            listOfOptions={walletOptions}
            data={dataWallets}
            isFetchedData={isFetchedWallets}
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
                {i18next.t('modal.editExpense.amount.dollarSign')}
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
            listOfOptions={categoriesOptions}
            isRequiredData
            data={dataCategories}
            isFetchedData={isFetchedCategories}
          />

          <FormControl mb="20px">
            <FormLabel>{i18next.t('modal.editExpense.subcategory')}</FormLabel>
            {(!!dataCategories &&
              !!dataCategories.data &&
              isFetchedCategories && (
                <Select
                  placeholder={i18next.t(
                    'modal.editExpense.subcategory.placeholder'
                  )}
                  {...register('subcategory')}
                >
                  {!!Object.keys(dataCategories).length &&
                    dataCategories.data
                      .filter((category) => category.categoryType === 'Expense')
                      .map(
                        (category) =>
                          !!category.subCategories.length &&
                          category.subCategories.map((subcategory) => (
                            <option key={subcategory.id} value={subcategory.id}>
                              {subcategory.name}
                            </option>
                          ))
                      )}
                </Select>
              )) ||
              (!isFetchedCategories && (
                <Skeleton
                  height="40px"
                  borderRadius="5px"
                  startColor="orange.100"
                  endColor="orange.200"
                />
              ))}
          </FormControl>

          <SelectControlled
            nameOfSelect="payer"
            control={control}
            listOfOptions={PayerOptions}
            data={data}
            isFetchedData={isFetched}
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
          <Button mr="20px" type="submit" onClick={handleSubmit(onSubmit)}>
            {i18next.t('button.submit')}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            {i18next.t('button.cancel')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
