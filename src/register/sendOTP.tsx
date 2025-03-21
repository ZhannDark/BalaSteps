import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, Typography, notification } from 'antd';
import 'antd/dist/reset.css';
import './verify-otp.scss';
import AppHeader from '../main/header/header';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { email } = location.state as { email: string };

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');
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

  const handleOTPSubmit = async () => {
    if (!otp) {
      openNotification('error', 'Missing OTP', 'Please enter the verification code!');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(
        'https://project-back-81mh.onrender.com/auth/verify-otp/',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email,
            otp: otp,
          }),
        }
      );

      if (response.ok) {
        openNotification(
          'success',
          'Verification successful',
          'Your email has been verified successfully. You can now login.'
        );
        setTimeout(() => {
          navigate('/login');
        }, 5000);
      } else {
        openNotification(
          'error',
          'Verification failed',
          'Invalid OTP. Please check your code and try again.'
        );
      }
    } catch (error) {
      openNotification(
        'warning',
        'Something went wrong',
        'An error occurred while verifying your email. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <AppHeader />
      <div className="verify-otp-container">
        <div className="verify-otp-box">
          <Title level={2} className="verify-otp-title">Validate email</Title>
          <Text className="verify-otp-text">
            For security reasons, we have sent a text message containing a code to verify your email.
          </Text>
          <Form layout="vertical" className="verify-otp-form">
            <Form.Item label="Verification code :" className="otp-input-item">
              <Input
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="otp-input"
              />
            </Form.Item>
            <Button
              type="primary"
              onClick={handleOTPSubmit}
              loading={loading}
              className="verify-otp-button"
            >
              Verify code
            </Button>
          </Form>
        </div>
      </div>
    </>
  );
};

export default VerifyOTP;
