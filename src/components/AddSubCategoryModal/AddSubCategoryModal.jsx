import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Button,
  createStandaloneToast,
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

import { createSubCategory } from '@/api/SubCategory';

import { ConfirmationModal } from '../ConfirmationModal';

export const AddSubCategoryModal = ({
  isOpen,
  onClose,
  categoryData,
  setNewSubCategory
}) => {
  const categoriesDeleteModal = useDisclosure();

  const { toast } = createStandaloneToast();

  const {
    register,
    handleSubmit,
    control,
    reset,
    formState: {
      isDirty,
      errors: { name }
    }
  } = useForm({
    defaultValues: {
      name: '',
      color: categoryData?.color
    }
  });

  const onSubmit = (data) => {
    createSubCategory({
      categoryId: categoryData.id,
      name: data.name,
      limit: 0,
      limitPeriod: 'Daily',
      categoryType: categoryData.categoryType,
      color: data.color
    })
      .then(() => {
        onClose();
        resetForm();
        toast({
          title: i18next.t('modal.addSubCategory.submitSuccessful.message'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
      })
      .catch((err) =>
        toast({
          title: err.message,
          status: 'error',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        })
      );
    setNewSubCategory(data);
  };

  const closeAllModals = () => {
    categoriesDeleteModal.onClose();
    onClose();
  };

  const onCancel = () => {
    isDirty ? categoriesDeleteModal.onOpen() : onClose();
  };

  const resetForm = () => {
    reset({ name: '', color: categoryData?.color });
  };
  useEffect(() => resetForm(), [!isOpen]);

  return (
    <>
      <Modal
        scrollBehavior="inside"
        isOpen={isOpen}
        onClose={onCancel}
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {i18next.t('modal.addSubCategory.header.expensesSubCategory')}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl isRequired isInvalid={name}>
              <Flex>
                <FormLabel htmlFor="name" w="40%">
                  {i18next.t('modal.addSubCategory.formName')}
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
                        !categoryData?.subCategories
                          .map((data) => data.name.toLocaleUpperCase())
                          .includes(name.toLocaleUpperCase()) ||
                        i18next.t(
                          'modal.addCategory.validationErrorMessage.nameExist'
                        )
                    })}
                    placeholder={i18next.t('modal.addSubCategory.formName')}
                  />
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
                <Controller
                  control={control}
                  name="color"
                  render={({ field }) => (
                    <ColorPicker
                      defaultColor={field.value}
                      borderRadius="50px"
                      size="sm"
                      onChange={(color) => field.onChange(color)}
                    />
                  )}
                />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleSubmit(onSubmit)}>
              {i18next.t('modal.addCategory.addButton')}
            </Button>
            <Button onClick={onCancel} variant="secondary">
              {i18next.t('modal.addCategory.cancelButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmationModal
        isOpen={categoriesDeleteModal.isOpen}
        onClose={categoriesDeleteModal.onClose}
        onSubmit={closeAllModals}
        text={i18next.t('modal.deleteSubCategory.text')}
      />
    </>
  );
};
