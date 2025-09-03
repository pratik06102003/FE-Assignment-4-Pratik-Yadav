import type { FormikHelpers } from 'formik';

export type SigninFormikValues = {
  email: string;
  password: string;
};

export type SigninFormsProps = {
  isLoading: boolean;
  handleSubmit: (
    values: SigninFormikValues,
    helpers: FormikHelpers<SigninFormikValues>,
  ) => Promise<void>;
};
