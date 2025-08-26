import { useEffect } from 'react';

import { Link, useNavigate } from 'react-router-dom';

import { Alert, Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { signUp } from '@store/auth';
import { useAppDispatch, useAppSelector } from '@store/root';

import { SignInValues } from './Signup.types';

const { Title } = Typography;

const SigninSchema = Yup.object().shape({
  firstName: Yup.string().max(50, 'Maximum 50 characters').required('First name is required'),
  lastName: Yup.string().max(50, 'Maximum 50 characters').required('First name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
});

const initialValues: SignInValues = { firstName: '', lastName: '', email: '', password: '' };
const Signup = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, user } = useAppSelector((s) => s.auth);

  useEffect(() => {
    if (user) {
      void navigate('/');
    }
  }, [user, navigate]);

  const handleSubmit = async (values: SignInValues) => {
    await signUp(values.firstName, values.lastName, values.email, values.password, dispatch);
  };

  return (
    <>
      <Card title={<Title level={3}>Signup</Title>} extra="signin">
        <Formik
          initialValues={initialValues}
          validationSchema={SigninSchema}
          onSubmit={handleSubmit}
        >
          <Form className="form">
            <Flex className="form-control">
              <label htmlFor="firstName" className="form__label">
                First Name
              </label>
              <Field name="firstName">
                {({ field }: FieldProps<string, SignInValues>) => (
                  <Input
                    id="firstName"
                    placeholder="Enter your first name"
                    {...field}
                    disabled={loading}
                  />
                )}
              </Field>
              <ErrorMessage name="firstName" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="lastName" className="form__label">
                Last Name
              </label>
              <Field name="lastName">
                {({ field }: FieldProps<string, SignInValues>) => (
                  <Input
                    id="lastName"
                    placeholder="Enter your last name"
                    {...field}
                    disabled={loading}
                  />
                )}
              </Field>
              <ErrorMessage name="lastName" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="email" className="form__label">
                Email
              </label>
              <Field name="email">
                {({ field }: FieldProps<string, SignInValues>) => (
                  <Input id="email" placeholder="Enter your email" {...field} disabled={loading} />
                )}
              </Field>
              <ErrorMessage name="email" component="div" className="form__error" />
            </Flex>

            <Flex className="form-control">
              <label htmlFor="password" className="form__label">
                Password
              </label>
              <Field name="password">
                {({ field }: FieldProps<string, SignInValues>) => (
                  <Input.Password
                    id="password"
                    placeholder="Enter your password"
                    {...field}
                    disabled={loading}
                  />
                )}
              </Field>
              <ErrorMessage name="password" component="div" className="form__error" />
            </Flex>

            <Button type="primary" htmlType="submit" loading={loading} block disabled={loading}>
              Sign Up
            </Button>
            {error && <Alert type="error" message={error} />}
            <Flex justify="center" gap={8}>
              <Link to="/auth/signin" className="link">
                SignIn
              </Link>
            </Flex>
          </Form>
        </Formik>
      </Card>
    </>
  );
};

export default Signup;
