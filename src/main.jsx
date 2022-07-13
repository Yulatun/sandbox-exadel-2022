import React from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';

import './i18n';

import { ErrorBoundary } from './components';
import { App } from './pages';
import { ColorModeToggle } from './theme';
import theme from './theme';

import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ErrorBoundary>
        <ColorModeToggle initialColorMode={theme.config.initialColorMode} />
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
