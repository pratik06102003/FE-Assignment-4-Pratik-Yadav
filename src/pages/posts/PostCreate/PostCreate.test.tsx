import { combineReducers, legacy_createStore as createStore } from 'redux';
import { Provider } from 'react-redux';

import { authReducer } from '@store/auth';
import { postsReducer } from '@store/posts';
import { RootState } from '@store/root';

import PostCreate from './PostCreate.page';

import { postsServices } from '@app/posts';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// --- Mock postsServices ---
jest.mock('@app/posts', () => ({
  postsServices: {
    createPost: jest.fn(),
  },
}));

// Helper to build a real Redux store with classic Redux API
const makeStore = (preloadedState?: Partial<RootState>) =>
  createStore(
    combineReducers({
      post: postsReducer,
      auth: authReducer,
    }),
    preloadedState,
  );

describe('PostCreate integration', () => {
  const user = userEvent.setup();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('blocks submission and shows error when user is not signed in', async () => {
    const store = makeStore({
      auth: { user: null, loading: false, error: null, message: null },
      post: { isCreating: false, createError: null, posts: [], ids: [] },
    });

    render(
      <Provider store={store}>
        <PostCreate />
      </Provider>,
    );

    await user.type(screen.getByPlaceholderText(/Title for the blog/i), 'Hello');
    await user.type(screen.getByLabelText(/Content/i), 'Some valid content');
    await user.click(screen.getByRole('button', { name: /Publish/i }));

    // state unchanged
    expect(store.getState().post.isCreating).toBe(false);
    expect(store.getState().post.createError).toBeNull();
  });

  test('submits successfully when user is signed in', async () => {
    const store = makeStore({
      auth: {
        user: { uid: 'user123', email: 'sh@fdsd.com' },
        loading: false,
        error: null,
        message: null,
      },
      post: { isCreating: false, createError: null, posts: [], ids: [] },
    });

    const fakePost = {
      id: 'p1',
      title: 'My Title',
      content: 'Some content',
      tags: ['tag1'],
    };
    (postsServices.createPost as jest.Mock).mockResolvedValue(fakePost);

    render(
      <Provider store={store}>
        <PostCreate />
      </Provider>,
    );

    await user.type(screen.getByPlaceholderText(/Title for the blog/i), 'My Title');
    await user.type(screen.getByLabelText(/Content/i), 'Some content that is long enough');
    await user.type(screen.getByPlaceholderText(/Add relevant tags/i), 'tag1');
    await user.click(screen.getByRole('button', { name: /Publish/i }));

    await waitFor(() => {
      expect(screen.getByPlaceholderText(/Title for the blog/i)).toHaveValue('');
    });

    const state = store.getState().post;
    expect(state.isCreating).toBe(false);
    expect(state.createError).toBeNull();
  });

  test('dispatches failure when API call rejects', async () => {
    const store = makeStore({
      auth: {
        user: { uid: 'user123', email: 'sh@fdsd.com' },
        loading: false,
        error: null,
        message: null,
      },
    });

    (postsServices.createPost as jest.Mock).mockRejectedValue(new Error('Network error'));

    render(
      <Provider store={store}>
        <PostCreate />
      </Provider>,
    );

    await user.type(screen.getByPlaceholderText(/Title for the blog/i), 'My Title');
    await user.type(screen.getByLabelText(/Content/i), 'Some content that is long enough');
    await user.click(screen.getByRole('button', { name: /Publish/i }));

    await waitFor(() => {
      expect(store.getState().post.createError).toBe('Failed to create post');
    });
  });
});
