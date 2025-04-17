import React from 'react';
import { Form, Input, Button, notification } from 'antd';
import 'antd/dist/reset.css';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AppHeader from '../../main_page/header/header';

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
    mutationFn: (values: { email: string; password: string }) =>
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
    onError: (error: any) => {
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
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          <Form
            layout="vertical"
            className="login-form"
            onFinish={(values) => loginMutation.mutate(values)}
          >
            <Form.Item
              label="Email:"
              name="email"
              rules={[{ required: true, message: 'Please enter an email' }]}
            >
              <Input className="login-input" placeholder="Enter your email" />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              rules={[{ required: true, message: 'Please enter your password' }]}
            >
              <Input.Password
                className="login-input"
                placeholder="Enter password"
              />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="login-button"
                loading={loginMutation.isPending}
              >
                {loginMutation.isPending ? 'Logging in...' : 'Login'}
              </Button>
            </Form.Item>
          </Form>
          <div className="login-links">
            <Link to="/forgot-password" className="forgot-password">
              Forgot password?
            </Link>
            <Link to="/register" className="new-user">
              New user? Register
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
