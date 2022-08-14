import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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
  Switch,
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCurrencies } from '@/api/Currency';
import { createWallet } from '@/api/Wallet';
import { getCurrenciesOptions } from '@/helpers/selectHelpers';

import { NotificationModal } from '../NotificationModal';
import { SelectControlled } from '../SelectControlled';

export const AddWalletModal = ({ isOpen, onClose }) => {
  const createWalletModal = useDisclosure();
  const queryClient = useQueryClient();

  const {
    data: { data: dataCurrencies } = { data: [] },
    isFetched: isFetchedCurrencies
  } = useQuery(['currency'], getCurrencies);

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors, currency }
  } = useForm();

  const mutationCreateWallet = useMutation(
    (data) =>
      createWallet({
        name: data.name,
        currencyId: data.currency?.value,
        setDefault: data.setDefault
      }),
    {
      onSuccess: () => {
        createWalletModal.onOpen();
        queryClient.invalidateQueries(['wallets']);
      }
    }
  );

  const createWalletOnSubmit = (data) => {
    mutationCreateWallet.mutate(data);
    onClose();
  };

  useEffect(() => reset(), [!isOpen]);

  return (
    <>
      {!!dataCurrencies && isFetchedCurrencies && (
        <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>{i18next.t('modal.addWallet.title')}</ModalHeader>
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
                  placeholder={i18next.t('modal.addWallet.name.placeholder')}
                />
                <FormErrorMessage>
                  <Text>{errors.name && errors.name.message}</Text>
                </FormErrorMessage>
              </FormControl>

              <SelectControlled
                nameOfSelect="currency"
                control={control}
                errorData={currency}
                listOfOptions={getCurrenciesOptions(dataCurrencies)}
                isRequiredData
                data={dataCurrencies}
              />

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
              <Button mr={3} onClick={handleSubmit(createWalletOnSubmit)}>
                {i18next.t('button.submit')}
              </Button>
              <Button variant="secondary" onClick={onClose}>
                {i18next.t('button.cancel')}
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {!isOpen && (
        <NotificationModal
          isOpen={createWalletModal.isOpen}
          onSubmit={createWalletModal.onClose}
          onClose={createWalletModal.onClose}
          text={i18next.t('wallet.createdMessage')}
        />
      )}
    </>
  );
};
