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
    const isCategoryIncomeType = !!getCategoriesOptions(
      categoriesData,
      'Income'
    )?.find((category) => category.value === data[0]?.value);
    const isCategoryExpenseType = !!getCategoriesOptions(
      categoriesData,
      'Expense'
    )?.find((category) => category.value === data[0]?.value);
    const isPayerType = !!getPayersOptions(payersData)?.find(
      (payer) => payer.value === data[0]?.value
    );

    switch (true) {
      case isCategoryIncomeType:
        return 'categoryIncomeReport';

      case isCategoryExpenseType:
        return 'categoryExpenseReport';

      case isPayerType:
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
