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
import i18next from 'i18next';

import { getDefaultCategories } from '@/api/DefaultCategories';
import { getWallets } from '@/api/Wallet';

export const AddIncomeModal = ({ isOpen, onClose, onSubmit, userData }) => {
  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets', userData.id],
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
      wallet: userData.defaultWallet,
      date: new Date().toISOString().split('T')[0],
      isRecurring: 'recurring-no'
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
        <ModalHeader>{i18next.t('modal.addIncome.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addIncome.wallet')}</FormLabel>
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

          <FormControl mb="20px" isRequired isInvalid={category}>
            <FormLabel htmlFor="category">
              {i18next.t('modal.addIncome.category')}
            </FormLabel>
            {(!!dataDefaultCategories &&
              !!dataDefaultCategories.data &&
              isFetchedDefaultCategories && (
                <Select
                  placeholder={i18next.t(
                    'modal.addIncome.category.placeholder'
                  )}
                  {...register('category', {
                    required: i18next.t(
                      'modal.addIncome.validationErrorMessage.category'
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

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addIncome.date')}</FormLabel>
            <Input type="date" {...register('date')} />
            <FormHelperText>
              {i18next.t('modal.addIncome.date.helperText')}
            </FormHelperText>
          </FormControl>

          <FormControl mb="20px">
            <FormLabel>{i18next.t('modal.addIncome.isRecurring')}</FormLabel>
            <Select {...register('isRecurring')}>
              <option value="recurring-no">
                {i18next.t('modal.addIncome.isRecurring.no')}
              </option>
              <option value="recurring-daily">
                {i18next.t('modal.addIncome.isRecurring.daily')}
              </option>
              <option value="recurring-weekly">
                {i18next.t('modal.addIncome.isRecurring.weekly')}
              </option>
              <option value="recurring-monthly">
                {i18next.t('modal.addIncome.isRecurring.monthly')}
              </option>
            </Select>
          </FormControl>

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
  );
};
