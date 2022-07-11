import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages';
import ErrorBoundary from './Components/ErrorBoundary/ErrorBoundary';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </ChakraProvider>
  </React.StrictMode>
);
