import { useForm } from 'react-hook-form';
import {
  Button,
  FormControl,
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
  Textarea
} from '@chakra-ui/react';
import i18next from 'i18next';
import moment from 'moment';

export const AddIncomeModal = ({ isOpen, onClose, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: {
      wallet: 'wallet-1-default',
      date: moment(new Date()).format('YYYY-MM-DD'),
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
            <Select {...register('wallet')}>
              <option value="wallet-1-default">
                Wallet by default (in dollars)
              </option>
              <option value="wallet-2">Wallet 2 (in euro)</option>
              <option value="wallet-3">Wallet 3 (in zl)</option>
            </Select>
          </FormControl>

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addIncome.amount')}</FormLabel>
            <InputGroup>
              <NumberInput w="100%" precision={2}>
                <NumberInputField {...register('amount')} />
              </NumberInput>
              <InputRightAddon>
                {i18next.t('modal.addIncome.amount.dollarSign')}
              </InputRightAddon>
            </InputGroup>
          </FormControl>

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addIncome.category')}</FormLabel>
            <Select
              placeholder={i18next.t('modal.addIncome.category.placeholder')}
              {...register('category')}
            >
              <option value="category-1">Category 1</option>
              <option value="category-2">Category 2</option>
              <option value="category-3">Category 3</option>
              <option value="category-new">
                {i18next.t('modal.addIncome.category.option.addNew')}
              </option>
            </Select>
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
          <Button mr="20px" type="submit" onClick={handleSubmit(onSubmit)}>
            {i18next.t('button.submit')}
          </Button>
          <Button onClick={onClose}>{i18next.t('button.cancel')}</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
