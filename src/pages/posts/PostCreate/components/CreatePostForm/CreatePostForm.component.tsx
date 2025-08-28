import { Alert, Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { CreatePostFormProps, CreatePostValuesType } from './CreatePostForm.types';

const { TextArea } = Input;
const { Title, Text } = Typography;

const initialValues: CreatePostValuesType = { title: '', content: '', tags: '' };

const validationSchema = Yup.object({
  title: Yup.string().max(200, 'Title is too long').required('Title is required'),
  content: Yup.string().min(10, 'Content is too short').required('Content is required'),
  tags: Yup.string(),
});

export const CreatePostForm = (props: CreatePostFormProps) => {
  const { handleSubmit, isLoading, errorMessage } = props;

  return (
    <>
      <Card title={<Title level={3}>Create Post</Title>}>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <Flex className="form-control">
              <label htmlFor="title" className="form__label">
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
              <label htmlFor="content" className="form__label">
                Content
              </label>
              <Field name="content">
                {({ field }: FieldProps<string, CreatePostValuesType>) => (
                  <TextArea id="content" {...field} disabled={isLoading} rows={14} />
                )}
              </Field>
              <ErrorMessage name="content" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="tags" className="form__label">
                Tags
              </label>
              <Field name="tags">
                {({ field }: FieldProps<string, CreatePostValuesType>) => (
                  <Input
                    id="tags"
                    placeholder="Add relevant tags for the blogs"
                    {...field}
                    disabled={isLoading}
                  />
                )}
              </Field>
              <Text>Comma-separated (eg. react,javascript,web)</Text>

              <ErrorMessage name="tags" component="div" className="form__error" />
            </Flex>

            <Button type="primary" htmlType="submit" loading={isLoading} disabled={isLoading}>
              Publish
            </Button>
            {errorMessage && <Alert type="error" message={errorMessage} />}
          </Form>
        </Formik>
      </Card>
    </>
  );
};
