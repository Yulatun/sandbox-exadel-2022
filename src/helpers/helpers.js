export const getTransactionsList = (
  dataWallets,
  dataTransactionsA = [],
  dataTransactionsB = []
) => {
  return [...dataTransactionsA, ...dataTransactionsB].map((transaction) => {
    const wallet = dataWallets.find(
      (wallet) => wallet.id === transaction.walletId
    );

    return { ...transaction, currency: wallet?.currency };
  });
};

export const areAnyWallets = (dataWallets) =>
  dataWallets.length ? true : false;

export const getChosenWalletFullData = (chosenWalletId, dataWallets) => {
  return dataWallets.find((wallet) => wallet.id === chosenWalletId);
};
