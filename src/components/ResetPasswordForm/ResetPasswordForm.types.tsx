import type { FormikHelpers } from 'formik';

export type ResetPasswordFormikValues = {
  email: string;
};

export type ResetPasswordFormProps = {
  isLoading: boolean;
  handleSubmit: (
    values: ResetPasswordFormikValues,
    helpers: FormikHelpers<ResetPasswordFormikValues>,
  ) => Promise<void>;
};
