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
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  NumberInput,
  NumberInputField,
  Stack,
  Text,
  Textarea,
  useDisclosure
} from '@chakra-ui/react';
import { Select } from 'chakra-react-select';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { getPayers } from '@/api/User';
import { getWallets } from '@/api/Wallet';
import { AddPayerModal } from '@/components';
import { SelectControlled } from '@/components/Selector/SelectControlled';

export const AddExpenseModal = ({ isOpen, onClose, onSubmit }) => {
  const { data: dataWallets, isFetched: isFetchedWallets } = useQuery(
    ['wallets'],
    getWallets
  );
  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

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

  let PayerOptions = [];
  if (isFetched && data.data) {
    PayerOptions = data.data.map((payer) => ({
      value: payer,
      label: payer
    }));
  }

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

  const {
    control,
    register,
    handleSubmit,
    setValue,
    formState: {
      errors: { amount, category }
    }
  } = useForm({
    defaultValues: {
      //wallet: 'wallet-1-default',
      payer: 'payer-default',
      date: new Date().toISOString().split('T')[0]
    }
  });

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
            <SelectControlled
              nameOfSelect="wallet"
              control={control}
              listOfOptions={walletOptions}
              data={dataWallets}
              isFetchedData={isFetchedWallets}
            />

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
              <FormLabel>{i18next.t('modal.addExpense.subcategory')}</FormLabel>
              <Select
                options={[
                  {
                    label: 'Subcategory 1',
                    value: 'subcategory-1'
                  },
                  {
                    label: 'Subcategory 2',
                    value: 'subcategory-2'
                  },
                  {
                    label: 'Subcategory 3',
                    value: 'subcategory-3'
                  }
                ]}
              />
            </FormControl>

            <SelectControlled
              nameOfSelect="payer"
              control={control}
              listOfOptions={PayerOptions}
              data={data}
              isRequiredData
              isFetchedData={isFetched}
            />

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
