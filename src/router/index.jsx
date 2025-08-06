import { createBrowserRouter, Navigate, useLocation } from 'react-router-dom';

import MainLayout from '../layouts/MainLayout';
import AdminLayout from '../layouts/AdminLayout';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

import {
  AdminPage,
  HomePage,
  LoginPage,
  RegisterPage,
  AddProductPage,
  ErrorPage,
  EditProductPage,
  CartPage,
  DetailProductPage
} from '../pages';

// handle route access by role
const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const { user, role } = useContext(AuthContext)
  if (!user || !role) {
    return <Navigate to='login' state={{ from: location }} replace />;
  }

  if (user && role === 'customer') {
    return <Navigate to={'/'} replace />;
  }

  if (user && role === 'admin') {
    return children;
  }

  return <Navigate to='login' state={{ from: location }} replace />;

};

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      {
        path: '',
        element: <HomePage />,
      },
      {
        path: 'register',
        element: <RegisterPage />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'cart',
        element: <CartPage />
      },
      {
        path: 'detail-product/:id',
        element: <DetailProductPage />,
      },
    ],
  },
  {
    element: (
      <ProtectedRoute>
        <AdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: '/admin',
        element: <AdminPage />,
      },
      {
        path: '/add-product',
        element: <AddProductPage />,
      },
      {
        path: '/edit-product/:id',
        element: <EditProductPage />,
      },
    ],
  },
  {
    path: '*',
    element: <ErrorPage />,
  },
]);

export default router;