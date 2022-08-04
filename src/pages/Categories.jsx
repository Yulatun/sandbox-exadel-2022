import { Button, Flex, Grid, GridItem, useDisclosure } from '@chakra-ui/react';
import i18next from 'i18next';

import {
  AccordionComponent,
  AccordionHeadings,
  AddCategoryModal
} from '@/components';

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
        <GridItem className="incomeCol" onClick={incomeCategoriesModal.onOpen}>
          <AccordionHeadings
            headingOne={i18next.t('income.categoryHeading')}
            headingTwo={i18next.t('income.addCategoryHeading')}
          />
          {AccordionArray.map(createAccordion)}
        </GridItem>
      </Grid>
      <Flex>
        <Button onClick={incomeCategoriesModal.onOpen}>
          {' '}
          add Income Category
        </Button>
        <Button onClick={expensesCategoriesModal.onOpen}>
          {' '}
          add Expenses Category
        </Button>
        <AddCategoryModal
          isOpen={incomeCategoriesModal.isOpen}
          onSubmit={incomeCategoriesModal.onClose}
          onClose={incomeCategoriesModal.onClose}
          categoryType="income"
        />
        <AddCategoryModal
          isOpen={expensesCategoriesModal.isOpen}
          onSubmit={expensesCategoriesModal.onClose}
          onClose={expensesCategoriesModal.onClose}
          categoryType="expenses"
        />
      </Flex>
    </>
  );
};
