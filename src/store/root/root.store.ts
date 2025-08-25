import { legacy_createStore as createStore, combineReducers } from 'redux';
import { authReducer } from '@store/auth';

const rootReducer = combineReducers({ auth: authReducer });

export const store = createStore(rootReducer);
