import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages';
import { ErrorBoundary } from './components';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import './i18n';

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
