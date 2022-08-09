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

import { createPayer, getPayers } from '@/api/Payer';

export const AddPayerModal = ({ isOpen, onClose }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors: { name }
    }
  } = useForm({});

  const onSubmit = (data) => {
    createPayer(data).then(() => {
      reset();
      onClose(data);
    });
  };

  const { data, isFetched } = useQuery(['payers'], getPayers);

  return (
    <>
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
                  required: 'please write a name',
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
              ></Input>
              <FormErrorMessage>
                <Text>{name && name.message}</Text>
              </FormErrorMessage>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              {i18next.t('modal.addPayer.addButton')}
            </Button>
            <Button onClick={onClose}>
              {i18next.t('modal.addPayer.cancelButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};
