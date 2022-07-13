import React from 'react';
import ReactDOM from 'react-dom/client';
import { App } from './pages';
import './index.css';
import { ChakraProvider } from '@chakra-ui/react';
import { ColorModeScript } from './theme/colorModeButton';
import theme from './theme/theme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ChakraProvider theme={theme}>
      <ColorModeScript initialColorMode={theme.config.initialColorMode} />
      <App />
    </ChakraProvider>
  </React.StrictMode>
);
