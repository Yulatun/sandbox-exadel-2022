import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { AppLayout } from '@/components/Layout';

import { About } from './About';
import { Categories } from './Categories';
import { Expenses } from './Expenses';
import { Fallback } from './Fallback';
import { Landing } from './Landing';
import { Login } from './Login';

export const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} index />
          <Route element={<AppLayout />}>
            <Route path="/" element={<Landing />} />
            <Route path="/about" element={<About />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="*" element={<Fallback />} />
            <Route path="/expenses" element={<Expenses />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};
