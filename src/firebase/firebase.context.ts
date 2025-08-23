import { createContext, useContext } from 'react';

//TODO: Added proper generic for the context

export interface FireBaseContextValue {
  testService: () => void;
}

export const FireBaseContext = createContext<FireBaseContextValue | null>(null);

export const useFirebase = () => useContext(FireBaseContext);
