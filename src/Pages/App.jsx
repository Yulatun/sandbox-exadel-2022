import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Landing } from './Landing';
import { Categories } from './Categories';
import { Fallback } from './Fallback';

export const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/categories' element={<Categories />} />
        <Route path='*' element={<Fallback />} />
      </Routes>
    </BrowserRouter>
  );
};
