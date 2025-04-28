import React from 'react';
import { Form, notification } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import {
  LoginContainer,
  LoginFormContainer,
  LoginTitle,
  StyledButton,
  StyledInput,
  StyledPasswordInput,
  StyledLink,
  LoginLinks,
} from './login.styled';

interface LoginFormValues {
  email: string;
  password: string;
}

const Login = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

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

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      axios.post('https://project-back-81mh.onrender.com/auth/login/', values),
    onSuccess: (response) => {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      openNotification(
        'success',
        'Login successful',
        'You have successfully logged in.'
      );
      setTimeout(() => {
        navigate('/symptom-tracker');
      }, 3000);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      openNotification(
        'error',
        'Login failed',
        error.response?.data?.message || 'Incorrect email or password.'
      );
    },
  });

  return (
    <>
      {contextHolder}
      <AppHeader />
      <LoginContainer>
        <LoginFormContainer>
          <LoginTitle>Login</LoginTitle>
          <Form
            layout="vertical"
            onFinish={(values: LoginFormValues) => loginMutation.mutate(values)}
          >
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                { required: true, message: 'Please enter an email' },
                {
                  type: 'email',
                  message: 'Please enter a valid email address',
                },
              ]}
            >
              <StyledInput placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
            >
              <StyledPasswordInput placeholder="Enter password" />
            </Form.Item>
            <Form.Item>
              <StyledButton
                type="primary"
                htmlType="submit"
                loading={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </StyledButton>
            </Form.Item>
          </Form>
          <LoginLinks>
            <StyledLink to="/forgot-password">Forgot password?</StyledLink>
            <StyledLink to="/register">New user? Register</StyledLink>
          </LoginLinks>
        </LoginFormContainer>
      </LoginContainer>
    </>
  );
};

export default Login;
