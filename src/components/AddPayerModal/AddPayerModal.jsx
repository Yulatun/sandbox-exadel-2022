import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  Button,
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
  Text
} from '@chakra-ui/react';
import i18next from 'i18next';

import { createPayer, getPayers } from '@/api/User';

export const AddPayerModal = ({ isOpen, onClose, setNewPayer }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors: { name }
    }
  } = useForm({});

  const onSubmit = (data) => {
    createPayer(data.name).then(() => {
      reset();
      onClose(data);
    });
    setNewPayer(data);
  };

  const { data, isFetched } = useQuery(['payers'], getPayers);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{i18next.t('modal.addPayer.header')}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl isRequired isInvalid={name}>
            <FormLabel htmlFor="name">
              {i18next.t('modal.addPayer.formName')}
            </FormLabel>

            <Input
              {...register('name', {
                required: i18next.t(
                  'modal.addPayer.validationErrorMessage.noData'
                ),
                maxLength: {
                  value: 64,
                  message: i18next.t(
                    'modal.addPayer.validationErrorMessage.nameIsLong'
                  )
                },
                pattern: {
                  value: /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/,
                  message: i18next.t(
                    'modal.addPayer.validationErrorMessage.pattern'
                  )
                },
                validate: (name) =>
                  (isFetched && !data.data.includes(name)) ||
                  i18next.t('modal.addPayer.validationErrorMessage.nameExist')
              })}
              placeholder={i18next.t('modal.addPayer.placeholder')}
            />

            <FormErrorMessage>
              <Text>{name && name.message}</Text>
            </FormErrorMessage>
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
            {i18next.t('modal.addPayer.addButton')}
          </Button>
          <Button variant="secondary" onClick={onClose}>
            {i18next.t('modal.addPayer.cancelButton')}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
