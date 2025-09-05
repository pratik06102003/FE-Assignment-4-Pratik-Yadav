import { combineReducers, legacy_createStore as createStore } from 'redux';

import { authReducer } from '@store/auth';
import { postsReducer } from '@store/posts';

const rootReducer = combineReducers({
  auth: authReducer,
  posts: postsReducer,
});

export const store = createStore(rootReducer);
