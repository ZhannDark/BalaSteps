import React, { useState } from 'react';
import { Form, Input, Button } from 'antd';
import 'antd/dist/reset.css';
import './forget-password.scss';
import AppHeader from '../main/header/header';

const ForgotPassword = () => {
  const [loading, setLoading] = useState(false);
  const onFinish = async () => {
    setLoading(true);
  };

  return (
    <>
      <AppHeader />
      <div className="forgot-password-container">
        <div className="forgot-password-form-container">
          <h2 className="forgot-password-title">Forgot password</h2>
          <p className="forgot-password-text">
            Lost your password? Please enter your email address. You will
            receive a link to create a new password via email.
          </p>
          <Form
            layout="vertical"
            className="forgot-password-form"
            onFinish={onFinish}
          >
            <Form.Item
              label="Email:"
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  message: 'Please enter a valid email',
                },
              ]}
            >
              <Input className="forgot-password-input" type="email" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={loading}
                className="forgot-password-button"
              >
                Reset password
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
