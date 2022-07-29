import { useForm } from 'react-hook-form';
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
  Text,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { createWallet } from '@/api/Wallet';

export const AddWalletModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = (data) => {
    createWallet(data)
      .then(() => alert(i18next.t('wallet.createdMessage')))
      .catch((err) => console.log(err));
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>{i18next.t('modal.addWallet.title')}</Button>

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
                placeholder={i18next.t('modal.addWallet.currency.placeholder')}
              >
                {/* we will change these fields in the future, so no need to make i18next placeholders here */}
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="PLN">PLN</option>
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
            <Button onClick={handleSubmit(onSubmit)} mr={3}>
              {i18next.t('button.submit')}
            </Button>
            <Button onClick={onClose} variant="danger">
              {i18next.t('button.cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
