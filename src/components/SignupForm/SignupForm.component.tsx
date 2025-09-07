import { Link } from 'react-router-dom';

import { Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';

import {
  FORM_FIRST_NAME_FILED_MAX_LENGTH,
  FORM_LAST_NAME_FILED_MAX_LENGTH,
  FORM_PASSWORD_FILED_MIN_LENGTH,
} from '@constants/common.constant';
import { ROUTES } from '@constants/routes.constants';

import type { SignupFormikValues, SignUpFormsProps } from './SignupForm.types';

const { Title } = Typography;
const { Password } = Input;

export const SignupSchema = Yup.object().shape({
  firstName: Yup.string()
    .max(FORM_FIRST_NAME_FILED_MAX_LENGTH, `Maximum ${FORM_FIRST_NAME_FILED_MAX_LENGTH} characters`)
    .required('First name is required'),
  lastName: Yup.string()
    .max(FORM_LAST_NAME_FILED_MAX_LENGTH, `Maximum ${FORM_LAST_NAME_FILED_MAX_LENGTH} characters`)
    .required('Last name is required'),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  password: Yup.string()
    .min(FORM_PASSWORD_FILED_MIN_LENGTH, `Minimum ${FORM_PASSWORD_FILED_MIN_LENGTH} characters`)
    .required('Password is required'),
});

const initialValues: SignupFormikValues = { firstName: '', lastName: '', email: '', password: '' };

export const SignupForm = ({ isLoading, handleSubmit }: SignUpFormsProps) => (
  <Card title={<Title level={3}>Signup</Title>}>
    <Formik initialValues={initialValues} validationSchema={SignupSchema} onSubmit={handleSubmit}>
      <Form className="form">
        <Flex className="form-control">
          <label htmlFor="firstName">First Name</label>
          <Field
            name="firstName"
            as={Input}
            id="firstName"
            placeholder="Enter your first name"
            disabled={isLoading}
          />
          <ErrorMessage name="firstName" component="div" className="form__error" />
        </Flex>

        <Flex className="form-control">
          <label htmlFor="lastName">Last Name</label>

          <Field
            name="lastName"
            as={Input}
            id="lastName"
            placeholder="Enter your last name"
            disabled={isLoading}
          />
          <ErrorMessage name="lastName" component="div" className="form__error" />
        </Flex>

        <Flex className="form-control">
          <label htmlFor="email">Email</label>
          <Field
            name="email"
            as={Input}
            id="email"
            placeholder="Enter your email"
            disabled={isLoading}
          />
          <ErrorMessage name="email" component="div" className="form__error" />
        </Flex>

        <Flex className="form-control">
          <label htmlFor="password">Password</label>
          <Field
            name="password"
            as={Password}
            id="password"
            placeholder="password"
            disabled={isLoading}
          />
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
);
