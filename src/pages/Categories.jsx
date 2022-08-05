import { Button, Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import { AddCategoryModal } from '@/components';
import { AccordionComponent, AccordionHeadings } from '@/components';

import { AccordionArray } from '../components/AccordionComponent/AccordionArray';

function createAccordion(accordionContent) {
  return (
    <AccordionComponent
      key={accordionContent.id}
      title={accordionContent.title}
      content={accordionContent.content}
    />
  );
}

export const Categories = () => {
  const expensesCategoriesModal = useDisclosure();
  const incomeCategoriesModal = useDisclosure();
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="100vh">
        <GridItem className="expenseCol">
          <AccordionHeadings
            headingOne={i18next.t('expenses.categoryHeading')}
            headingTwo={i18next.t('expenses.addCategoryHeading')}
          />
          {AccordionArray.map(createAccordion)}
        </GridItem>
        <GridItem className="incomeCol">
          <AccordionHeadings
            headingOne={i18next.t('income.categoryHeading')}
            headingTwo={i18next.t('income.addCategoryHeading')}
          />
          {AccordionArray.map(createAccordion)}
        </GridItem>

        <Button onClick={expensesCategoriesModal.onOpen}>
          add Expenses Category
        </Button>
        <Button onClick={incomeCategoriesModal.onOpen}>
          add Income Category
        </Button>
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
