import React, { useState } from 'react';
import {
  Steps,
  Form,
  Input,
  Button,
  Card,
  notification,
} from 'antd';
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
import axios from 'axios';

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
      await axios.post('https://project-back-81mh.onrender.com/auth/request-password-reset/', {
        email: values.email,
      });
      openNotification('success', 'OTP Sent', 'Check your email for the code.');
      setEmail(values.email);
      setCurrentStep(1);
    } catch (err: any) {
      openNotification(
        'error',
        'Failed to Send OTP',
        err?.response?.data?.message || 'Something went wrong.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['otp']);
      await axios.post('https://project-back-81mh.onrender.com/auth/verify-password-reset-otp/', {
        email,
        otp: values.otp,
      });
      openNotification('success', 'OTP Verified', 'You can now set a new password.');
      setCurrentStep(2);
    } catch (err: any) {
      openNotification(
        'error',
        'Invalid OTP',
        err?.response?.data?.message || 'The code is incorrect.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['password']);
      await axios.post('https://project-back-81mh.onrender.com/auth/reset-password/', {
        email,
        new_password: values.password,
      });
      openNotification('success', 'Password Reset', 'You can now log in with your new password.');
      form.resetFields();
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: any) {
      openNotification(
        'error',
        'Reset Failed',
        err?.response?.data?.message || 'Failed to reset password.'
      );
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
