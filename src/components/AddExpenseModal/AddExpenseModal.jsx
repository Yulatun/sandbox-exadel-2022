import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
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
  Stack,
  Textarea
} from '@chakra-ui/react';
import i18next from 'i18next';

export const AddExpenseModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      wallet: 'wallet-1-default',
      payer: 'payer-default',
      date: new Date().toISOString().split('T')[0]
    }
  });

  return (
    <Modal
      size="3xl"
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

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addExpense.amount')}</FormLabel>
            <InputGroup>
              <NumberInput w="100%" precision={2}>
                <NumberInputField {...register('amount')} />
              </NumberInput>
              <InputRightAddon>
                {i18next.t('modal.addExpense.amount.dollarSign')}
              </InputRightAddon>
            </InputGroup>
          </FormControl>

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addExpense.category')}</FormLabel>
            <Select
              placeholder={i18next.t('modal.addExpense.category.placeholder')}
              {...register('category')}
            >
              <option value="category-1">Category 1</option>
              <option value="category-2">Category 2</option>
              <option value="category-3">Category 3</option>
            </Select>
          </FormControl>

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addExpense.subcategory')}</FormLabel>
            <Select
              placeholder={i18next.t(
                'modal.addExpense.subcategory.placeholder'
              )}
              {...register('category')}
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
              {...register('payer')}
            >
              <option value="payer-default">Me</option>
              <option value="payer-2">New payer</option>
              <option value="payer-3">New payer</option>
              <option value="payer-4">New payer</option>
            </Select>
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
            <Button mr="20px" onClick={onClose} invert>
              {i18next.t('modal.addExpense.button.cancel')}
            </Button>
          </Stack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddExpenseModal;

/* const { isIncomeOpen, onIncomeOpen, onIncomeClose } = useDisclosure() */
