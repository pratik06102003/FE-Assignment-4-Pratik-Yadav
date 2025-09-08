import * as Yup from 'yup';

import { AUTH_FORM } from '@constants/common.constant';

const { FIRST_NAME, LAST_NAME, PASSWORD } = AUTH_FORM;

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(FIRST_NAME.MAX_LEN.CONSTRAINT, FIRST_NAME.MAX_LEN.MESSAGE)
    .required(FIRST_NAME.REQUIRED.MESSAGE),
  lastName: Yup.string()
    .max(LAST_NAME.MAX_LEN.CONSTRAINT, LAST_NAME.MAX_LEN.MESSAGE)
    .required(LAST_NAME.REQUIRED.MESSAGE),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(PASSWORD.MIN_LEN.CONSTRAINT, PASSWORD.MIN_LEN.MESSAGE)
    .required(PASSWORD.REQUIRED.MESSAGE),
});
