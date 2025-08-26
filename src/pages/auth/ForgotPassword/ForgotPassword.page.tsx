import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Alert, Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { forgotPassword } from '@store/auth';
import { useAppDispatch, useAppSelector } from '@store/root';

import { ForgotPasswordValues } from './ForgotPassword.types';

const { Title } = Typography;

const SigninSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email format').required('Email is required'),
});

const initialValues: ForgotPasswordValues = { email: '' };

const ForgotPassword = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user, message } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (user) {
      void navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (values: ForgotPasswordValues) => {
    await forgotPassword(values.email, dispatch);
  };

  return (
    <>
      <Card title={<Title level={3}>Forgot Password</Title>}>
        <Formik
          initialValues={initialValues}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <Flex className="form-control">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <Field name="email">
                {({ field }: FieldProps<string, ForgotPasswordValues>) => (
                  <Input id="email" placeholder="Enter your email" {...field} disabled={loading} />
                )}
              </Field>
              <ErrorMessage name="email" component="div" className="form__error" />
            </Flex>

            <Button type="primary" htmlType="submit" loading={loading} block disabled={loading}>
              Send Link
            </Button>
            {error && <Alert type="error" message={error} />}
            {message && <Alert type="success" message={message} />}
            <Flex justify="center" gap={8}>
              <Link to="/auth/signin" className="link">
                SignIn
              </Link>

              <Link to="/auth/signup" className="link">
                Signup
              </Link>
            </Flex>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default ForgotPassword;
