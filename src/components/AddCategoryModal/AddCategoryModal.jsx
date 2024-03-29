import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
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

import { createCategory, getCategories } from '@/api/Category';
import { ConfirmationModal } from '@/components';

export const AddCategoryModal = ({ isOpen, onClose, categoryType }) => {
  const categoriesDeleteModal = useDisclosure();
  const queryClient = useQueryClient();

  const [colorIncome, setColorIncome] = useState('green.500');
  const [colorExpense, setColorExpense] = useState('red.500');

  const { toast } = createStandaloneToast();

  const {
    register,
    handleSubmit,
    reset,
    formState: {
      isDirty,
      errors: { name }
    }
  } = useForm({ defaultValues: { name: '' } });

  const handleColorChange = (color) => {
    categoryType === 'Income' ? setColorIncome(color) : setColorExpense(color);
  };

  const defaultColor = categoryType === 'Income' ? colorIncome : colorExpense;

  const mutationCreateCategory = useMutation(
    (data) =>
      createCategory({
        name: data.name,
        limit: 0,
        limitPeriod: 'Daily',
        categoryType: categoryType,
        color: defaultColor
      }).catch((err) =>
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
      ),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        toast({
          title: i18next.t('modal.addCategory.submitSuccessful.message'),
          status: 'success',
          duration: 3000,
          isClosable: true,
          position: 'top',
          containerStyle: {
            margin: '100px'
          }
        });
      }
    }
  );

  const createCategoryOnSubmit = (data) => {
    mutationCreateCategory.mutate(data);
    onClose();
    reset();
  };

  const closeAllModals = () => {
    categoriesDeleteModal.onClose();
    onClose();
  };

  const { data, isFetched } = useQuery(['categories'], getCategories);

  const onCancel = () => {
    isDirty ? categoriesDeleteModal.onOpen() : onClose();
  };

  const resetForm = () => {
    reset({ name: '' });
  };

  useEffect(() => resetForm(), [!isOpen]);

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onCancel}
        bg="red"
        closeOnOverlayClick={false}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {categoryType === 'Income'
              ? i18next.t('modal.addCategory.header.incomeCategory')
              : i18next.t('modal.addCategory.header.expensesCategory')}
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
                        (isFetched &&
                          !data.data
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
                  borderRadius="50px"
                  onChange={handleColorChange}
                  size="sm"
                  defaultColor={
                    categoryType === 'Income' ? colorIncome : colorExpense
                  }
                />
              </Flex>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={handleSubmit(createCategoryOnSubmit)}>
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
        text={i18next.t('modal.deleteCategory.text')}
      />
    </>
  );
};
