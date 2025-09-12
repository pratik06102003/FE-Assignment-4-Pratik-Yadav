import {
  ALL_POSTS_CLEAR,
  ALL_POSTS_SUCCESS,
  DUMB_POST,
  POST_FAILURE,
  POST_REQUEST,
  POST_SUCCESS,
} from './post.constants';
import type { PostsActionTypes, PostsState } from './posts.types';

const initialState: PostsState = {
  posts: [],
  post: DUMB_POST,
  isLoading: false,
  lastFetchedDocumentId: '',
  hasMore: true,
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        isLoading: true,
      };

    case POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload.post,
      };

    case POST_FAILURE:
      return {
        ...state,
        isLoading: false,
      };

    case ALL_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, ...action.payload.newPosts],
        lastFetchedDocumentId: action.payload.lastFetchedDocumentId,
        hasMore: action.payload.hasMore,
      };

    case ALL_POSTS_CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
