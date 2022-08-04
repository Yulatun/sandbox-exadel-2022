import { Grid, GridItem } from '@chakra-ui/react';

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
      <Grid templateColumns="repeat(2, 1fr)" height="100vh">
        <GridItem className="expenseCol">
          <AccordionHeadings
            headingOne="Categories of Expenses "
            headingTwo="Add expense Category"
          />
          {AccordionArray.map(createAccordion)}
        </GridItem>
        <GridItem className="incomeCol">
          <AccordionHeadings
            headingOne="Categories of Incomes"
            headingTwo="Add income Category"
          />
          {AccordionArray.map(createAccordion)}
        </GridItem>
      </Grid>
    </>
  );
};
