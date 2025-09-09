import { lazy, Suspense } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import type { RouteObject } from 'react-router-dom';

import { AuthLayout } from '@layouts/AuthLayout';
import { RootLayout } from '@layouts/RootLayout';

import { AuthRoute } from './AuthRoute';
import { ProtectedRoute } from './ProtectedRoute';
import { RouteErrorBoundary } from './RouteErrorBoundary';

const NotFound = lazy(() =>
  import('@pages/notFound').then((module) => ({ default: module.NotFound })),
);
const Signup = lazy(() =>
  import('@pages/auth/Signup').then((module) => ({ default: module.Signup })),
);
const Signin = lazy(() =>
  import('@pages/auth/Signin').then((module) => ({ default: module.Signin })),
);
const ResetPassword = lazy(() =>
  import('@pages/auth/ResetPassword').then((module) => ({ default: module.ResetPassword })),
);

const PostsFeed = lazy(() =>
  import('@pages/posts/PostFeed').then((module) => ({ default: module.PostsFeed })),
);

const PostDetails = lazy(() =>
  import('@pages/posts/PostDetails').then((module) => ({ default: module.PostDetails })),
);

const CreatePost = lazy(() =>
  import('@pages/posts/CreatePost').then((module) => ({ default: module.CreatePost })),
);

const EditPost = lazy(() =>
  import('@pages/posts/EditPost').then((module) => ({ default: module.EditPost })),
);

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,

        element: (
          <ProtectedRoute>
            <PostsFeed />
          </ProtectedRoute>
        ),
      },

      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spin />}>
                <PostsFeed />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Spin />}>
                <CreatePost />
              </Suspense>
            ),
          },
          {
            path: ':postId',
            element: (
              <Suspense fallback={<Spin />}>
                <PostDetails />
              </Suspense>
            ),
          },
          {
            path: ':postId/edit',
            element: (
              <Suspense fallback={<Spin />}>
                <EditPost />
              </Suspense>
            ),
          },
        ],
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
    element: <AuthLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        path: 'signin',
        element: (
          <Suspense fallback={<Spin fullscreen />}>
            <AuthRoute>
              <Signin />
            </AuthRoute>
          </Suspense>
        ),
      },
      {
        path: 'signup',
        element: (
          <Suspense fallback={<Spin fullscreen />}>
            <AuthRoute>
              <Signup />
            </AuthRoute>
          </Suspense>
        ),
      },
      {
        path: 'reset-password',
        element: (
          <Suspense fallback={<Spin fullscreen />}>
            <ResetPassword />
          </Suspense>
        ),
      },
    ],
  },
];

export const router = createBrowserRouter(routes);
