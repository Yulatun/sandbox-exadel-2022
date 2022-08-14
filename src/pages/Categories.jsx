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
          {isFetchedCategory ? dataArray?.map(createAccordion1) : <Preloader />}
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
