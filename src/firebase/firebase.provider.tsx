import { ReactNode } from 'react';

import { FireBaseContext } from './firebase.context';
import { testService } from './services';

export const FireBaseContextProvider = (props: { children: ReactNode }) => {
  const { children } = props;

  return <FireBaseContext.Provider value={{ testService }}>{children}</FireBaseContext.Provider>;
};
