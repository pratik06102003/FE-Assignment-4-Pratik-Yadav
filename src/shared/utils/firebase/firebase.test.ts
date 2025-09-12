import { mapFirebaseError } from './firebase.utils';

describe('mapFirebaseError', () => {
  test.each([
    ['auth/invalid-email', 'Invalid email address.'],
    ['auth/email-already-in-use', 'Email already in use.'],
    ['auth/weak-password', 'Password is too weak.'],
    ['auth/unknown-error', 'auth/unknown-error'],
  ])('maps "%s" to "%s"', (code, expected) => {
    expect(mapFirebaseError(code)).toBe(expected);
  });
});
