import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';

import { ErrorBoundary } from '@/components';

import './i18n';
import 'focus-visible/dist/focus-visible';

import { App } from './pages';
import { GlobalStyles, theme } from './theme';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
