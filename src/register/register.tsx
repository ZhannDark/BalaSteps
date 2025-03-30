import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import './register.scss';
import AppHeader from '../main/header/header';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

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
      }, 6000);
    },
    onError: (error: any) => {
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
          error?.response?.data?.message || 'An error occurred. Please try again.'
        );
      }
    },
  });

  const onFinishRegister = (values: any) => {
    registerMutation.mutate({
      email: values.email,
      firstName: values.firstName,
      lastName: values.lastName,
      password: values.password,
    });
  };

  return (
    <>
      {contextHolder}
      <AppHeader />
      <div className="register-container">
        <div className="register-form-container">
          <h2 className="register-title">Register</h2>
          <Form layout="vertical" className="register-form" onFinish={onFinishRegister}>
            <Form.Item
              label="First Name:"
              name="firstName"
              rules={[{ required: true, message: 'Please enter your first name!' }]}
            >
              <Input className="register-input" placeholder="Enter first name" />
            </Form.Item>
            <Form.Item
              label="Last Name:"
              name="lastName"
              rules={[{ required: true, message: 'Please enter your last name!' }]}
            >
              <Input className="register-input" placeholder="Enter last name" />
            </Form.Item>
            <Form.Item
              label="Email:"
              name="email"
              rules={[{ required: true, message: 'Please enter your email address!' }]}
            >
              <Input type="email" className="register-input" placeholder="Enter email" />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
              hasFeedback
            >
              <Input.Password className="register-input" placeholder="Enter password" />
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
              <Input.Password className="register-input" placeholder="Confirm your password" />
            </Form.Item>
            <div className="register-button-container">
              <Button
                type="primary"
                htmlType="submit"
                loading={registerMutation.isPending}
                className="register-button"
              >
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
