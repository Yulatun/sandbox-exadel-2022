import axios from 'axios';
import i18next from 'i18next';

const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000
});

const responseSuccessInterceptor = (response) => {
  return response;
};

const networkErrorInterceptor = (error) => {
  switch (error) {
    case 401:
      console.log('Unauthorized');
      break;
    case 403:
      console.log('Forbidden');
      break;
    case 404:
      console.log('Not Found');
      break;
    case 500:
      console.log('Internal Server Error');
      break;
    case 502:
      console.log('Bad Gateway');
      break;
    default:
      console.log('Error');
      break;
  }
};

instance.interceptors.response.use(
  responseSuccessInterceptor,
  networkErrorInterceptor
);

const createWallet = async (data) => {
  const response = instance
    .post('/api/Wallet', {
      name: data.name,
      currency: {
        currencyCode: data.currency
      }
    })
    .then(() => alert(i18next.t('wallet.createdMessage')));

  return response;
};

export { createWallet };
