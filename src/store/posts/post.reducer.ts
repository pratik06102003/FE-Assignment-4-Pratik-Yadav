import {
  ALL_POSTS_CLEAR,
  ALL_POSTS_SUCCESS,
  POST_FAILURE,
  POST_REQUEST,
  POST_SUCCESS,
  type PostsActionTypes,
  type PostsState,
} from './posts.types';

const initialState: PostsState = {
  posts: [],
  post: null,
  isLoading: false,
  cursor: null,
  hasMore: true,
  errorMessage: null,
  infoMessage: null,
};

export const postsReducer = (state = initialState, action: PostsActionTypes): PostsState => {
  switch (action.type) {
    case POST_REQUEST:
      return {
        ...state,
        isLoading: true,
        errorMessage: null,
        infoMessage: null,
      };

    case POST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        post: action.payload.post,
        infoMessage: action.payload.message,
        errorMessage: null,
      };

    case POST_FAILURE:
      return {
        ...state,
        isLoading: false,
        errorMessage: action.payload.message,
      };

    case ALL_POSTS_SUCCESS:
      return {
        ...state,
        isLoading: false,
        posts: [...state.posts, ...action.payload.newPosts],
        cursor: action.payload.cursor,
        hasMore: action.payload.hasMore,
        errorMessage: null,
      };

    case ALL_POSTS_CLEAR:
      return {
        ...initialState,
      };

    default:
      return state;
  }
};
