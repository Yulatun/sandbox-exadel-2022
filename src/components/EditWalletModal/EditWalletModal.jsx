import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Switch,
  Text
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCurrencies } from '@/api/Currency';
import { getUser } from '@/api/User';

export const EditWalletModal = ({ isOpen, onSubmit, onClose, walletData }) => {
  const { data: dataCurrency, isFetched: isFetchedCurrency } = useQuery(
    ['currency'],
    getCurrencies
  );

  const { data: dataUser, isFetched: isFetchedUser } = useQuery(
    ['user'],
    getUser
  );

  const defaultWallet =
    isFetchedUser && walletData.id === dataUser.data.defaultWallet;

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty }
  } = useForm({
    defaultValues: {
      name: walletData.name,
      currency: walletData.currency.currencyCode,
      setDefault: defaultWallet
    }
  });

  const onSubmitting = isDirty ? onSubmit : onClose;

  return (
    <Modal
      scrollBehavior="inside"
      closeOnOverlayClick={false}
      isOpen={isOpen}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{i18next.t('modal.editWallet.title')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isInvalid={errors.name} isRequired py="3">
            <FormLabel htmlFor="name">
              {i18next.t('modal.addWallet.name')}
            </FormLabel>

            <Input
              {...register('name', {
                required: i18next.t(
                  'modal.addWallet.validationErrorMessage.name'
                ),
                minLength: {
                  value: 2,
                  message: i18next.t(
                    'modal.addWallet.validationErrorMessage.tooShort'
                  )
                },
                maxLength: {
                  value: 30,
                  message: i18next.t(
                    'modal.addWallet.validationErrorMessage.tooLong'
                  )
                }
              })}
              type="text"
            />
            <FormErrorMessage>
              <Text>{errors.name && errors.name.message}</Text>
            </FormErrorMessage>
          </FormControl>

          <FormControl isInvalid={errors.currency} isRequired py="3">
            <FormLabel htmlFor="currency">
              {i18next.t('modal.addWallet.currency')}
            </FormLabel>
            <Select
              {...register('currency', {
                required: i18next.t(
                  'modal.addWallet.validationErrorMessage.currency'
                )
              })}
            >
              {!!dataCurrency &&
                !!dataCurrency.data &&
                isFetchedCurrency &&
                dataCurrency.data.map((currency) => {
                  return (
                    <option key={currency.id}>{currency.currencyCode}</option>
                  );
                })}
            </Select>
            <FormErrorMessage>
              <Text>{errors.currency && errors.currency.message}</Text>
            </FormErrorMessage>
          </FormControl>

          <FormControl py="3">
            <FormLabel htmlFor="setDefault">
              {i18next.t('modal.addWallet.setDefault')}
            </FormLabel>
            <Switch {...register('setDefault')} size="lg" />
            <FormHelperText>
              {i18next.t('modal.addWallet.setDefault.helperText')}
            </FormHelperText>
          </FormControl>
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleSubmit(onSubmitting)} mr={3}>
            {i18next.t('button.submit')}
          </Button>
          <Button onClick={onClose} variant="secondary">
            {i18next.t('button.cancel')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
