export const mapFirebaseError = (code: string): string => {
  switch (code) {
    case 'auth/invalid-email':
      return 'Invalid email address.';
    case 'auth/email-already-in-use':
      return 'Email already in use.';
    case 'auth/weak-password':
      return 'Password is too weak.';
    default:
      return code;
  }
};
