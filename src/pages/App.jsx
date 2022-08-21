import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/Layout';
import { PrivateRoute } from '@/components/Routes/PrivateRoute';
import { PublicRoute } from '@/components/Routes/PublicRoute';

import { Admin } from './Admin';
import { Categories } from './Categories';
import { Expenses } from './Expenses';
import { Fallback } from './Fallback';
import { Incomes } from './Incomes';
import { Landing } from './Landing';
import { Login } from './Login';
import { Report } from './Report';
import { WalletView } from './WalletView';

export const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/login"
            element={
              <PublicRoute restricted redirectTo="/">
                <Login />
              </PublicRoute>
            }
          />
          <Route path="*" element={<Fallback />} />

          <Route
            element={
              <PrivateRoute>
                <AppLayout />
              </PrivateRoute>
            }
          >
            <Route path="/" element={<Landing />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/incomes" element={<Incomes />} />
            <Route path="/expenses" element={<Expenses />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/report" element={<Report />} />

            <Route path="/wallet/:id" element={<WalletView />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
