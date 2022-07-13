import About from '../pages/About';
import Categories from '../pages/Categories';
import Fallback from '../pages/Fallback';
import Landing from '../pages/Landing';
import Login from '../pages/Login';

export const privateRoutes = [
  { path: '/', element: Landing },
  { path: '/about', element: About },
  { path: '/categories', element: Categories },
  { path: '*', element: Fallback }
];

export const publicRoutes = [
  { path: '/login', element: Login },
  { path: '*', element: Fallback }
];
