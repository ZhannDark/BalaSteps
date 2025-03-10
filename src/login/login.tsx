import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import 'antd/dist/reset.css';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import AppHeader from '../main/header/header';

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values: any) => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://project-back-81mh.onrender.com/auth/login/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (response.ok) {
        console.log('Login successful!');
        message.success('Login successful!');
        localStorage.setItem('token', data.token);
        navigate('/main_header');
      } else {
        message.error(data.message || 'Invalid email or password');
      }
    } catch (error) {
      console.error('Login error:', error);
      message.error('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader />
      <div className="login-container">
        <div className="login-form-container">
          <h2 className="login-title">Login</h2>
          <Form layout="vertical" className="login-form" onFinish={handleLogin}>
            <Form.Item
              label="Phone number:"
              name="phone-number"
              rules={[
                { required: true, message: 'Please enter a phone number' },
              ]}
            >
              <Input className="login-input" placeholder="Enter phone number" />
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
                onClick={() => navigate('/symptom-tracker')}
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
