import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Button,
  createStandaloneToast,
  FormControl,
  FormErrorMessage,
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
import { getWallets } from '@/api/Wallet';
import { createWallet } from '@/api/Wallet';
import { ConfirmationModal } from '@/components';
import { areAnyWallets } from '@/helpers/helpers';
import { getCurrenciesOptions } from '@/helpers/selectHelpers';

import { SelectControlled } from '../SelectControlled';

export const AddWalletModal = ({ isOpen, onClose }) => {
  const createWalletModal = useDisclosure();
  const setDefaultModal = useDisclosure();
  const queryClient = useQueryClient();
  const { toast } = createStandaloneToast();
  const {
    data: { data: dataCurrencies } = { data: [] },
    isFetched: isFetchedCurrencies
  } = useQuery(['currency'], getCurrencies);

  const {
    control,
    register,
    reset,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors, currency }
  } = useForm();

  const {
    data: { data: dataWallets } = { data: [] },
    isFetched: isFetchedWallets
  } = useQuery(['wallets'], getWallets);

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
        toast({
          title: i18next.t('wallet.createdMessage'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
      }
    }
  );

  const createWalletOnSubmit = (data) => {
    mutationCreateWallet.mutate(data);
    onClose();
  };

  useEffect(() => reset(), [!isOpen]);

  const onSwitchChange = () => {
    if (!getValues('setDefault')) {
      openSetDefaultModal();
    } else {
      setValue('setDefault', false);
    }
  };

  const openSetDefaultModal = () => {
    setDefaultModal.onOpen();
  };

  const setDefaultModalOnSubmit = () => {
    setValue('setDefault', true);
    setDefaultModal.onClose();
  };

  const setDefaultModalOnCancel = () => {
    setValue('setDefault', false);
    setDefaultModal.onClose();
  };

  return (
    <>
      {!!dataCurrencies &&
        !!dataWallets &&
        isFetchedWallets &&
        isFetchedCurrencies && (
          <Modal
            scrollBehavior="inside"
            closeOnOverlayClick={false}
            isOpen={isOpen}
            onClose={onClose}
          >
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
                  <Switch
                    size="lg"
                    onChange={onSwitchChange}
                    isChecked={getValues('setDefault')}
                    isDisabled={!areAnyWallets(dataWallets)}
                    defaultChecked={!areAnyWallets(dataWallets)}
                  />
                </FormControl>
                {
                  <ConfirmationModal
                    isOpen={setDefaultModal.isOpen}
                    onSubmit={setDefaultModalOnSubmit}
                    onClose={setDefaultModalOnCancel}
                    title={i18next.t('modal.addWallet.setDefault')}
                    text={i18next.t('modal.addWallet.setDefault.helperText')}
                  />
                }
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
    </>
  );
};
