import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import type { RouteObject } from 'react-router-dom';

import { AuthLayout } from '@layouts/AuthLayout';
import { RootLayout } from '@layouts/RootLayout';

import { ProtectedRoute } from './ProtectedRoute';
import { PublicRoute } from './PublicRoute';
import { RouteErrorBoundary } from './RouteErrorBoundary';

import PostsIndex from '@pages/posts/PostIndex/PostsIndex.page';

const NotFound = lazy(() =>
  import('@pages/notFound').then((module) => ({ default: module.NotFound })),
);
const Signup = lazy(() =>
  import('@pages/auth/Signup').then((module) => ({ default: module.Signup })),
);
const Signin = lazy(() =>
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
        element: <PostsIndex />,
      },
      {
        path: 'not-found',
        element: (
          <Suspense fallback={<Spin fullscreen />}>
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
    element: (
      <PublicRoute>
        <AuthLayout />
      </PublicRoute>
    ),
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'signin',
        element: (
          <Suspense fallback={<Spin fullscreen />}>
            <Signin />
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<Spin fullscreen />}>
            <Signup />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
