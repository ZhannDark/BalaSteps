import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, Input, Button, message, Typography } from 'antd';
import { ConfirmationResult } from 'firebase/auth';
import 'antd/dist/reset.css';
import './verify-otp.scss';
import { auth } from '../firebaseConfig';

const { Title, Text } = Typography;

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const { phoneNumber, confirmation, userData } = location.state as {
    phoneNumber: string;
    confirmation: ConfirmationResult;
    userData: any;
  };

  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState('');

  const handleOTPSubmit = async () => {
    if (!otp) {
      message.error('Please enter the verification code!');
      return;
    }

    setLoading(true);
    try {
      // Confirm the OTP
      const result = await confirmation.confirm(otp);
      console.log('OTP verified:', result);

      // Send POST request to backend with user data
      const response = await fetch('https://project-back-81mh.onrender.com/auth/register/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone_number: userData.phoneNumber, // Corrected property name
          full_name: userData.full_name,
          password: userData.password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        message.success('Registration successful!');
        navigate('/login');
      } else {
        message.error(data.message || 'Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('OTP Verification Error:', error);
      message.error('Invalid OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="verify-otp-container">
      <div className="verify-otp-box">
        <Title level={2} className="verify-otp-title">Validate number</Title>
        <Text className="verify-otp-text">
          For security reasons, we will send a text message containing a code to verify your mobile number.
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
            Submit Code
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default VerifyOTP;
