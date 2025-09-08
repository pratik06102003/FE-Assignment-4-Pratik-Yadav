import { combineReducers, legacy_createStore as createStore } from 'redux';

import { authReducer } from '@store/auth';
import { messageReducer } from '@store/messages';

export const rootReducer = combineReducers({ auth: authReducer, messages: messageReducer });

export const store = createStore(rootReducer);
