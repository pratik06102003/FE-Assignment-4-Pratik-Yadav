import {
  CLEAR_POSTS,
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  FETCH_POSTS_REQUEST,
  FETCH_POSTS_SUCCESS,
  PostsActionTypes,
  PostsState,
} from './posts.types';

const initialState: PostsState = {
  posts: [],
  isCreating: false,
  isFetching: false,
  postErrorMessage: null,
  postInfoMessage: null,
  cursor: null,
  hasMore: true,
};

export function postsReducer(state = initialState, action: PostsActionTypes): PostsState {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { ...state, isCreating: true, postErrorMessage: null, postInfoMessage: null };

    case CREATE_POST_SUCCESS: {
      return {
        ...state,
        isCreating: false,
        postErrorMessage: null,
        postInfoMessage: action.payload.message,
        posts: [...state.posts, action.payload.post],
      };
    }

    case CREATE_POST_FAILURE:
      return { ...state, isCreating: false, postErrorMessage: action.payload.message };

    case FETCH_POSTS_REQUEST:
      return { ...state, isFetching: true };

    case FETCH_POSTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        posts: [...state.posts, ...action.payload.posts],
        cursor: action.payload.cursor,
        hasMore: action.payload.hasMore,
      };

    case CLEAR_POSTS:
      return {
        ...state,
        posts: [],
      };

    default:
      return state;
  }
}
