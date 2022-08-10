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

import { getDefaultCategories } from '@/api/DefaultCategory';
import { getWallets } from '@/api/Wallet';

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
  const { data: dataDefaultCategories, isFetched: isFetchedDefaultCategories } =
    useQuery(['defaultCategories'], getDefaultCategories);

  const {
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
          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.editExpense.wallet')}</FormLabel>
            {(!!dataWallets && !!dataWallets.data && isFetchedWallets && (
              <Select {...register('wallet')}>
                {!!Object.keys(dataWallets).length &&
                  dataWallets.data.map((wallet) => (
                    <option key={wallet.id} value={wallet.id}>
                      {wallet.name}
                    </option>
                  ))}
              </Select>
            )) || (
              <Skeleton
                height="40px"
                borderRadius="5px"
                startColor="orange.100"
                endColor="orange.200"
              />
            )}
          </FormControl>

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

          <FormControl mb="20px" isRequired isInvalid={category}>
            <FormLabel htmlFor="category">
              {i18next.t('modal.editExpense.category')}
            </FormLabel>
            {(!!dataDefaultCategories &&
              !!dataDefaultCategories.data &&
              isFetchedDefaultCategories && (
                <Select
                  placeholder={i18next.t(
                    'modal.editExpense.category.placeholder'
                  )}
                  {...register('category', {
                    required: i18next.t(
                      'modal.editExpense.validationErrorMessage.category'
                    )
                  })}
                >
                  {!!Object.keys(dataDefaultCategories).length &&
                    dataDefaultCategories.data
                      .filter((category) => category.categoryType === 'Expense')
                      .map((category) => (
                        <option key={category.id} value={category.id}>
                          {category.name}
                        </option>
                      ))}
                </Select>
              )) || (
              <Skeleton
                height="40px"
                borderRadius="5px"
                startColor="orange.100"
                endColor="orange.200"
              />
            )}
            <FormErrorMessage>
              <Text>{category && category.message}</Text>
            </FormErrorMessage>
          </FormControl>

          <FormControl mb="20px">
            <FormLabel>{i18next.t('modal.editExpense.subcategory')}</FormLabel>
            {(!!dataDefaultCategories &&
              !!dataDefaultCategories.data &&
              isFetchedDefaultCategories && (
                <Select
                  placeholder={i18next.t(
                    'modal.editExpense.subcategory.placeholder'
                  )}
                  {...register('subcategory')}
                >
                  {!!Object.keys(dataDefaultCategories).length &&
                    dataDefaultCategories.data
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
              (!isFetchedDefaultCategories && (
                <Skeleton
                  height="40px"
                  borderRadius="5px"
                  startColor="orange.100"
                  endColor="orange.200"
                />
              ))}
          </FormControl>

          <FormControl mb="20px">
            <FormLabel>{i18next.t('modal.editExpense.payer')}</FormLabel>
            <Select
              placeholder={i18next.t('modal.editExpense.payer.placeholder')}
              {...register('payer')}
            >
              <option value="payer-default">Me</option>
              <option value="payer-2">New payer</option>
              <option value="payer-3">New payer</option>
              <option value="payer-4">New payer</option>
            </Select>
          </FormControl>

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
