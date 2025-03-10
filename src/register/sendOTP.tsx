import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Typography } from 'antd';
import 'antd/dist/reset.css';
import './verify-otp.scss';
import AppHeader from '../main/header/header';

const { Title, Text } = Typography;

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { phoneNumber } = location.state as { phoneNumber: string };

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleOTPSubmit = async () => {
    if (!otp) {
      message.error('Please enter the verification code!');
      return;
    }
    console.log(phoneNumber);
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
            phone_number: phoneNumber,
            otp: otp,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        message.success('Verification successful!');
        console.log('API Response:', data);

        // You can now redirect to another page if needed
        navigate('/symptom-tracker');
      } else {
        message.error(data?.message || 'Verification failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      message.error('An error occurred while verifying the code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AppHeader></AppHeader>
      <div className="verify-otp-container">
        <div className="verify-otp-box">
          <Title level={2} className="verify-otp-title">
            Validate number
          </Title>
          <Text className="verify-otp-text">
            For security reasons, we will send a text message containing a code
            to verify your mobile number.
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
