import { Button, Card, Divider, Flex, Input, Typography } from 'antd';

import type { FieldProps } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';

import { TagInput } from '@components/TagInput';

import { POST_FORM, POST_FORM_DEFAULT_VALUES } from './PostForm.constants';
import { postFormValidationSchema } from './PostForm.schemas';
import type { PostFormProps, PostValuesType } from './PostForm.types';

const { TextArea } = Input;
const { Title, Text } = Typography;

export const PostForm = (props: PostFormProps) => {
  const { onSubmit, mode = 'create', initialValues = {}, isLoading, onCancel } = props;

  const formInitials = { ...POST_FORM_DEFAULT_VALUES, ...initialValues };

  return (
    <>
      <Card title={<Title level={3}>{mode === 'create' ? 'Create Post' : 'Edit Post'}</Title>}>
        <Formik
          initialValues={formInitials}
          enableReinitialize
          validationSchema={postFormValidationSchema}
          onSubmit={onSubmit}
        >
          <Form className="form">
            <Flex className="form-control">
              <label htmlFor="title">Title</label>
              <Field
                name="title"
                as={Input}
                id="title"
                placeholder="Title for the blog"
                disabled={isLoading}
              />
              <ErrorMessage name="title" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="content">Content</label>
              <Field name="content" as={TextArea} id="content" rows={12} disabled={isLoading} />
              <ErrorMessage name="content" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="tags">Tags</label>

              <Field name="tags">
                {({ field, form }: FieldProps<string[], PostValuesType>) => (
                  <TagInput
                    tags={field.value || []}
                    onChange={(next) => void form.setFieldValue('tags', next)}
                    disabled={isLoading || form.isSubmitting}
                    placeholder="Add tags (press Enter or paste comma/newline separated)"
                    maxTags={POST_FORM.TAGS.MAX_COUNT.CONSTRAINT}
                    maxTagLength={POST_FORM.TAG.MAX_LEN.CONSTRAINT}
                  />
                )}
              </Field>
              <ErrorMessage name="tags" component="div" className="form__error" />

              <Text type="secondary">Press Enter or comma to add tags.</Text>
            </Flex>

            <Divider />

            <Flex gap={16}>
              <Button type="primary" htmlType="submit" loading={isLoading}>
                {mode === 'create' ? 'Publish' : 'Update'}
              </Button>

              <Button onClick={() => void onCancel()} disabled={isLoading}>
                Cancel
              </Button>
            </Flex>
          </Form>
        </Formik>
      </Card>
    </>
  );
};
