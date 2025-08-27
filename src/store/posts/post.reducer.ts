import {
  CREATE_POST_FAILURE,
  CREATE_POST_REQUEST,
  CREATE_POST_SUCCESS,
  PostsActionTypes,
  PostsState,
} from './posts.types';

const initialState: PostsState = {
  posts: [],
  ids: [],
  isCreating: false,
  createError: null,
};

export function postsReducer(state = initialState, action: PostsActionTypes): PostsState {
  switch (action.type) {
    case CREATE_POST_REQUEST:
      return { ...state, isCreating: true, createError: null };

    case CREATE_POST_SUCCESS: {
      const post = action.payload;
      return {
        ...state,
        isCreating: false,
        createError: null,
        posts: [...state.posts, post],
      };
    }

    case CREATE_POST_FAILURE:
      return { ...state, isCreating: false, createError: action.payload.message };

    default:
      return state;
  }
}
