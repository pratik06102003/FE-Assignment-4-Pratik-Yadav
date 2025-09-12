import * as Yup from 'yup';

import { AUTH_FORM } from '@constants/common.constant';

const { PASSWORD, EMAIL } = AUTH_FORM;

export const SigninSchema = Yup.object().shape({
  email: Yup.string().email(EMAIL.INVALID_FORMAT.MESSAGE).required(EMAIL.REQUIRED.MESSAGE),
  password: Yup.string().required(PASSWORD.REQUIRED.MESSAGE),
});
