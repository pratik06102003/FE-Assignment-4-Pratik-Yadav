import { Button, Card, Divider, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { TagInput } from '../TagInput';
import { CreatePostFormProps, CreatePostValuesType } from './CreatePostForm.types';

const { TextArea } = Input;
const { Title, Text } = Typography;

const DEFAULT_VALUES: CreatePostValuesType = { title: '', content: '', tags: [] };

const validationSchema = Yup.object({
  title: Yup.string().max(200, 'Title is too long').required('Title is required'),
  content: Yup.string().min(10, 'Content is too short').required('Content is required'),
  tags: Yup.array().of(Yup.string().max(50, 'Tag too long')).nullable(),
});

export const CreatePostForm = (props: CreatePostFormProps) => {
  const { onSubmit, mode = 'create', initialValues = {}, isLoading = false } = props;

  const formInitials = { ...DEFAULT_VALUES, ...initialValues };

  return (
    <>
      <Card title={<Title level={3}>{mode === 'create' ? 'Create Post' : 'Edit Post'}</Title>}>
        <Formik
          initialValues={formInitials}
          enableReinitialize
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          <Form className="from">
            <Flex className="form-control">
              <label htmlFor="title" className="block text-sm font-medium mb-1">
                Title
              </label>
              <Field name="title">
                {({ field }: FieldProps<string, CreatePostValuesType>) => (
                  <Input
                    id="title"
                    placeholder="Title for the blog"
                    {...field}
                    disabled={isLoading}
                  />
                )}
              </Field>
              <ErrorMessage name="title" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="content" className="block text-sm font-medium">
                Content
              </label>
              <Field name="content">
                {({ field }: FieldProps<string, CreatePostValuesType>) => (
                  <TextArea id="content" rows={12} {...field} disabled={isLoading} />
                )}
              </Field>
              <ErrorMessage name="content" component="div" className="form__error" />
            </Flex>

            <div>
              <label htmlFor="tags" className="block text-sm font-medium mb-1">
                Tags
              </label>

              <Field name="tags">
                {({ field, form }: FieldProps<string[], CreatePostValuesType>) => (
                  <TagInput
                    value={field.value || []}
                    onChange={(next) => void form.setFieldValue('tags', next)}
                    disabled={isLoading || form.isSubmitting}
                    placeholder="Add tags (press Enter or paste comma/newline separated)"
                    maxTags={12}
                  />
                )}
              </Field>
              <Text type="secondary">Press Enter or comma to add tags.</Text>
            </div>

            <Divider />

            <Flex gap={16}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {mode === 'create' ? 'Publish' : 'Update'}
              </Button>

              <Button
                onClick={() => {
                  if (mode === 'create') {
                    window.location.reload();
                  }
                }}
                disabled={isLoading}
              >
                {mode === 'create' ? 'Reset' : 'Cancel'}
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Card>
    </>
  );
};
