import i18next from 'i18next';

export const getDefaultWalletData = (userData, dataWallets) => {
  return {
    value: userData?.defaultWallet,
    label: (dataWallets || []).find(
      (wallet) => wallet.id === userData?.defaultWallet
    )?.name
  };
};

export const getDefaultCurrencyData = (userData, dataWallets) => {
  const defaultWallet = (dataWallets || []).find(
    (wallet) => wallet.id === userData?.defaultWallet
  );

  return {
    value: defaultWallet?.currency?.id,
    label: defaultWallet?.currency?.currencyCode
  };
};

export const getDefaultPayerData = (dataPayers) => {
  return {
    value: dataPayers[0],
    label: dataPayers[0]
  };
};

export const getWalletsCurrenciesData = (dataWallets) => {
  return (dataWallets || [])
    .filter(
      (wallet, index, allWallets) =>
        index ===
        allWallets.findIndex((t) => t.currency.id === wallet.currency.id)
    )
    .map((wallet) => ({
      value: wallet?.currency?.id,
      label: wallet?.currency?.currencyCode
    }));
};

export const getWalletCurrencyData = (chosenWallet, dataWallets) => {
  const chosenWalletData = (dataWallets || []).find(
    (wallet) => wallet.id === chosenWallet?.value
  );

  return chosenWalletData?.currency;
};

export const getChosenWalletData = (chosenTransaction, dataWallets) => {
  const chosenWalletData = (dataWallets || []).find(
    (wallet) => wallet.id === chosenTransaction.walletId
  );

  return {
    value: chosenWalletData?.id,
    label: chosenWalletData?.name
  };
};

export const getChosenCategoryData = (chosenTransaction, dataCategories) => {
  const chosenCategoryData = (dataCategories || []).find(
    (category) => category.id === chosenTransaction.categoryId
  );

  return {
    value: chosenCategoryData?.id,
    label: chosenCategoryData?.name
  };
};

export const getChosenSubcategoryData = (chosenTransaction, dataCategories) => {
  const chosenSubcategoryData = (dataCategories || [])
    .find((category) => category.id === chosenTransaction.categoryId)
    ?.subCategories?.find(
      (subcategory) => subcategory.id === chosenTransaction.subCategoryId
    );

  return {
    value: chosenSubcategoryData?.id,
    label: chosenSubcategoryData?.name
  };
};

export const getChosenPayerData = (chosenTransaction, dataPayers) => {
  const chosenPayerData = (dataPayers || []).find(
    (payer) => payer === chosenTransaction.payer
  );

  return {
    value: chosenPayerData,
    label: chosenPayerData
  };
};

export const getCurrenciesOptions = (dataCurrencies) => {
  return (dataCurrencies || []).map((currency) => ({
    value: currency.id,
    label: currency.currencyCode
  }));
};

export const getWalletsOptions = (dataWallets) => {
  return (dataWallets || []).map((wallet) => ({
    value: wallet.id,
    label: wallet.name
  }));
};

export const getAllWalletsSortedOptions = (userData) => {
  const sortedActiveWallets = ([...userData.wallets] || [])
    .filter((wallet) => wallet.isActive)
    .sort((a, b) => {
      if (b.id === userData.defaultWallet) return 1;

      if (
        a.id === userData.defaultWallet ||
        a.name.toLowerCase() < b.name.toLowerCase()
      ) {
        return -1;
      }

      return 1;
    })
    .map((wallet) => ({
      value: wallet.id,
      label: wallet.name
    }));

  const sortedInactiveWallets = ([...userData.wallets] || [])
    .filter((wallet) => !wallet.isActive)
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) {
        return -1;
      }

      return 1;
    })
    .map((wallet) => ({
      value: wallet.id,
      label: wallet.name
    }));

  return [...sortedActiveWallets, ...sortedInactiveWallets];
};

export const getCategoriesOptions = (dataCategories, typeOfTransaction) => {
  return ([...dataCategories] || [])
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 1;
    })
    .filter((category) => category.categoryType === typeOfTransaction)
    .map((category) => ({
      value: category.id,
      label: category.name
    }));
};

export const getSubcategoriesOptions = (dataCategories, chosenCategory) => {
  return ([...dataCategories] || [])
    .sort((a, b) => {
      if (a.name.toLowerCase() < b.name.toLowerCase()) return -1;
      return 1;
    })
    .find((category) => category.id === chosenCategory?.value)
    ?.subCategories?.map((subcategory) => ({
      value: subcategory.id,
      label: subcategory.name
    }));
};

export const getPayersOptions = (dataPayers) => {
  return ([...dataPayers] || [])
    .sort((a, b) => {
      if (b === dataPayers[0]) return 1;

      if (a === dataPayers[0] || a.toLowerCase() < b.toLowerCase()) return -1;

      return 1;
    })
    .map((payer) => ({
      value: payer,
      label: payer
    }));
};

export const getSelectFieldsData = (nameOfSelect) => {
  let label = null;
  let placeholderData = null;
  let required = null;
  let newDataQuestion = null;
  let addNewData = null;

  switch (nameOfSelect) {
    case 'dateReport':
      label = i18next.t('report.filters.date.label');
      break;

    case 'wallet':
      label = i18next.t('modal.addIncome.wallet');
      placeholderData = i18next.t('modal.addIncome.wallet.placeholder');
      break;

    case 'walletReport':
      label = i18next.t('report.filters.wallet.label');
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

    case 'categoryIncomeReport':
      label = i18next.t('report.filters.categoryIncome.label');
      break;

    case 'categoryExpenseReport':
      label = i18next.t('report.filters.categoryExpense.label');
      break;

    case 'subcategory':
      label = i18next.t('modal.addExpense.subcategory');
      placeholderData = i18next.t('modal.addExpense.subcategory.placeholder');
      newDataQuestion = i18next.t(
        'modal.addTransaction.addSubcategoryQuestion'
      );
      addNewData = i18next.t('modal.addTransaction.addSubcategory');
      break;

    case 'payer':
      label = i18next.t('modal.addExpense.payer');
      placeholderData = i18next.t('modal.addExpense.payer.placeholder');
      newDataQuestion = i18next.t('modal.addExpense.addPayerQuestion');
      addNewData = i18next.t('modal.addExpense.addPayer');
      break;

    case 'payerReport':
      label = i18next.t('report.filters.payer.label');
      break;

    case 'isRecurring':
      label = i18next.t('modal.addIncome.isRecurring');
      break;

    default:
      return nameOfSelect;
  }

  return { label, placeholderData, required, newDataQuestion, addNewData };
};
