import { Grid, GridItem } from '@chakra-ui/react';
import i18next from 'i18next';

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
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="100vh" mt={8}>
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
      </Grid>
    </>
  );
};
