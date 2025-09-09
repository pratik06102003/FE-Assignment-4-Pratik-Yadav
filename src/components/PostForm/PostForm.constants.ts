import type { PostValuesType } from './PostForm.types';

export const POST_FORM_DEFAULT_VALUES: PostValuesType = { title: '', content: '', tags: [] };
export const POST_FORM_TITLE_MAX_LEN = 200;
export const POST_FORM_CONTENT_MIN_LEN = 10;
export const POST_FORM_TAG_MAX_LEN = 50;

export const POST_FORM = {
  TITLE: {
    MAX_LEN: {
      CONSTRAINT: 200,
      MESSAGE: 'Title is Too Long',
    },
    REQUIRED: {
      MESSAGE: 'Title is Required',
    },
  },

  CONTENT: {
    MIN_LEN: {
      CONSTRAINT: 10,
      MESSAGE: 'Content is to short',
    },
    REQUIRED: {
      MESSAGE: 'Content is Required',
    },
  },

  TAG: {
    MAX_LEN: {
      CONSTRAINT: 50,
      MESSAGE: 'Tag is Too Long',
    },
  },

  TAGS: {
    MAX_COUNT: {
      CONSTRAINT: 5,
      MESSAGE: 'Too many tags',
    },
  },
};
