import React, { useState } from 'react';
import { Steps, Form, Input, Button, Card, notification } from 'antd';
import './forget-password.scss';
import AppHeader from '../main/header/header';
import { useNavigate } from 'react-router-dom';
import {
  MailTwoTone,
  SafetyCertificateTwoTone,
  LockTwoTone,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';

const { Step } = Steps;

const ResetPasswordFlow = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (
    type: 'success' | 'error' | 'warning',
    title: string,
    description: string
  ) => {
    api[type]({
      message: title,
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

  const handleSendOTP = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['email']);
      const res = await fetch(
        'https://project-back-81mh.onrender.com/auth/request-password-reset/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email: values.email }),
        }
      );

      if (res.ok) {
        openNotification('success', 'OTP Sent', 'Check your email for the code.');
        setEmail(values.email);
        setCurrentStep(1);
      } else {
        const data = await res.json();
        openNotification('error', 'Failed to Send OTP', data.message || 'Something went wrong.');
      }
    } catch (err) {
      openNotification('warning', 'Error', 'Please enter a valid email address.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['otp']);
      const res = await fetch(
        'https://project-back-81mh.onrender.com/auth/verify-password-reset-otp/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, otp: values.otp }),
        }
      );

      if (res.ok) {
        openNotification('success', 'OTP Verified', 'You can now set a new password.');
        setCurrentStep(2);
      } else {
        const data = await res.json();
        openNotification('error', 'Invalid OTP', data.message || 'The code is incorrect.');
      }
    } catch (err) {
      openNotification('warning', 'Error', 'Please enter the OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['password']);
      const res = await fetch(
        'https://project-back-81mh.onrender.com/auth/reset-password/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, new_password: values.password }),
        }
      );

      if (res.ok) {
        openNotification('success', 'Password Reset', 'You can now log in with your new password.');
        navigate('/login');
        form.resetFields();
      } else {
        const data = await res.json();
        openNotification('error', 'Reset Failed', data.message || 'Failed to reset password.');
      }
    } catch (err) {
      openNotification('warning', 'Error', 'Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const steps = [
    {
      title: 'Email',
      icon: <MailTwoTone twoToneColor="#6B8E23" />,
      content: (
        <>
          <Form.Item
            name="email"
            label="Email address"
            rules={[
              { required: true, type: 'email', message: 'Enter valid email' },
            ]}
          >
            <Input placeholder="Enter your email" />
          </Form.Item>
          <Button className="step-button" loading={loading} onClick={handleSendOTP}>
            Send OTP
          </Button>
        </>
      ),
    },
    {
      title: 'OTP',
      icon: <SafetyCertificateTwoTone twoToneColor="#6B8E23" />,
      content: (
        <>
          <Form.Item
            name="otp"
            label="Verification Code"
            rules={[
              { required: true, message: 'Enter the OTP sent to your email' },
            ]}
          >
            <Input placeholder="Enter OTP" />
          </Form.Item>
          <Button className="step-button" loading={loading} onClick={handleVerifyOTP}>
            Verify OTP
          </Button>
        </>
      ),
    },
    {
      title: 'New Password',
      icon: <LockTwoTone twoToneColor="#6B8E23" />,
      content: (
        <>
          <Form.Item
            name="password"
            label="New Password"
            rules={[{ required: true, message: 'Enter your new password' }]}
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Button className="step-button" loading={loading} onClick={handleResetPassword}>
            Reset Password
          </Button>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <AppHeader />
      <div className="reset-password-wrapper">
        <Card className="reset-card">
          <h2 className="reset-title">Reset your password</h2>
          <Steps current={currentStep} className="custom-steps">
            {steps.map((step) => (
              <Step key={step.title} title={step.title} icon={step.icon} />
            ))}
          </Steps>
          <Form layout="vertical" form={form} className="reset-form">
            {steps[currentStep].content}
          </Form>
        </Card>
      </div>
    </>
  );
};

export default ResetPasswordFlow;
