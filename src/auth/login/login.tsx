import React from 'react';
import { Form, notification } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import axiosInstance from '../../main_panel/axios-instance';
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
  const queryClient = useQueryClient();
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
      axiosInstance.post('/auth/login/', values),
    onSuccess: async (response) => {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      queryClient.clear();
      await queryClient.invalidateQueries({ queryKey: ['profile'] });

      openNotification(
        'success',
        'Login successful',
        'You have successfully logged in.'
      );

      navigate('/symptom-tracker');
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
                { type: 'email', message: 'Invalid email address' },
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
