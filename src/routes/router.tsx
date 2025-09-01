import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import type { RouteObject } from 'react-router-dom';

import { RootLayout } from '@layouts/RootLayout';

import { RouteErrorBoundary } from './RouteErrorBoundary';

const NotFound = lazy(() =>
  import('@pages/notFound').then((module) => ({ default: module.NotFound })),
);

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
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
];

export const router = createBrowserRouter(routes);
