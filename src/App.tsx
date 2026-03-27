import { createBrowserRouter } from 'react-router';
import { Home } from './pages/home';
import { Login } from './pages/login';
import { VeiculoDetail } from './pages/VeiculoDetail';
import { Dashboard } from './pages/dashboard';
import { New } from './pages/dashboard/new';

import { Layout } from './components/layout';
import { Private } from './routes/private';

const router = createBrowserRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/veiculo/:id',
        element: <VeiculoDetail />,
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <Private>
        {' '}
        <Dashboard />
      </Private>
    ),
  },
  {
    path: '/dashboard/new',
    element: (
      <Private>
        <New />
      </Private>
    ),
  },
  {
    path: '/login',
    element: <Login />,
  },
]);

export { router };
