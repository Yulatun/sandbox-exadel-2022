import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import { getCategories } from '@/api/Category';
import { Preloader } from '@/components';
import {
  AccordionComponent,
  AccordionHeadings,
  AddCategoryModal
} from '@/components';
import { useCentralTheme } from '@/theme';

function createAccordion1(accordionContent) {
  let subCategories = accordionContent.subCategories[0]?.name;
  return (
    <AccordionComponent
      key={accordionContent.id}
      title={accordionContent.name}
      content={subCategories}
    />
  );
}

export const Categories = () => {
  const expensesCategoriesModal = useDisclosure();
  const incomeCategoriesModal = useDisclosure();
  const { textColor, popupBgColor } = useCentralTheme();

  const { data: categoryData, isFetched: isFetchedCategory } = useQuery(
    ['category'],
    getCategories
  );
  let dataArray = categoryData?.data;
  useEffect(() => {
    console.log('catData:', categoryData?.data);
  }, [categoryData]);

  for (let i = 0; i < dataArray?.length; i++) {
    var expenses = dataArray[i].categoryType === 'Expense';
    if (isFetchedCategory && expenses) {
      var expenseCol = dataArray
        .filter((x) => {
          return x?.categoryType === 'Expense';
        })
        .map(createAccordion1);
    }
  }

  for (let i = 0; i < dataArray?.length; i++) {
    var incomes = dataArray[i].categoryType === 'Income';
    if (isFetchedCategory && incomes) {
      var incomeCol = dataArray
        .filter((x) => {
          return x?.categoryType === 'Income';
        })
        .map(createAccordion1);
    }
  }

  console.log(expenses);

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="100vh" mt={8}>
        <GridItem className="expenseCol" height="10px" overflow="visible">
          <AccordionHeadings
            headingOne={i18next.t('expenses.categoryHeading')}
            headingTwo={i18next.t('expenses.addCategoryHeading')}
            button={
              <IconButton
                onClick={expensesCategoriesModal.onOpen}
                icon={<AddIcon />}
                backgroundColor={popupBgColor}
                color={textColor}
                boxShadow="base"
                borderRadius="50%"
                _hover={{
                  boxShadow: 'base',
                  border: '2px',
                  borderColor: textColor
                }}
              ></IconButton>
            }
          />
          {isFetchedCategory ? expenseCol : <Preloader />}
        </GridItem>
        <GridItem className="incomeCol">
          <AccordionHeadings
            headingOne={i18next.t('income.categoryHeading')}
            headingTwo={i18next.t('income.addCategoryHeading')}
            button={
              <IconButton
                onClick={incomeCategoriesModal.onOpen}
                icon={<AddIcon />}
                backgroundColor={popupBgColor}
                color={textColor}
                boxShadow="base"
                borderRadius="50%"
                _hover={{
                  boxShadow: 'base',
                  border: '2px',
                  borderColor: textColor
                }}
              ></IconButton>
            }
          />
          {isFetchedCategory ? incomeCol : <Preloader />}
        </GridItem>
      </Grid>
      <Flex>
        <AddCategoryModal
          isOpen={incomeCategoriesModal.isOpen}
          onSubmit={incomeCategoriesModal.onClose}
          onClose={incomeCategoriesModal.onClose}
          categoryType="Income"
        />
        <AddCategoryModal
          isOpen={expensesCategoriesModal.isOpen}
          onSubmit={expensesCategoriesModal.onClose}
          onClose={expensesCategoriesModal.onClose}
          categoryType="Expense"
        />
      </Flex>
    </>
  );
};
