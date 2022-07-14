import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Header } from '@/components';

import { About } from './About';
import { Categories } from './Categories';
import { Fallback } from './Fallback';
import { Landing } from './Landing';
import { Login } from './Login';

export const App = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Landing />} />
        <Route path="/about" element={<About />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
};
