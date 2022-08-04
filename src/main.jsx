import { lazy, StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { ChakraProvider } from '@chakra-ui/react';
import { Global } from '@emotion/react';

import './i18n';
import 'focus-visible/dist/focus-visible';

import { ErrorBoundary, Preloader } from './components';
import { GlobalStyles, theme } from './theme';

import './index.css';

const App = lazy(() => import('./pages/App'));

ReactDOM.createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChakraProvider theme={theme}>
      <Global styles={GlobalStyles} />
      <ErrorBoundary>
        <Suspense fallback={<Preloader />}>
          <App />
        </Suspense>
      </ErrorBoundary>
    </ChakraProvider>
  </StrictMode>
);
