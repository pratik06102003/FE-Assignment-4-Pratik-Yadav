import * as Yup from 'yup';

import { AUTH_FORM } from '@constants/common.constant';

const { FIRST_NAME, LAST_NAME, PASSWORD, EMAIL } = AUTH_FORM;

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(FIRST_NAME.MAX_LEN.CONSTRAINT, FIRST_NAME.MAX_LEN.MESSAGE)
    .required(FIRST_NAME.REQUIRED.MESSAGE),
  lastName: Yup.string()
    .max(LAST_NAME.MAX_LEN.CONSTRAINT, LAST_NAME.MAX_LEN.MESSAGE)
    .required(LAST_NAME.REQUIRED.MESSAGE),
  email: Yup.string().email(EMAIL.INVALID_FORMAT.MESSAGE).required(EMAIL.REQUIRED.MESSAGE),
  password: Yup.string()
    .min(PASSWORD.MIN_LEN.CONSTRAINT, PASSWORD.MIN_LEN.MESSAGE)
    .required(PASSWORD.REQUIRED.MESSAGE),
});
