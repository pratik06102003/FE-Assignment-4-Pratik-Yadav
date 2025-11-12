import { Link } from 'react-router-dom';

import { Button, Card, Flex, Input, Typography } from 'antd';

import { ErrorMessage, Field, Form, Formik } from 'formik';

import { ROUTES } from '@constants/routes.constants';

import { SIGNIN_FORM_DEFAULT_VALUES } from './SigninForm.constants';
import { SigninSchema } from './SigninForm.schema';
import type { SigninFormsProps } from './SigninForm.types';

const { Title } = Typography;
const { Password } = Input;

export const SigninForm = (props: SigninFormsProps) => {
  const { isLoading, handleSubmit } = props;

  return (
    <Card title={<Title level={3}>Signin</Title>}>
      <Formik
        initialValues={SIGNIN_FORM_DEFAULT_VALUES}
        validationSchema={SigninSchema}
        onSubmit={handleSubmit}
      >
        <Form className="form">
          <Flex className="form-control">
            <label htmlFor="email">Email</label>
            <Field
              id="email"
              name="email"
              as={Input}
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
              placeholder="Enter your password"
              disabled={isLoading}
            />
            <ErrorMessage name="password" component="div" className="form__error" />
          </Flex>

          <Button type="primary" htmlType="submit" loading={isLoading} block disabled={isLoading}>
            Sign In
          </Button>
          <Flex justify="center" align="center" gap={8} vertical>
            <Link to={ROUTES.RESET_PASSWORD} className="link">
              Reset Password
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
