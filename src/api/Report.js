import { instance } from './ApiProvider';

export const getReport = async (params) => {
  const {
    WalletId,
    DateFrom,
    DateTo,
    IncomeCategoryIds = [],
    ExpenseCategoryIds = [],
    Payers = []
  } = params.queryKey[1];
  let paramsString = '';

  if (IncomeCategoryIds.length) {
    paramsString += `${
      IncomeCategoryIds.length ? '?' : ''
    }IncomeCategoryIds=${IncomeCategoryIds.join('&IncomeCategoryIds=')}`;
  }

  if (ExpenseCategoryIds.length) {
    paramsString += `${
      IncomeCategoryIds.length ? '&' : '?'
    }ExpenseCategoryIds=${ExpenseCategoryIds.join('&ExpenseCategoryIds=')}`;
  }

  if (ExpenseCategoryIds.length && Payers.length) {
    paramsString += `&Payers=${Payers.join('&Payers=')}`;
  }

  return instance.get(`/api/v1/Report${paramsString}`, {
    params: {
      WalletId: WalletId,
      DateFrom: DateFrom,
      DateTo: DateTo
    }
  });
};
