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

import { editCategory } from '@/api/Category';
import { getDefaultCategories } from '@/api/DefaultCategory';
import { DeleteConfirmationModal } from '@/components';

export const EditCategoryModal = ({
  isOpen,
  onClose,
  categoryType,
  categoryData
}) => {
  // const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
  //   ['categories'],
  //   getCategories
  // );
  const { data: dataDefaultCategories, isFetched: isFetchedDefaultCategories } =
    useQuery(['defaultCategories'], getDefaultCategories);

  const { color, setColor } = useState();
  const categoriesDeleteModal = useDisclosure();

  const {
    register,
    handleSubmit,
    // reset,
    formState: {
      isDirty,
      errors: { name }
    }
  } = useForm({
    defaultValues: {
      name: categoryData.name,
      color: categoryData.color
    }
  });

  const handleColorChange = (color) => {
    setColor(color);
  };
  const onSubmit = (data) => {
    editCategory({
      name: data.name,
      categoryType: categoryType,
      color: color
    })
      .then(() =>
        alert(i18next.t('modal.addCategory.submitSuccessful.message'))
      )
      .catch((err) => console.log(err));
    // reset();
    onClose();
  };
  const closeAllModals = () => {
    categoriesDeleteModal.onClose();
    onClose();
  };

  const onCancel = () => {
    isDirty ? categoriesDeleteModal.onOpen() : onClose();
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} closeOnOverlayClick={false}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {categoryType === 'Income'
              ? i18next.t('modal.editCategory.header.incomeCategory')
              : i18next.t('modal.editCategory.header.expensesCategory')}
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
                      required: i18next.t(
                        'modal.addCategory.validationErrorMessage.name'
                      ),
                      maxLength: {
                        value: 100,
                        message: i18next.t(
                          'modal.addCategory.validationErrorMessage.nameIsLong'
                        )
                      },
                      pattern: {
                        value: /^[a-zA-Z0-9$@$!%*?&#^-_. +]+$/,
                        message: i18next.t(
                          'modal.addCategory.validationErrorMessage.pattern'
                        )
                      },
                      validate: (name) =>
                        (isFetchedDefaultCategories &&
                          !dataDefaultCategories.data
                            .filter(
                              (data) => data.categoryType === categoryType
                            )
                            .map((data) => data.name)
                            .includes(name)) ||
                        i18next.t(
                          'modal.addCategory.validationErrorMessage.nameExist'
                        )
                    })}
                    placeholder={i18next.t(
                      'modal.addCategory.name.placeholder'
                    )}
                  ></Input>
                  <FormErrorMessage>
                    <Text>{name && name.message}</Text>
                  </FormErrorMessage>
                </Flex>
              </Flex>
            </FormControl>

            <FormControl>
              <Flex pt={10}>
                <FormLabel pt="1%" w="40%">
                  {i18next.t('modal.addCategory.colorPicker')}
                </FormLabel>
                <ColorPicker
                  {...register('color')}
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
            <Button onClick={onCancel}>
              {i18next.t('modal.addCategory.cancelButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <DeleteConfirmationModal
        isOpen={categoriesDeleteModal.isOpen}
        onClose={categoriesDeleteModal.onClose}
        onSubmit={closeAllModals}
        text={i18next.t('modal.deleteCategory.text')}
      />
    </>
  );
};
export default EditCategoryModal;
