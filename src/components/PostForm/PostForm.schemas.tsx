import * as Yup from 'yup';

import { POST_FORM } from './PostForm.constants';

const { TITLE, CONTENT, TAG, TAGS } = POST_FORM;

export const postFormValidationSchema = Yup.object({
  title: Yup.string()
    .max(TITLE.MAX_LEN.CONSTRAINT, TITLE.MAX_LEN.MESSAGE)
    .required(TITLE.REQUIRED.MESSAGE),
  content: Yup.string()
    .min(CONTENT.MIN_LEN.CONSTRAINT, CONTENT.MIN_LEN.MESSAGE)
    .required(CONTENT.REQUIRED.MESSAGE),
  tags: Yup.array()
    .of(Yup.string().max(TAG.MAX_LEN.CONSTRAINT, TAG.MAX_LEN.MESSAGE))
    .max(TAGS.MAX_COUNT.CONSTRAINT, TAGS.MAX_COUNT.MESSAGE)
    .nullable(),
});
