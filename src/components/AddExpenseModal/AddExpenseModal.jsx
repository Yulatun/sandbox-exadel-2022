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
  Link,
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
  Stack,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getPayers } from '@/api/Payer';
import { AddPayerModal } from '@/components';

export const AddExpenseModal = ({ isOpen, onClose, onSubmit }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      wallet: 'wallet-1-default',
      payer: 'payer-default',
      date: new Date().toISOString().split('T')[0]
    }
  });

  const payerModal = useDisclosure();

  const { data, isFetched } = useQuery(['payers'], getPayers);

  const queryClient = useQueryClient();

  const addPayer = (newPayer) => {
    queryClient.invalidateQueries(['payers']).then(() => {
      setTimeout(() => {
        setValue('payer', newPayer.name);
      }, 100);
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
          <ModalHeader>{i18next.t('modal.addExpense.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl mb="20px" isRequired>
              <FormLabel>{i18next.t('modal.addExpense.wallet')}</FormLabel>
              <Select {...register('wallet')}>
                <option value="wallet-1-default">
                  Wallet by default (in dollars)
                </option>
                <option value="wallet-2">Wallet 2 (in euro)</option>
                <option value="wallet-3">Wallet 3 (in zl)</option>
              </Select>
            </FormControl>

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

            <FormControl mb="20px" isRequired isInvalid={category}>
              <FormLabel htmlFor="category">
                {i18next.t('modal.addExpense.category')}
              </FormLabel>
              <Select
                placeholder={i18next.t('modal.addExpense.category.placeholder')}
                {...register('category', {
                  required: i18next.t(
                    'modal.addExpense.validationErrorMessage.category'
                  )
                })}
              >
                <option value="category-1">Category 1</option>
                <option value="category-2">Category 2</option>
                <option value="category-3">Category 3</option>
              </Select>
              <FormErrorMessage>
                <Text>{category && category.message}</Text>
              </FormErrorMessage>
            </FormControl>

            <FormControl mb="20px" isRequired>
              <FormLabel>{i18next.t('modal.addExpense.subcategory')}</FormLabel>
              <Select
                placeholder={i18next.t(
                  'modal.addExpense.subcategory.placeholder'
                )}
                {...register('sub-category')}
              >
                <option value="subcategory-1">Subcategory 1</option>
                <option value="subcategory-2">Subcategory 2</option>
                <option value="subcategory-3">Subcategory 3</option>
              </Select>
            </FormControl>

            <FormControl mb="20px" isRequired>
              <FormLabel>{i18next.t('modal.addExpense.payer')}</FormLabel>
              <Select
                placeholder={i18next.t('modal.addExpense.payer.placeholder')}
                {...register('payer', {
                  required: true
                })}
              >
                {isFetched &&
                  data.data.map((payerName) => (
                    <option key={payerName} value={payerName}>
                      {payerName}
                    </option>
                  ))}
              </Select>

              <Text fontSize="xs">
                {i18next.t('modal.addExpense.addPayerQuestion')}
                <Link onClick={payerModal.onOpen} textColor="blue.500" ml={5}>
                  {i18next.t('modal.addExpense.addPayer')}
                </Link>
              </Text>
            </FormControl>

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
      <AddPayerModal isOpen={payerModal.isOpen} onClose={addPayer} />
    </>
  );
};

export default AddExpenseModal;
