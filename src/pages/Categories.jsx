import { AddIcon } from '@chakra-ui/icons';
import {
  Flex,
  Grid,
  GridItem,
  IconButton,
  useDisclosure
} from '@chakra-ui/react';
import i18next from 'i18next';

import {
  AccordionComponent,
  AccordionHeadings,
  AddCategoryModal
} from '@/components';
import { useCentralTheme } from '@/theme';

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
  const { textColor, popupBgColor } = useCentralTheme();

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="100vh" mt={8}>
        <GridItem className="expenseCol">
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
          {AccordionArray.map(createAccordion)}
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
          {AccordionArray.map(createAccordion)}
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
