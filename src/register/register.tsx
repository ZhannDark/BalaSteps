import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import './register.scss';
import AppHeader from '../main/header/header';

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinishRegister = async (values: any) => {
    const { firstName, lastName, phoneNumber, password } = values;

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
            phone_number: phoneNumber,
            full_name: `${firstName} ${lastName}`,
            password: password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Registration successful!');
        message.success('Registration successful!');
        navigate('/send-otp', { state: { phoneNumber: phoneNumber } });
      } else {
        console.log('Response Status:', response.status);
        console.log('Response Data:', data);
        message.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Registration Error:', error);
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="register-container">
        <div className="register-form-container">
          <h2 className="register-title">Register</h2>

          <Form
            layout="vertical"
            className="register-form"
            onFinish={onFinishRegister}
          >
            <Form.Item
              label="First Name:"
              name="firstName"
              rules={[
                { required: true, message: 'Please enter your first name!' },
              ]}
            >
              <Input
                className="register-input"
                placeholder="Enter first name"
              />
            </Form.Item>
            <Form.Item
              label="Last Name:"
              name="lastName"
              rules={[
                { required: true, message: 'Please enter your last name!' },
              ]}
            >
              <Input className="register-input" placeholder="Enter last name" />
            </Form.Item>
            <Form.Item
              label="Phone Number:"
              name="phoneNumber"
              rules={[
                { required: true, message: 'Please enter your phone number!' },
              ]}
            >
              <Input
                className="register-input"
                placeholder="Enter phone number"
              />
            </Form.Item>
            <Form.Item
              label="Password:"
              name="password"
              rules={[
                { required: true, message: 'Please enter your password!' },
              ]}
              hasFeedback
            >
              <Input.Password
                className="register-input"
                placeholder="Enter password"
              />
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
              <Input.Password
                className="register-input"
                placeholder="Confirm your password"
              />
            </Form.Item>
            <div className="register-button-container">
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
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
