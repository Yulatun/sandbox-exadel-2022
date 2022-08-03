import { createStandaloneToast } from '@chakra-ui/toast';
import axios from 'axios';

export const { toast } = createStandaloneToast();

export const instance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  timeout: 1000
});

const responseSuccessInterceptor = (response) => {
  return response;
};

const networkErrorInterceptor = (error) => {
  switch (error.response.status) {
    case 401:
      toast({
        title: 'Unauthorized',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 403:
      toast({
        title: 'Forbidden',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 404:
      toast({
        title: 'Not Found',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 500:
      toast({
        title: 'Internal Server Error',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    case 502:
      toast({
        title: 'Bad Gateway',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
    default:
      toast({
        title: 'Error',
        status: 'error',
        duration: 9000,
        isClosable: true
      });
      break;
  }
  return Promise.reject(error);
};

instance.interceptors.response.use(
  responseSuccessInterceptor,
  networkErrorInterceptor
);
