import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import { AddIcon } from '@chakra-ui/icons';
import {
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  IconButton,
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
import { SelectControlled } from '@/components/SelectControlled/SelectControlled';

export const AddWalletModal = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();

  const { data: dataCurrency, isFetched: isFetchedCurrency } = useQuery(
    ['currency'],
    getCurrencies
  );

  let currencyOptions = [];
  if (!!dataCurrency && !!dataCurrency.data && isFetchedCurrency) {
    currencyOptions = dataCurrency.data.map((currency) => ({
      value: currency.id,
      label: currency.currencyCode
    }));
  }

  const {
    control,
    register,
    handleSubmit,
    formState: { errors, currency }
  } = useForm();

  const onSubmit = (data) => {
    const currency = dataCurrency.data.find(
      (item) => item.currencyCode === data.currency
    );

    createWallet({
      name: data.name,
      currency,
      setDefault: data.setDefault
    })
      .then(() => alert(i18next.t('wallet.createdMessage')))
      .catch((err) => console.log(err));
    onClose();
  };

  return (
    <>
      <Flex
        direction="column"
        mb="10px"
        alignItems="center"
        mr="25px"
        ml="25px"
      >
        <IconButton
          width="40px"
          height="40px"
          isRound
          mb="5px"
          colorScheme="blue"
          aria-label={i18next.t('modal.addWallet.title')}
          onClick={onOpen}
          icon={<AddIcon />}
        />
        {i18next.t('modal.addWallet.title')}
      </Flex>
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
              isRequiredData
              listOfOptions={currencyOptions}
              data={dataCurrency}
              isFetchedData={isFetchedCurrency}
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
            <Button onClick={handleSubmit(onSubmit)} mr={3}>
              {i18next.t('button.submit')}
            </Button>
            <Button onClick={onClose} variant="secondary">
              {i18next.t('button.cancel')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
