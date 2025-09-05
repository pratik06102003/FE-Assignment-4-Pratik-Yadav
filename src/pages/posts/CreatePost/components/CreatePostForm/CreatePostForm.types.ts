import { FormikHelpers } from 'formik';

export type CreatePostValuesType = {
  title: string;
  content: string;
  tags: string[];
};

export type CreatePostFormProps = {
  onSubmit: (
    values: CreatePostValuesType,
    formikHelpers: FormikHelpers<CreatePostValuesType>,
  ) => Promise<void> | void;
  mode?: 'create' | 'edit';
  initialValues?: Partial<CreatePostValuesType>;
  isLoading?: boolean;
};
