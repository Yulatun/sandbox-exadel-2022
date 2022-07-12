import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { i18n } from './i18n'; //eslint-disable-line

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
