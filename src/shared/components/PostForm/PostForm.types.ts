import type { FormikHelpers } from 'formik';

export type PostValuesType = {
  title: string;
  content: string;
  tags: string[];
};

export type PostFormProps = {
  onSubmit: (values: PostValuesType, formikHelpers: FormikHelpers<PostValuesType>) => Promise<void>;
  onCancel: () => Promise<void>;
  mode?: 'create' | 'edit';
  initialValues?: Partial<PostValuesType>;
  isLoading: boolean;
};
