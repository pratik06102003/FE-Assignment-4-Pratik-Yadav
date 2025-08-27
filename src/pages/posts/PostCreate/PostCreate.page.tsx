import { Alert, Button, Card, Flex, Form, Input, message, Typography } from 'antd';

import { ErrorMessage, Field, FieldProps, Formik, FormikHelpers } from 'formik';
import * as Yup from 'yup';

import { createPostFailure, createPostRequest, createPostSuccess } from '@store/posts/post.actions';
import { useAppDispatch, useAppSelector } from '@store/root';

import { PostInput, postsServices } from '@app/posts';
import { SignInValues } from '@pages/auth/Signup/Signup.types';

const { TextArea } = Input;
const { Title, Text } = Typography;
type CreatePostValuesType = {
  title: string;
  content: string;
  tags: string;
};

const initialValues: CreatePostValuesType = { title: '', content: '', tags: '' };

const PostCreate: React.FC = () => {
  const dispatch = useAppDispatch();
  const { isCreating, createError } = useAppSelector((state) => state.post);
  const userId = useAppSelector((state) => state.auth.user?.uid);

  const validationSchema = Yup.object({
    title: Yup.string().max(200, 'Title is too long').required('Title is required'),
    content: Yup.string().min(10, 'Content is too short').required('Content is required'),
    tags: Yup.string(),
  });

  const handleSubmit = async (
    values: CreatePostValuesType,
    { resetForm }: FormikHelpers<CreatePostValuesType>,
  ) => {
    if (!userId) {
      message.error('You must be signed in to create a post');
      return;
    }

    const payload: PostInput = {
      title: values.title.trim(),
      content: values.content,
      tags: values.tags
        ? values.tags
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean)
        : [],
    };

    dispatch(createPostRequest());
    try {
      const post = await postsServices.createPost(payload, userId);
      dispatch(createPostSuccess(post));
      message.success('Post created');
      resetForm();
    } catch {
      dispatch(createPostFailure('Failed to create post'));
    }
  };

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
              <label htmlFor="firstName" className="form__label">
                Title
              </label>
              <Field name="title">
                {({ field }: FieldProps<string, SignInValues>) => (
                  <Input
                    id="title"
                    placeholder="Title for the blog"
                    {...field}
                    disabled={isCreating}
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
                {({ field }: FieldProps<string, SignInValues>) => (
                  <TextArea id="content" {...field} disabled={isCreating} rows={14} />
                )}
              </Field>
              <ErrorMessage name="content" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="tag" className="form__label">
                Tags
              </label>
              <Field name="tag">
                {({ field }: FieldProps<string, SignInValues>) => (
                  <Input
                    id="tag"
                    placeholder="Add relevant tags for the blogs"
                    {...field}
                    disabled={isCreating}
                  />
                )}
              </Field>
              <Text>Comma-separated (eg. react,javascript,web)</Text>

              <ErrorMessage name="tag" component="div" className="form__error" />
            </Flex>

            <Button
              type="primary"
              htmlType="submit"
              loading={isCreating}
              block
              disabled={isCreating}
            >
              Publish
            </Button>
            {createError && <Alert type="error" message={createError} />}
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default PostCreate;
