import i18next from 'i18next';

export const getDefaultWalletData = (userData, dataWallets) => {
  return {
    value: userData?.defaultWallet,
    label: (dataWallets || []).find(
      (wallet) => wallet.id === userData?.defaultWallet
    )?.name
  };
};

export const getWalletsOptions = (dataWallets) => {
  return (dataWallets || []).map((wallet) => ({
    value: wallet.id,
    label: wallet.name
  }));
};

export const getCategoriesOptions = (dataCategories) => {
  return (dataCategories || []).map((category) => ({
    value: category.id,
    label: category.name
  }));
};

export const getSelectFieldsData = (nameOfSelect) => {
  let label = null;
  let placeholderData = null;
  let required = null;
  let newDataQuestion = null;
  let addNewData = null;

  switch (nameOfSelect) {
    case 'wallet':
      label = i18next.t('modal.addIncome.wallet');
      placeholderData = i18next.t('modal.addIncome.wallet.placeholder');
      break;

    case 'currency':
      label = i18next.t('modal.addWallet.currency');
      placeholderData = i18next.t('modal.addWallet.currency.placeholder');
      required = i18next.t('modal.addWallet.validationErrorMessage.currency');
      break;

    case 'category':
      label = i18next.t('modal.addIncome.category');
      placeholderData = i18next.t('modal.addIncome.category.placeholder');
      required = i18next.t('modal.addIncome.validationErrorMessage.category');
      newDataQuestion = i18next.t('modal.addTransaction.addCategoryQuestion');
      addNewData = i18next.t('modal.addTransaction.addCategory');
      break;

    case 'payer':
      label = i18next.t('modal.addExpense.payer');
      placeholderData = i18next.t('modal.addExpense.payer.placeholder');
      newDataQuestion = i18next.t('modal.addExpense.addPayerQuestion');
      addNewData = i18next.t('modal.addExpense.addPayer');
      break;

    case 'subcategory':
      placeholderData = i18next.t('modal.addExpense.subcategory.placeholder');
      break;

    case 'isRecurring':
      label = i18next.t('modal.addIncome.isRecurring');
      break;

    default:
      return nameOfSelect;
  }

  return { label, placeholderData, required, newDataQuestion, addNewData };
};
