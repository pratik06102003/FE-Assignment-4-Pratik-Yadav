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

import type { AuthUser } from '@store/auth';

import { firebaseAuth, firestore } from '../../app';

export const authServices = {
  listen: (callback: (user: AuthUser | null) => void) =>
    onAuthStateChanged(firebaseAuth, (u) => callback(u)),

  signIn: async (email: string, password: string): Promise<AuthUser> => {
    await setPersistence(firebaseAuth, browserLocalPersistence);
    const { user } = await signInWithEmailAndPassword(firebaseAuth, email, password);
    return user;
  },

  signUp: async (
    firstName: string,
    lastName: string,
    email: string,
    password: string,
  ): Promise<AuthUser> => {
    await setPersistence(firebaseAuth, browserLocalPersistence);
    const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
    await setDoc(doc(firestore, 'users', user.uid), {
      firstName,
      lastName,
      email: user.email,
      createdAt: user.metadata.creationTime,
    });
    return user;
  },

  resetPassword: async (email: string) => {
    await sendPasswordResetEmail(firebaseAuth, email);
  },

  signOut: async () => {
    await signOut(firebaseAuth);
  },
};
