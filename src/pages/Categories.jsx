import { Grid, GridItem } from '@chakra-ui/react';

import { AccordionComponent, AccordionHeadings } from '@/components';

export const Categories = () => {
  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)">
        <GridItem className="expenseCol">
          <AccordionHeadings
            headingOne="Categories of Expenses "
            headingTwo="Add expense Category"
          />
          <AccordionComponent name="Category 1" message="I am random message" />
          <AccordionComponent name="Category 1" message="I am random message" />
        </GridItem>
        <GridItem className="incomeCol">
          <AccordionHeadings
            headingOne="Categories of Incomes"
            headingTwo="Add income Category"
          />
          <AccordionComponent
            name="Category 1"
            message="I am also random message"
          />
        </GridItem>
      </Grid>
    </>
  );
};
