import { getDatabase, ref, set } from 'firebase/database';
import { app } from '../firebase.app';

const database = getDatabase(app);

export const testService = () => {
  void set(ref(database, 'users/ok'), {
    id: 1,
    name: 'test-user',
  });
};
