import React from 'react';
import { Form, notification } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons';
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

  const loginMutation = useMutation({
    mutationFn: (values: LoginFormValues) =>
      axiosInstance.post('/auth/login/', values),
    onSuccess: async (response) => {
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
      queryClient.clear();
      await queryClient.invalidateQueries({ queryKey: ['profile'] });

      notification.success({
        message: 'Login successful',
        description: 'You have successfully logged in.',
        icon: <CheckCircleOutlined style={{ color: '#067908' }} />,
        duration: 3,
      });

      setTimeout(() => {
        navigate('/');
      }, 4000);
    },
    onError: (error: { response?: { data?: { message?: string } } }) => {
      notification.error({
        message: 'Login failed',
        description:
          error.response?.data?.message || 'Incorrect email or password.',
        icon: <CloseCircleOutlined style={{ color: '#d01843' }} />,
        duration: 3,
      });
    },
  });

  return (
    <>
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
