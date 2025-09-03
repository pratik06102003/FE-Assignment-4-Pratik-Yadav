import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { firebaseAuth, firestore } from '@app/index';

import type { User } from './auth.types';

export const listen = (callback: (user: User | null) => void) =>
  onAuthStateChanged(firebaseAuth, (user) => callback(user));

export const signin = async (email: string, password: string): Promise<User> => {
  await setPersistence(firebaseAuth, browserLocalPersistence);
  const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return user;
};

export const signup = async (
  firstName: string,
  lastName: string,
  email: string,
  password: string,
): Promise<User> => {
  await setPersistence(firebaseAuth, browserLocalPersistence);
  const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  await setDoc(doc(firestore, 'users', user.uid), {
    firstName,
    lastName,
    email: user.email,
    createdAt: user.metadata.creationTime,
  });
  return user;
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(firebaseAuth, email);
};

export const signout = async () => {
  await signOut(firebaseAuth);
};
