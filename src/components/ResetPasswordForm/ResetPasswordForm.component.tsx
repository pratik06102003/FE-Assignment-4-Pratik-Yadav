import { Link } from 'react-router-dom';

import { Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { ROUTES } from '@constants/routes.constants';

import type { ResetPasswordFormikValues, ResetPasswordFormProps } from './ResetPasswordForm.types';

const { Title } = Typography;

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const initialValues: ResetPasswordFormikValues = { email: '' };

export const ResetPasswordForm = (props: ResetPasswordFormProps) => {
  const { isLoading, handleSubmit } = props;
  return (
    <Card title={<Title level={3}>Forgot Password</Title>}>
      <Formik initialValues={initialValues} validationSchema={SigninSchema} onSubmit={handleSubmit}>
        <Form className="form">
          <Flex className="form-control">
            <label htmlFor="email" className="form__label">
              Email
            </label>
            <Field
              name="email"
              id="email"
              placeholder="Enter your email"
              disabled={isLoading}
              as={Input}
            />
            <ErrorMessage name="email" component="div" className="form__error" />
          </Flex>

          <Button type="primary" htmlType="submit" loading={isLoading} block disabled={isLoading}>
            Send Link
          </Button>

          <Flex justify="center" gap={8}>
            <Link to={ROUTES.SIGNIN} className="link">
              SignIn
            </Link>
            <Link to={ROUTES.SIGNUP} className="link">
              Signup
            </Link>
          </Flex>
        </Form>
      </Formik>
    </Card>
  );
};
