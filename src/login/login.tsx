import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import 'antd/dist/reset.css';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import AppHeader from '../main/header/header';

const Login = () => {
  const [loading, setLoading] = useState(false);
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

  const handleLogin = async (values: { email: string; password: string }) => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://project-back-81mh.onrender.com/auth/login/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        openNotification(
          'success',
          'Login successful',
          'You have successfully logged in.'
        );

        // localStorage.setItem('token', data.token);
        setTimeout(() => {
          navigate('/symptom-tracker');
        }, 3000);
      } else {
        openNotification(
          'error',
          'Login failed',
          data.message || 'Incorrect email or password.'
        );
      }
    } catch (error) {
      openNotification(
        'warning',
        'Something went wrong',
        'Network error. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <AppHeader />
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          <Form layout="vertical" className="login-form" onFinish={handleLogin}>
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
              rules={[
                { required: true, message: 'Please enter your password' },
              ]}
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
                loading={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
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
