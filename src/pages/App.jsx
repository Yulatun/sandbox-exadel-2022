import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { Categories } from './Categories';
import { Fallback } from './Fallback';
import { Landing } from './Landing';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/categories" element={<Categories />} />
        <Route path="*" element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
};
