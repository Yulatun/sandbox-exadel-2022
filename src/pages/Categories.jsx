import { useState } from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { editCategory } from '@/api/Category';
import {
  AccordionComponent,
  AccordionHeadings,
  AddCategoryModal
} from '@/components';

import { EditCategoryModal } from '../components/EditCategoryModal';

export const Categories = () => {
  const [chosenCategoryData, setChosenCategoryData] = useState({});

  const [expenseCategories, setExpenseCategories] = useState([]);
  const [incomeCategories, setIncomeCategories] = useState([]);

  console.log(setExpenseCategories());
  console.log(setIncomeCategories());
  const expensesCategoriesModal = useDisclosure();
  const incomeCategoriesModal = useDisclosure();
  const editCategoryModal = useDisclosure();

  const queryClient = useQueryClient();

  // const { data: dataCategories, isFetched: isFetchedCategories } = useQuery(
  //   ['categories'],
  //   getCategories,
  //   {
  //     onSuccess: (response) => {
  //       const { data } = response;
  //       const expenseCategories = [];
  //       const incomeCategories = [];
  //       data.forEach((item) => {
  //         const { categoryType } = item;
  //         if (categoryType === 'Income') {
  //           incomeCategories.push(item);
  //         } else {
  //           expenseCategories.push(item);
  //         }
  //         setExpenseCategories(expenseCategories);
  //         setIncomeCategories(incomeCategories);
  //       });
  //     }
  //   }
  // );

  const editingCategory = useMutation(
    (data) =>
      editCategory({
        ...chosenCategoryData,
        categoryId: data.id,
        name: data.name,
        color: data.color
      })
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
          {expenseCategories.map((categoryData) => (
            <AccordionComponent
              key={categoryData.id}
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
          {incomeCategories.map((categoryData) => (
            <AccordionComponent
              key={categoryData.id}
              name={categoryData.name}
              color={categoryData.color}
              onEdit={() => openOnEdit(categoryData)}
            />
          ))}
        </GridItem>
      </Grid>
      {!!Object.keys(chosenCategoryData).length && (
        <EditCategoryModal
          isOpen={editCategoryModal.isOpen}
          onSubmit={saveOnEdit}
          onClose={() => {
            if (confirm(i18next.t('modal.editExpense.editedMessage.cancel'))) {
              resetOnClose();
            }
          }}
          categoryData={chosenCategoryData}
        />
      )}
      <Flex>
        <EditCategoryModal
          isOpen={editCategoryModal.isOpen}
          onSubmit={editCategoryModal.onClose}
          onClose={editCategoryModal.onClose}
          categoryType="Expense"
        />
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
