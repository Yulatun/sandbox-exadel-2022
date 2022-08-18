import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Skeleton,
  useDisclosure,
  useToast
} from '@chakra-ui/react';
import i18next from 'i18next';

import { deleteCategory, editCategory, getCategories } from '@/api/Category';
import {
  AccordionComponent,
  AccordionHeadings,
  AddCategoryModal,
  EditCategoryModal
} from '@/components';
import {} from '@/components';
import { ConfirmationModal } from '@/components';
import { useCentralTheme } from '@/theme';

export const Categories = () => {
  const [chosenCategoryData, setChosenCategoryData] = useState({});
  const toast = useToast();
  const { bgColor, sectionBgColor } = useCentralTheme();

  const expensesCategoriesModal = useDisclosure();
  const incomeCategoriesModal = useDisclosure();
  const editCategoryModal = useDisclosure();
  const deleteCategoryModal = useDisclosure();
  const queryClient = useQueryClient();

  getCategories;
  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

  const editingCategory = useMutation(
    (data) => editCategory(data).catch((error) => console.log(error)),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['categories']);
        toast({
          title: i18next.t('modal.editCategory.editedMessage.success'),
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

  const deletingCategory = useMutation(
    (data) => deleteCategory(data).catch((error) => console.log(error)),
    {
      onSuccess: ({ status, data }) => {
        if (status === 200) {
          queryClient.invalidateQueries(['categories']);
          toast({
            title: i18next.t('modal.deleteCategory.deleteMessage.success'),
            status: 'success',
            duration: 3000,
            isClosable: true,
            position: 'top',
            containerStyle: {
              margin: '100px'
            }
          });
        } else if (status === 400) {
          const { message } = data;
          if (message) {
            toast({
              title: message,
              status: 'error',
              duration: 3000,
              isClosable: true,
              position: 'top',
              containerStyle: {
                margin: '100px'
              }
            });
          }
        }
      }
    }
  );

  const openOnEdit = (dataCategory) => {
    setChosenCategoryData(dataCategory);
    editCategoryModal.onOpen();
  };

  const saveOnEdit = (data) => {
    editingCategory.mutate(data);
    editCategoryModal.onClose();
  };

  const resetOnClose = () => {
    setChosenCategoryData({});
    editCategoryModal.onClose();
  };

  const openOnDelete = (dataCategory) => {
    setChosenCategoryData(dataCategory);
    deleteCategoryModal.onOpen();
  };

  const deleteOnSubmit = (data) => {
    setChosenCategoryData({});
    deleteCategoryModal.onClose();
    deletingCategory.mutate(data);
  };

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" mt={8}>
        <GridItem className="expenseCol">
          <AccordionHeadings
            headingOne={i18next.t('expenses.categoryHeading')}
            headingTwo={i18next.t('expenses.addCategoryHeading')}
            action={expensesCategoriesModal.onOpen}
          />
          <Box h="580px" overflowY="auto">
            {(!!dataCategories &&
              !!dataCategories.data &&
              isFetchedCategories &&
              dataCategories.data
                .filter((category) => category.categoryType === 'Expense')
                .map((categoryData) => (
                  <AccordionComponent
                    key={categoryData.id}
                    categoryData={categoryData}
                    name={categoryData.name}
                    color={categoryData.color}
                    onEdit={() => openOnEdit(categoryData)}
                    onDelete={() => openOnDelete(categoryData)}
                  />
                ))) || (
              <Skeleton
                height="56px"
                mr="16px"
                borderRadius="8px"
                startColor={bgColor}
                endColor={sectionBgColor}
              />
            )}
          </Box>
        </GridItem>
        <GridItem className="incomeCol">
          <AccordionHeadings
            headingOne={i18next.t('income.categoryHeading')}
            headingTwo={i18next.t('income.addCategoryHeading')}
            action={incomeCategoriesModal.onOpen}
          />
          <Box h="580px" overflowY="auto" mb={8}>
            {(!!dataCategories &&
              !!dataCategories.data &&
              isFetchedCategories &&
              dataCategories.data
                .filter((category) => category.categoryType === 'Income')
                .map((categoryData) => (
                  <AccordionComponent
                    key={categoryData.id}
                    categoryData={categoryData}
                    name={categoryData.name}
                    color={categoryData.color}
                    onEdit={() => openOnEdit(categoryData)}
                    onDelete={() => openOnDelete(categoryData)}
                  />
                ))) || (
              <Skeleton
                height="56px"
                ml="16px"
                borderRadius="8px"
                startColor={bgColor}
                endColor={sectionBgColor}
              />
            )}
          </Box>
        </GridItem>
      </Grid>
      <Flex>
        {!!Object.keys(chosenCategoryData).length && (
          <EditCategoryModal
            isOpen={editCategoryModal.isOpen}
            onSubmit={saveOnEdit}
            onClose={resetOnClose}
            categoryType={chosenCategoryData.categoryType}
            categoryData={chosenCategoryData}
          />
        )}
        <AddCategoryModal
          isOpen={expensesCategoriesModal.isOpen}
          onSubmit={expensesCategoriesModal.onClose}
          onClose={expensesCategoriesModal.onClose}
          categoryType="Expense"
        />
        <AddCategoryModal
          isOpen={incomeCategoriesModal.isOpen}
          onSubmit={incomeCategoriesModal.onClose}
          onClose={incomeCategoriesModal.onClose}
          categoryType="Income"
        />
        {!!Object.keys(chosenCategoryData).length && (
          <ConfirmationModal
            isOpen={deleteCategoryModal.isOpen}
            onSubmit={() => {
              deleteOnSubmit(chosenCategoryData);
            }}
            onClose={deleteCategoryModal.onClose}
            title={i18next.t(
              `modal.delete${chosenCategoryData.categoryType}.title`
            )}
            text={i18next.t(
              `modal.delete${chosenCategoryData.categoryType}.text`
            )}
          />
        )}
      </Flex>
    </>
  );
};
