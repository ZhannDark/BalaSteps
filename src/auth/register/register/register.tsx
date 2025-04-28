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
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

interface RegisterFormValues {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
  confirmPassword: string;
}

const Register = () => {
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

  const openNotification = (
    type: 'success' | 'error' | 'warning',
    message: string,
    description: string
  ) => {
    api[type]({
      message,
      description,
      icon:
        type === 'success' ? (
          <CheckCircleOutlined style={{ color: '#067908' }} />
        ) : type === 'error' ? (
          <CloseCircleOutlined style={{ color: '#d01843' }} />
        ) : (
          <ExclamationCircleOutlined style={{ color: '#da881c' }} />
        ),
    });
  };

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
      openNotification(
        'success',
        'Registration successful!',
        'You have successfully registered. Please verify your email.'
      );
      setTimeout(() => {
        navigate('/send-otp', { state: { email: variables.email } });
      }, 4000);
    },
    onError: (error: {
      response?: { data?: { message?: string; email?: string[] } };
    }) => {
      const emailError = error?.response?.data?.email?.[0];
      if (emailError === 'user with this email already exists.') {
        openNotification(
          'error',
          'Registration failed',
          'A user with this email already exists. Please try logging in.'
        );
      } else {
        openNotification(
          'error',
          'Registration failed',
          error?.response?.data?.message ||
            'An error occurred. Please try again.'
        );
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
      {contextHolder}
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
              rules={[
                { required: true, message: 'Please enter your password!' },
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
