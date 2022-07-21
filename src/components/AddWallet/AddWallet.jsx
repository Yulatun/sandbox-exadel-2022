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
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

export const AddWallet = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = () => {
    onClose();
  };

  return (
    <>
      <Button onClick={onOpen}>{i18next.t('addWallet.title')}</Button>

      <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{i18next.t('addWallet.title')}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isInvalid={errors.name} isRequired py="3">
              <FormLabel htmlFor="name">
                {i18next.t('addWallet.name')}
              </FormLabel>
              <Input
                {...register('name')}
                type="text"
                placeholder={i18next.t('addWallet.name.placeholder')}
              />
              <FormErrorMessage>
                {errors.name && errors.name.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl py="3">
              <FormLabel htmlFor="amount">
                {i18next.t('addWallet.amount')}
              </FormLabel>
              <Input
                {...register('amount')}
                type="number"
                placeholder={i18next.t('addWallet.amount.placeholder')}
              />
            </FormControl>

            <FormControl isInvalid={errors.currency} isRequired py="3">
              <FormLabel htmlFor="currency">
                {i18next.t('addWallet.currency')}
              </FormLabel>
              <Select
                {...register('currency')}
                placeholder={i18next.t('addWallet.currency.placeholder')}
              >
                {/* we will change these fields in the future, so no need to make i18next placeholders here */}
                <option value="EUR">EUR</option>
                <option value="USD">USD</option>
                <option value="PLN">PLN</option>
              </Select>
              <FormErrorMessage>
                {errors.currency && errors.currency.message}
              </FormErrorMessage>
            </FormControl>

            <FormControl py="3">
              <FormLabel htmlFor="setDefault">
                {i18next.t('addWallet.setDefault')}
              </FormLabel>
              <Switch {...register('setDefault')} size="lg" />
              <FormHelperText>
                {i18next.t('addWallet.setDefault.helperText')}
              </FormHelperText>
            </FormControl>

            <ModalFooter>
              <Button
                onClick={handleSubmit(onSubmit)}
                colorScheme="blue"
                mr={3}
                type="submit"
              >
                {i18next.t('button.submit')}
              </Button>
              <Button mr={-3} onClick={onClose}>
                {i18next.t('button.cancel')}
              </Button>
            </ModalFooter>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
