import { combineReducers, legacy_createStore as createStore } from 'redux';

import { authReducer } from '@store/auth';
import { messageReducer } from '@store/messages';
import { postsReducer } from '@store/posts';

export const rootReducer = combineReducers({
  auth: authReducer,
  messages: messageReducer,
  posts: postsReducer,
});

export const store = createStore(rootReducer);
