import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { RecaptchaVerifier, signInWithPhoneNumber, Auth, getAuth } from 'firebase/auth';
import { app } from '../firebaseConfig';  // Import app instead of auth
import 'antd/dist/reset.css';
import './register.scss';

const auth: Auth = getAuth(app);  // Explicitly define auth as Auth type

const Register = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const onFinishRegister = async (values: any) => {
    const { phoneNumber } = values;

    try {
      setLoading(true);

      const appVerifier = new RecaptchaVerifier('recaptcha-container', {
        size: 'invisible',
      }, auth);  // Correct usage of RecaptchaVerifier

      const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);

      message.success('OTP sent successfully!');

      navigate('/verify-otp', {
        state: {
          phoneNumber,
          confirmation: confirmationResult,
          userData: values
        }
      });
    } catch (error) {
      console.error('Error sending OTP:', error);
      message.error('Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <div className="register-form-container">
        <h2 className="register-title">Register</h2>

        <Form layout="vertical" className="register-form" onFinish={onFinishRegister}>
          <Form.Item label="First Name:" name="firstName" rules={[{ required: true }]}>
            <Input className="register-input" />
          </Form.Item>
          <Form.Item label="Last Name:" name="lastName" rules={[{ required: true }]}>
            <Input className="register-input" />
          </Form.Item>
          <Form.Item label="Phone Number:" name="phoneNumber" rules={[{ required: true }]}>
            <Input className="register-input" />
          </Form.Item>
          <Form.Item label="Password:" name="password" rules={[{ required: true }]}>
            <Input.Password className="register-input" />
          </Form.Item>
          <Button type="primary" htmlType="submit" loading={loading} className="register-button">
            Register
          </Button>
        </Form>

        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
};

export default Register;
