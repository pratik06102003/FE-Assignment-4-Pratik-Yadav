import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import type { RouteObject } from 'react-router-dom';

import { AuthLayout } from '@layouts/AuthLayout';
import { RootLayout } from '@layouts/RootLayout';

import ProtectedRoute from './ProtectedRoute';
import { RouteErrorBoundary } from './RouteErrorBoundary';

const NotFound = lazy(() =>
  import('@pages/notFound').then((module) => ({ default: module.NotFound })),
);

const routes: RouteObject[] = [
  {
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <div>TO BE IMPLEMENTED</div>,
      },
      {
        path: 'not-found',
        element: (
          <Suspense fallback={<Spin />}>
            <NotFound />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: <Navigate to="/not-found" />,
      },
    ],
  },

  {
    path: 'auth',
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'signin',
        element: (
          <Suspense fallback={<Spin />}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<Spin />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
