import { lazy, Suspense } from 'react';
<<<<<<< HEAD

import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import { RootLayout } from '@layouts/RootLayout';

import { RouteErrorBoundary } from './RouteErrorBoundary';
=======
import { createBrowserRouter, Navigate } from 'react-router-dom';
import type { RouteObject } from 'react-router-dom';
import { Spin } from 'antd';

import { RootLayout } from '@layouts/RootLayout';
import { AuthLayout } from '@layouts/AuthLayout';
import { RouteErrorBoundary } from './RouteErrorBoundary';
import ProtectedRoute from '@components/ProtectedRoute';
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)

const PostsIndex = lazy(() => import('@pages/posts/PostIndex'));
const PostDetails = lazy(() => import('@pages/posts/PostDetails'));
const PostCreate = lazy(() => import('@pages/posts/PostCreate'));
const PostEdit = lazy(() => import('@pages/posts/PostEdit'));
const Signin = lazy(() => import('@pages/auth/Signin'));
const Signup = lazy(() => import('@pages/auth/Signup'));
const NotFound = lazy(() => import('@pages/notFound'));

const routes: RouteObject[] = [
  {
<<<<<<< HEAD
    element: <RootLayout />,
=======
    element: (
      <ProtectedRoute>
        <RootLayout />
      </ProtectedRoute>
    ),
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: <Navigate to="posts" />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (
              <Suspense fallback={<Spin />}>
                <PostsIndex />
              </Suspense>
            ),
          },
          {
            path: 'create',
            element: (
              <Suspense fallback={<Spin />}>
                <PostCreate />
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
                <PostEdit />
              </Suspense>
            ),
          },
          {
            path: 'tags/:tag',
            element: (
              <Suspense fallback={<Spin />}>
                <PostsIndex />
              </Suspense>
            ),
          },
        ],
      },
      {
<<<<<<< HEAD
=======
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
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
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
<<<<<<< HEAD
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
=======
>>>>>>> f2c91b2 (YP_RU_02: Auth 1: Signup: Added Signup page and associated tests)
    ],
  },
];

export const router = createBrowserRouter(routes);
