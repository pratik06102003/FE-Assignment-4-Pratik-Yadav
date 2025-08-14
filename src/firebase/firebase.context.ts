import { createContext, useContext } from 'react';

//TODO: Added proper generic for the context
export const FireBaseContext = createContext<{
  testService: () => void;
} | null>(null);

export const useFirebase = () => useContext(FireBaseContext);
