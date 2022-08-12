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
  Textarea
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getWallets } from '@/api/Wallet';
import { SelectControlled } from '@/components/Selector/SelectControlled';

export const AddIncomeModal = ({ isOpen, onClose, onSubmit, userData }) => {
  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );
  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

  let defaultWallet = {};

  let walletsOptions = [];
  let categoriesOptions = [];

  if (!!dataWallets && !!dataWallets.data && isFetchedWallets) {
    defaultWallet = {
      value: userData.defaultWallet,
      label: dataWallets.data.find(
        (wallet) => wallet.id === userData.defaultWallet
      ).name
    };
    walletsOptions = dataWallets.data.map((wallet) => ({
      value: wallet.id,
      label: wallet.name
    }));
  }

  if (!!dataCategories && !!dataCategories.data && isFetchedCategories) {
    categoriesOptions = dataCategories.data.map((category) => ({
      value: category.id,
      label: category.name
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
      // wallet: userData.defaultWallet,
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
          <SelectControlled
            nameOfSelect="wallet"
            control={control}
            listOfOptions={walletsOptions}
            defaultValue={defaultWallet}
            data={dataWallets}
            isFetchedData={isFetchedWallets}
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
            listOfOptions={categoriesOptions}
            isRequiredData
            data={dataCategories}
            isFetchedData={isFetchedCategories}
          />

          <FormControl mb="20px" isRequired>
            <FormLabel>{i18next.t('modal.addIncome.date')}</FormLabel>
            <Input type="date" {...register('date')} />
            <FormHelperText>
              {i18next.t('modal.addIncome.date.helperText')}
            </FormHelperText>
          </FormControl>

          <FormControl mb="20px">
            <FormLabel>{i18next.t('modal.addIncome.isRecurring')}</FormLabel>
            <Select
              options={[
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
