import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeToggle } from './theme';
import theme from './theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeToggle initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
