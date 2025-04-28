import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, notification } from 'antd';
import 'antd/dist/reset.css';
import AppHeader from '../../../main_page/main_page_header/main_page_header';
import {
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

import {
  Container,
  OTPInput,
  Box,
  SubmitButton,
  StyledTitle,
  StyledText,
  RegisterButtonContainer,
} from './sendOTP.styled';

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
      openNotification(
        'error',
        'Missing OTP',
        'Please enter the verification code!'
      );
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
        }, 4000);
      } else {
        openNotification(
          'error',
          'Verification failed',
          'Invalid OTP. Please check your code and try again.'
        );
      }
    } catch (error: unknown) {
      if (error instanceof Error) {
        openNotification(
          'warning',
          'Something went wrong',
          error.message ||
            'An error occurred while verifying your email. Please try again.'
        );
      } else {
        openNotification(
          'warning',
          'Something went wrong',
          'An unexpected error occurred.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {contextHolder}
      <AppHeader />
      <Container>
        <Box>
          <StyledTitle level={2}>Validate email</StyledTitle>
          <StyledText>
            For security reasons, we have sent a text message containing a code
            to verify your email address.
          </StyledText>
          <Form layout="vertical" onFinish={handleOTPSubmit}>
            <Form.Item label="Verification code :">
              <OTPInput
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Form.Item>
            <RegisterButtonContainer>
              <SubmitButton type="primary" htmlType="submit" loading={loading}>
                Verify email
              </SubmitButton>
            </RegisterButtonContainer>
          </Form>
        </Box>
      </Container>
    </>
  );
};

export default VerifyOTP;
