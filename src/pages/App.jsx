import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/Layout';

import { Categories } from './Categories';
import { Expenses } from './Expenses';
import { Fallback } from './Fallback';
import { Incomes } from './Incomes';
import { Landing } from './Landing';
import { Login } from './Login';
import { WalletView } from './WalletView';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} index />
        <Route element={<AppLayout />}>
          <Route path="/" element={<Landing />} />
          <Route path="/incomes" element={<Incomes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/wallet/:id" element={<WalletView />} />
          <Route path="*" element={<Fallback />} />
          <Route path="/expenses" element={<Expenses />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
