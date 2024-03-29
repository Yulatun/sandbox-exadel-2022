import { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
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

import { getCategories } from '@/api/Category';
import { ConfirmationModal } from '@/components';

export const EditCategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  categoryType,
  categoryData
}) => {
  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

  const confirmationModal = useDisclosure();

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
      categoryType: categoryData.categoryType,
      categoryId: categoryData.id,
      name: categoryData.name,
      color: categoryData.color
    }
  });

  const closeAllModals = () => {
    confirmationModal.onClose();
    onClose();
  };

  const onCancel = () => {
    isDirty ? confirmationModal.onOpen() : onClose();
  };

  const resetForm = () => {
    reset({
      categoryType: categoryData.categoryType,
      categoryId: categoryData.id,
      name: categoryData.name,
      color: categoryData.color
    });
  };
  useEffect(() => resetForm(), [!isOpen]);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onCancel} closeOnOverlayClick={false}>
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
                        (isFetchedCategories &&
                          !dataCategories.data
                            .filter(
                              (data) => data.categoryType === categoryType
                            )
                            .filter((data) => data.id !== categoryData.id)
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
            <Button mr={3} disabled={!isDirty} onClick={handleSubmit(onSubmit)}>
              {i18next.t('modal.addCategory.saveButton')}
            </Button>
            <Button variant="secondary" onClick={onCancel}>
              {i18next.t('modal.addCategory.cancelButton')}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
      <ConfirmationModal
        isOpen={confirmationModal.isOpen}
        onClose={confirmationModal.onClose}
        onSubmit={closeAllModals}
        text={i18next.t('modal.deleteCategory.text')}
      />
    </>
  );
};
