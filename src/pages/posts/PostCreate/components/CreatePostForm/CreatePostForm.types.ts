import { FormikHelpers } from 'formik';

export type CreatePostValuesType = {
  title: string;
  content: string;
  tags: string;
};

export type CreatePostFormsProps = {
  handleSubmit: (
    values: CreatePostValuesType,
    formikHelpers: FormikHelpers<CreatePostValuesType>,
  ) => Promise<void>;
  isLoading: boolean;
  errorMessage: string | null;
};
