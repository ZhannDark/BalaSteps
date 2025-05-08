import React from 'react';
import { Form, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import AppHeader from '../../../main_page/main_page_header/main_page_header';
import {
  RegisterContainer,
  RegisterTitle,
  RegisterFormContainer,
  RegisterInput,
  RegisterPassword,
  RegisterButtonContainer,
  RegisterButton,
  LoginLink,
} from './register.styled';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';

interface RegisterFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const navigate = useNavigate();

  const registerMutation = useMutation({
    mutationFn: (values: {
      email: string;
      firstName: string;
      lastName: string;
      password: string;
    }) =>
      axios.post('https://project-back-81mh.onrender.com/auth/register/', {
        email: values.email,
        full_name: `${values.firstName} ${values.lastName}`,
        password: values.password,
      }),
    onSuccess: (_, variables) => {
      notification.success({
        message: 'Registration successful!',
        description:
          'You have successfully registered. Please verify your email.',
        icon: <CheckCircleOutlined style={{ color: '#067908' }} />,
        duration: 3,
      });
      setTimeout(() => {
        navigate('/send-otp', { state: { email: variables.email } });
      }, 4000);
    },
    onError: (error: {
      response?: { data?: { message?: string; email?: string[] } };
    }) => {
      const emailError = error?.response?.data?.email?.[0];
      if (emailError === 'user with this email already exists.') {
        notification.error({
          message: 'Registration failed',
          description:
            'A user with this email already exists. Please try logging in.',
          icon: <CloseCircleOutlined style={{ color: '#d01843' }} />,
          duration: 3,
        });
      } else {
        notification.error({
          message: 'Registration failed',
          description:
            error?.response?.data?.message ||
            'An error occurred. Please try again.',
          icon: <CloseCircleOutlined style={{ color: '#d01843' }} />,
          duration: 3,
        });
      }
    },
  });

  const onFinishRegister = ({
    email,
    firstName,
    lastName,
    password,
  }: RegisterFormValues) => {
    registerMutation.mutate({ email, firstName, lastName, password });
  };

  return (
    <>
      <AppHeader />
      <RegisterContainer>
        <RegisterFormContainer>
          <RegisterTitle>Register</RegisterTitle>
          <Form layout="vertical" onFinish={onFinishRegister}>
            <Form.Item
              label="First Name:"
              name="firstName"
              rules={[
                { required: true, message: 'Please enter your first name!' },
              ]}
            >
              <RegisterInput placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              label="Last Name:"
              name="lastName"
              rules={[
                { required: true, message: 'Please enter your last name!' },
              ]}
            >
              <RegisterInput placeholder="Enter last name" />
            </Form.Item>
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email address!' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address!',
                },
              ]}
            >
              <RegisterInput placeholder="Enter email" type="email" />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              tooltip="Use 8+ chars including uppercase, lowercase, number & symbol"
              rules={[
                { required: true, message: 'Please enter your password!' },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    'Password must be at least 8 characters and contain uppercase, lowercase, number, and symbol.',
                },
              ]}
              hasFeedback
            >
              <RegisterPassword placeholder="Enter password" />
            </Form.Item>
            <Form.Item
              label="Confirm Password:"
              name="confirmPassword"
              dependencies={['password']}
              hasFeedback
              rules={[
                { required: true, message: 'Please confirm your password!' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('Passwords do not match!'));
                  },
                }),
              ]}
            >
              <RegisterPassword placeholder="Confirm your password" />
            </Form.Item>
            <RegisterButtonContainer>
              <RegisterButton
                type="primary"
                htmlType="submit"
                loading={registerMutation.isPending}
              >
                Continue
              </RegisterButton>
              <span className="login-link-inline">
                Already have an account?{' '}
                <LoginLink to="/login">Login</LoginLink>
              </span>
            </RegisterButtonContainer>
          </Form>
        </RegisterFormContainer>
      </RegisterContainer>
    </>
  );
};

export default Register;
