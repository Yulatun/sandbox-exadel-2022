import { useState } from 'react';
import { useForm } from 'react-hook-form';
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

import { createCategory } from '@/api/Category';
// import i18next from 'i18next';
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

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} bg="red">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add {categoryType} Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={name}>
              <Flex>
                <FormLabel htmlFor="name" w="40%">
                  Category name
                </FormLabel>
                <Flex flexDirection="column">
                  <Input
                    {...register('name', {
                      required: 'Please fill in the name',
                      maxLength: {
                        value: 100,
                        message: 'Your name is too long'
                      },
                      pattern: {
                        value: /[A-Za-z]/,
                        message:
                          'Only latin letters, numbers and special characters are allowed'
                      }
                    })}
                    placeholder="Category name"
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
                  Color
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
              Add
            </Button>

            <Button onClick={categoriesDeleteModal.onOpen}>Cancel</Button>
          </ModalFooter>
          <DeleteConfirmationModal
            isOpen={categoriesDeleteModal.isOpen}
            onClose={categoriesDeleteModal.onClose}
            text="“Do you really want to cancel the creation of the category? All you entered data will be lost”"
          />
        </ModalContent>
      </Modal>
    </>
  );
};
