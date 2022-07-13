import { BrowserRouter } from 'react-router-dom';

import Header from '../components';
import AppRouter from '../components/AppRouter/AppRouter';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <AppRouter />
    </BrowserRouter>
  );
};
