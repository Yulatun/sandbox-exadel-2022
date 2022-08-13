import { useState } from 'react';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { editCategory, getCategories } from '@/api/Category';
import {
  AccordionComponent,
  AccordionHeadings,
  AddCategoryModal,
  EditCategoryModal
} from '@/components';
import {} from '@/components';

export const Categories = () => {
  const [chosenCategoryData, setChosenCategoryData] = useState({});

  const expensesCategoriesModal = useDisclosure();
  const incomeCategoriesModal = useDisclosure();
  const editCategoryModal = useDisclosure();
  const queryClient = useQueryClient();

  getCategories;
  const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
    ['categories'],
    getCategories
  );

  const editingCategory = useMutation((data) => {
    return (
      editCategory(data)
        .then(() =>
          alert(i18next.t('modal.editCategory.editedMessage.success'))
        )

        .catch((error) => console.log(error)),
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['categories']);
        }
      }
    );
  });

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

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="100vh" mt={8}>
        <GridItem className="expenseCol">
          <AccordionHeadings
            headingOne={i18next.t('expenses.categoryHeading')}
            headingTwo={i18next.t('expenses.addCategoryHeading')}
            action={expensesCategoriesModal.onOpen}
          />
          {!!dataCategories &&
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
                />
              ))}
        </GridItem>
        <GridItem className="incomeCol">
          <AccordionHeadings
            headingOne={i18next.t('income.categoryHeading')}
            headingTwo={i18next.t('income.addCategoryHeading')}
            action={incomeCategoriesModal.onOpen}
          />
          {!!dataCategories &&
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
                />
              ))}
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
      </Flex>
    </>
  );
};
