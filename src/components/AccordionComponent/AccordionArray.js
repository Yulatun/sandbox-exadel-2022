import i18next from 'i18next';
// This array might need to be renamed "ExpenseCategory" and updated dynamically as users add new category.
// Another array file with similar feature might need to be created for "IncomeCategory"
export const AccordionArray = [
  {
    id: 1,
    title: i18next.t('category.category'),
    content: i18next.t('category.randomMessage')
  },
  {
    id: 2,
    title: i18next.t('category.category'),
    content: i18next.t('category.randomMessage')
  },
  {
    id: 3,
    title: i18next.t('category.category'),
    content: i18next.t('category.randomMessage')
  }
];
