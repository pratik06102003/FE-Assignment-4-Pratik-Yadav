import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

import { firebaseApp } from './firebase.app';

export const firebaseAuth = getAuth(firebaseApp);
export const firestore = getFirestore(firebaseApp);
