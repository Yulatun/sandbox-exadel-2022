import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import {
  Button,
  Flex,
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
  Text,
  useDisclosure
} from '@chakra-ui/react';
import { ColorPicker } from 'chakra-color-picker';
import i18next from 'i18next';

import { createCategory, getCategory } from '@/api/Category';
import { DeleteConfirmationModal } from '@/components';

export const AddCategoryModal = ({ isOpen, onClose, categoryType }) => {
  const categoriesDeleteModal = useDisclosure();
  const [color, setColor] = useState('green');
  const {
    register,
    handleSubmit,
    formState: {
      errors: { name }
    }
  } = useForm({});

  const handleColorChange = (color) => {
    setColor(color);
  };

  const onSubmit = (data) => {
    createCategory(data, categoryType, color)
      .then(() => alert('you have created new category'))
      .catch((err) => console.log(err));
    onClose();
  };

  const { data, isFetched } = useQuery([], () => getCategory());

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} bg="red">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {i18next.t('modal.addCategory.header.Add')}
            {categoryType}
            {i18next.t('modal.addCategory.header.Category')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={name}>
              <Flex>
                <FormLabel htmlFor="name" w="40%">
                  {i18next.t('modal.addCategory.formName')}
                </FormLabel>
                <Flex flexDirection="column">
                  <Input
                    {...register('name', {
                      required: i18next.t('Please fill in the name'),
                      maxLength: {
                        value: 100,
                        message: 'Your name is too long'
                      },
                      pattern: {
                        value: /[A-Za-z]/,
                        message: i18next.t(
                          'modal.addCategory.validationErrorMessage.pattern'
                        )
                      },
                      validate: (name) =>
                        (isFetched &&
                          data.data
                            .filter((data) => data.existName)
                            .map((data) => data.existNameS)
                            .includes(name)) ||
                        i18next.t(
                          'modal.addCategory.validationErrorMessage.nameExist'
                        )
                    })}
                    placeholder={i18next.t(
                      'modal.addCategory.name.placeholder'
                    )}
                  />
                  <FormErrorMessage>
                    <Text>{name && name.message}</Text>
                  </FormErrorMessage>
                </Flex>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex pt={5}>
                <FormLabel pt="1%" w="40%">
                  {i18next.t('modal.addCategory.colorPicker')}
                </FormLabel>
                <ColorPicker
                  borderRadius="50px"
                  onChange={handleColorChange}
                  size="sm"
                />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit(onSubmit)}>
              {i18next.t('modal.addCategory.addButton')}
            </Button>
            <Button onClick={categoriesDeleteModal.onOpen}>
              {i18next.t('modal.addCategory.cancelButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteConfirmationModal
        isOpen={categoriesDeleteModal.isOpen}
        onClose={categoriesDeleteModal.onClose}
        text={i18next.t('modal.deleteCategory.text')}
      />
    </>
  );
};
