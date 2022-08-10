import { createStandaloneToast } from '@chakra-ui/toast';
import axios from 'axios';

import { logout } from '@/helpers/authorization';
import { LOCAL_STORAGE_API_KEY } from '@/helpers/constants';
import { i18n } from '@/i18n';

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  validateStatus: () => true
});

const { toast } = createStandaloneToast();
const responseSuccessInterceptor = (response) => {
  return catchErrors(response);
};
const catchErrors = (request) => {
  switch (request.status) {
    case 401:
      logout();
      toast({
        title: i18n.t('toast.error.unauthorized'),
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 403:
      toast({
        title: i18n.t('toast.error.forbidden'),
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 404:
      toast({
        title: i18n.t('toast.error.notFound'),
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 500:
      toast({
        title: i18n.t('toast.error.internalServerError'),
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 502:
      toast({
        title: i18n.t('toast.error.badGateway'),
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    default:
      return request;
  }

  return Promise.reject(request);
};

const networkErrorInterceptor = (error) => {
  return catchErrors(error);
};

instance.interceptors.response.use(
  responseSuccessInterceptor,
  networkErrorInterceptor
);
instance.interceptors.request.use((request) => {
  const token = localStorage.getItem(LOCAL_STORAGE_API_KEY);
  if (token) {
    request.headers['Authorization'] = `Bearer ${token}`;
  }
  return request;
}, networkErrorInterceptor);
