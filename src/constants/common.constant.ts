export const APP_COPYRIGHT_YEAR = '2025';

export const TRIGGERS = {
  CLICK: 'click',
  HOVER: 'hover',
} as const;

export const AUTH_FORM = {
  FIRST_NAME: {
    MAX_LEN: {
      CONSTRAINT: 50,
      MESSAGE: 'First name must not exceed 50 characters.',
    },
    REQUIRED: {
      MESSAGE: 'First name is required.',
    },
  },

  LAST_NAME: {
    MAX_LEN: {
      CONSTRAINT: 50,
      MESSAGE: 'Last name must not exceed 50 characters.',
    },
    REQUIRED: {
      MESSAGE: 'Last name is required.',
    },
  },

  EMAIL: {
    INVALID_FORMAT: {
      MESSAGE: 'Invalid Email Format',
    },
    REQUIRED: {
      MESSAGE: 'Email is required.',
    },
  },

  PASSWORD: {
    MIN_LEN: {
      CONSTRAINT: 8,
      MESSAGE: 'Password must be at least 8 characters long.',
    },
    REQUIRED: {
      MESSAGE: 'Password is required.',
    },
  },
};

export const FIRESTORE_COLLECTIONS = {
  USERS: 'users',
  POSTS: 'posts',
};
