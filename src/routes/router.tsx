import { lazy, Suspense } from 'react';

import type { RouteObject } from 'react-router-dom';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { Spin } from 'antd';

import { RootLayout } from '@layouts/RootLayout';

import { RouteErrorBoundary } from './RouteErrorBoundary';

const PostsIndex = lazy(() => import('@pages/posts/PostIndex'));
const PostDetails = lazy(() => import('@pages/posts/PostDetails'));
const PostCreate = lazy(() => import('@pages/posts/PostCreate'));
const PostEdit = lazy(() => import('@pages/posts/PostEdit'));
const Signin = lazy(() => import('@pages/auth/Signin'));
const Signup = lazy(() => import('@pages/auth/Signup'));
const NotFound = lazy(() => import('@pages/notFound'));

const routes: RouteObject[] = [
  {
    element: <RootLayout />,
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
