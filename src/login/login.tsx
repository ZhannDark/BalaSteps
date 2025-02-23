import React from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';
import { Link } from 'react-router-dom';
import './login.scss';

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form-container">
        <h2 className="login-title">Login</h2>
        <Form layout="vertical" className="login-form">
          <Form.Item
            label="Email:"
            name="email"
            rules={[{ required: true, type: 'email' }]}
          >
            <Input className="login-input" type="email" />
          </Form.Item>
          <Form.Item
            label="Password:"
            name="password"
            rules={[{ required: true }]}
          >
            <Input.Password className="login-input" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" className="login-button">
              Login
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
  );
};

export default Login;
