export const getTransactionsList = (
  dataWallets,
  dataTransactionsA = [],
  dataTransactionsB = []
) => {
  return [...dataTransactionsA, ...dataTransactionsB]
    .sort(
      (a, b) => new Date(a.dateOfTransaction) - new Date(b.dateOfTransaction)
    )
    .map((transaction) => {
      const wallet = dataWallets.find(
        (wallet) => wallet.id === transaction.walletId
      );

      return { ...transaction, currency: wallet?.currency };
    });
};
