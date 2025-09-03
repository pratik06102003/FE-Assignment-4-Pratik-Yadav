import { Link } from 'react-router-dom';

import { Button, Card, Flex, Input, Typography } from 'antd';

import type { FieldProps } from 'formik';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { ROUTES } from '@constants/routes.constants';

import type { SignupFormikValues, SignUpFormsProps } from './SignupForm.types';

const { Title, Text } = Typography;

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().max(50, 'Maximum 50 characters').required('First name is required'),
  lastName: Yup.string().max(50, 'Maximum 50 characters').required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string().min(8, 'Minimum 8 characters').required('Password is required'),
});

const initialValues: SignupFormikValues = { firstName: '', lastName: '', email: '', password: '' };

export const SignupForm = ({ isLoading, handleSubmit }: SignUpFormsProps) => (
  <>
    <Card title={<Title level={3}>Signup</Title>}>
      <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
        <Form className="form">
          <Flex className="form-control">
            <label htmlFor="firstName">
              <Text>First Name</Text>
            </label>
            <Field name="firstName">
              {({ field }: FieldProps<string, SignupFormikValues>) => (
                <Input
                  id="firstName"
                  placeholder="Enter your first name"
                  {...field}
                  disabled={isLoading}
                />
              )}
            </Field>
            <ErrorMessage name="firstName" component="div" className="form__error" />
          </Flex>

          <Flex className="form-control">
            <label htmlFor="lastName">
              <Text>Last Name</Text>
            </label>
            <Field name="lastName">
              {({ field }: FieldProps<string, SignupFormikValues>) => (
                <Input
                  id="lastName"
                  placeholder="Enter your last name"
                  {...field}
                  disabled={isLoading}
                />
              )}
            </Field>
            <ErrorMessage name="lastName" component="div" className="form__error" />
          </Flex>

          <Flex className="form-control">
            <label htmlFor="email">
              <Text>Email</Text>
            </label>
            <Field name="email">
              {({ field }: FieldProps<string, SignupFormikValues>) => (
                <Input id="email" placeholder="Enter your email" {...field} disabled={isLoading} />
              )}
            </Field>
            <ErrorMessage name="email" component="div" className="form__error" />
          </Flex>

          <Flex className="form-control">
            <label htmlFor="password">
              <Text>Password</Text>
            </label>
            <Field name="password">
              {({ field }: FieldProps<string, SignupFormikValues>) => (
                <Input.Password
                  id="password"
                  placeholder="Enter your password"
                  {...field}
                  disabled={isLoading}
                />
              )}
            </Field>
            <ErrorMessage name="password" component="div" className="form__error" />
          </Flex>
          <Button type="primary" htmlType="submit" loading={isLoading} block disabled={isLoading}>
            Sign Up
          </Button>
          <Flex justify="center" gap={8}>
            <Link to={ROUTES.SIGNIN} className="link">
              SignIn
            </Link>
          </Flex>
        </Form>
      </Formik>
    </Card>
  </>
);
