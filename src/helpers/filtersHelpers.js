import { getCategoriesOptions, getPayersOptions } from './selectHelpers';

export const isAllSelectedChosen = (data) => {
  return !!data?.filter(
    (dataElement) =>
      dataElement.value == 'all-categories-incomes' ||
      dataElement.value == 'all-categories-expenses' ||
      dataElement.value == 'all-payers'
  ).length;
};

export const getTypeOfOptions = ({ data, categoriesData, payersData }) => {
  if (data) {
    if (
      getCategoriesOptions(categoriesData, 'Income')?.find(
        (category) => category.value === data[0]?.value
      )
    ) {
      return 'categoryIncomeReport';
    }

    if (
      getCategoriesOptions(categoriesData, 'Expense')?.find(
        (category) => category.value === data[0]?.value
      )
    ) {
      return 'categoryExpenseReport';
    }
    if (
      getPayersOptions(payersData)?.find(
        (payer) => payer.value === data[0]?.value
      )
    ) {
      return 'payerReport';
    }
  }
};

export const areAllOptionsSelected = ({ data, categoriesData, payersData }) => {
  const qtyOfChosenOptions = data.length;
  let totalQtyOfOptions = 0;

  switch (getTypeOfOptions({ data, categoriesData, payersData })) {
    case 'categoryIncomeReport':
      totalQtyOfOptions = getCategoriesOptions(categoriesData, 'Income').length;
      break;

    case 'categoryExpenseReport':
      totalQtyOfOptions = getCategoriesOptions(
        categoriesData,
        'Expense'
      ).length;
      break;

    case 'payerReport':
      totalQtyOfOptions = getPayersOptions(payersData).length;
      break;
  }

  return totalQtyOfOptions === qtyOfChosenOptions;
};
