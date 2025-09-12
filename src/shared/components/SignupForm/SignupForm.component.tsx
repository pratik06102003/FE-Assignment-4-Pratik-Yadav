import { Link } from 'react-router-dom';

import { Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { ROUTES } from '@constants/routes.constants';

import { SIGNUP_FORM_DEFAULT_VALUES } from './SignupForm.constants';
import { SignupSchema } from './SignupForm.schema';
import type { SignUpFormsProps } from './SignupForm.types';

const { Title } = Typography;
const { Password } = Input;

export const SignupForm = ({ isLoading, handleSubmit }: SignUpFormsProps) => (
  <Card title={<Title level={3}>Signup</Title>}>
    <Formik
      initialValues={SIGNUP_FORM_DEFAULT_VALUES}
      validationSchema={SignupSchema}
      onSubmit={handleSubmit}
    >
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
