import { FormikHelpers } from 'formik';

export type SignupFormikValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

export type SignUpFormsProps = {
  isLoading: boolean;
  handleSubmit: (
    values: SignupFormikValues,
    helpers: FormikHelpers<SignupFormikValues>,
  ) => Promise<void>;
};
