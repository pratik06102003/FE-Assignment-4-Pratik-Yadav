import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

import { firebaseAuth, firestore } from '@app/firebase';
import { FIRESTORE_COLLECTIONS } from '@constants/common.constant';

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
): Promise<User | null> => {
  await setPersistence(firebaseAuth, browserLocalPersistence);
  const { user } = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  const profilePromise = updateProfile(user, { displayName: `${firstName} ${lastName}` });

  const userDocRef = doc(firestore, FIRESTORE_COLLECTIONS.USERS, user.uid);
  const setDocPromise = setDoc(userDocRef, {
    firstName,
    lastName,
    email: user.email,
    createdAt: user.metadata.creationTime,
  });

  await Promise.all([profilePromise, setDocPromise]);
  return user;
};

export const resetPassword = async (email: string) => {
  await sendPasswordResetEmail(firebaseAuth, email);
};

export const signout = async () => {
  await signOut(firebaseAuth);
};
