import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import './register.scss';
import AppHeader from '../main/header/header';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification(); // Use the notification hook

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

  const onFinishRegister = async (values: any) => {
    const { firstName, lastName, email, password } = values;

    try {
      setLoading(true);

      const response = await fetch(
        'https://project-back-81mh.onrender.com/auth/register/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            full_name: `${firstName} ${lastName}`,
            password: password,
          }),
        }
      );

      if (response.ok) {
        openNotification(
          'success',
          'Registration successful!',
          'You have successfully registered. Please verify email address.'
        );
        setTimeout(() => {
          navigate('/send-otp', { state: { email: email } });
        }, 6000);
      }
      else {
        openNotification(
          'error',
          'Registration failed',
          'An error occurred while registering. Please try again.'
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
      {contextHolder} {/* This ensures notifications appear in the UI */}
      <AppHeader />
      <div className="register-container">
        <div className="register-form-container">
          <h2 className="register-title">Register</h2>
          <Form layout="vertical" className="register-form" onFinish={onFinishRegister}>
            <Form.Item label="First Name:" name="firstName" rules={[{ required: true, message: 'Please enter your first name!' }]}>
              <Input className="register-input" placeholder="Enter first name" />
            </Form.Item>
            <Form.Item label="Last Name:" name="lastName" rules={[{ required: true, message: 'Please enter your last name!' }]}>
              <Input className="register-input" placeholder="Enter last name" />
            </Form.Item>
            <Form.Item label="Email:" name="email" rules={[{ required: true, message: 'Please enter your email address!' }]}>
              <Input type="email" className="register-input" placeholder="Enter email" />
            </Form.Item>
            <Form.Item label="Password:" name="password" rules={[{ required: true, message: 'Please enter your password!' }]} hasFeedback>
              <Input.Password className="register-input" placeholder="Enter password" />
            </Form.Item>
            <Form.Item label="Confirm Password:" name="confirmPassword" dependencies={['password']} hasFeedback rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}>
              <Input.Password className="register-input" placeholder="Confirm your password" />
            </Form.Item>
            <div className="register-button-container">
              <Button type="primary" htmlType="submit" loading={loading} className="register-button">
                Register
              </Button>
              <span className="login-link-inline">
                Already have an account?{' '}
                <Link to="/login" className="login-link">
                  Login
                </Link>
              </span>
            </div>
          </Form>
        </div>
      </div>
    </>
  );
};

export default Register;
