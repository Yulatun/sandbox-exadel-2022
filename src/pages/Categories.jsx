import { useEffect } from 'react';
import { useQuery } from 'react-query';
import { AddIcon } from '@chakra-ui/icons';
import {
  Box,
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

function createAccordion(accordionContent) {
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

  const expenseCol = dataArray
    ?.filter((x) => {
      return x?.categoryType === 'Expense';
    })
    ?.map(createAccordion);

  const incomeCol = dataArray
    ?.filter((x) => {
      return x?.categoryType === 'Income';
    })
    ?.map(createAccordion);

  return (
    <>
      <Grid templateColumns="repeat(2, 1fr)" height="80vh" mt={8}>
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
          <Box
            height="300px"
            overflowY="scroll"
            sx={{
              '::-webkit-scrollbar-track': {
                background: 'orange.400',
                borderRadius: '3px'
              },
              '::-webkit-scrollbar-thumb': {
                background: 'teal.700',
                borderRadius: '3px'
              },
              '::-webkit-scrollbar': {
                width: '3px'
              }
            }}
          >
            {isFetchedCategory ? expenseCol : <Preloader />}
          </Box>
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
          <Box
            height="300px"
            overflowY="scroll"
            sx={{
              '::-webkit-scrollbar-track': {
                background: 'orange.400',
                borderRadius: '3px'
              },
              '::-webkit-scrollbar-thumb': {
                background: 'teal.700',
                borderRadius: '3px'
              },
              '::-webkit-scrollbar': {
                width: '3px'
              }
            }}
          >
            {isFetchedCategory ? incomeCol : <Preloader />}
          </Box>
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
