import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Steps, notification } from 'antd';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import axios, { AxiosError } from 'axios';
import {
  MailTwoTone,
  SafetyCertificateTwoTone,
  LockTwoTone,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from '@ant-design/icons';
import {
  ResetPasswordWrapper,
  StepButton,
  CustomSteps,
  ResetCard,
  ResetForm,
  ResetTitle,
} from './forget-password.styled';

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
      await axios.post(
        'https://project-back-81mh.onrender.com/auth/request-password-reset/',
        {
          email: values.email,
        }
      );
      openNotification('success', 'OTP Sent', 'Check your email for the code.');
      setEmail(values.email);
      setCurrentStep(1);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string; error?: string }>;

      const backendError = error.response?.data?.error;
      if (backendError === 'User is not verified.') {
        openNotification(
          'error',
          'Email Not Verified',
          'Please verify your email before resetting the password.'
        );
      } else {
        openNotification(
          'error',
          'Failed to Send OTP',
          error.response?.data?.message || 'Something went wrong.'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['otp']);
      await axios.post(
        'https://project-back-81mh.onrender.com/auth/verify-password-reset-otp/',
        {
          email,
          otp: values.otp,
        }
      );
      openNotification(
        'success',
        'OTP Verified',
        'You can now set a new password.'
      );
      setCurrentStep(2);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      openNotification(
        'error',
        'Invalid OTP',
        error.response?.data?.message || 'The code is incorrect.'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields(['password']);
      await axios.post(
        'https://project-back-81mh.onrender.com/auth/reset-password/',
        {
          email,
          new_password: values.password,
        }
      );
      openNotification(
        'success',
        'Password Reset',
        'You can now log in with your new password.'
      );
      form.resetFields();
      setTimeout(() => navigate('/login'), 2000);
    } catch (err: unknown) {
      const error = err as AxiosError<{ message?: string }>;
      openNotification(
        'error',
        'Reset Failed',
        error.response?.data?.message || 'Failed to reset password.'
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
          <StepButton loading={loading} onClick={handleSendOTP}>
            Continue
          </StepButton>
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
          <StepButton loading={loading} onClick={handleVerifyOTP}>
            Verify OTP
          </StepButton>
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
            hasFeedback
          >
            <Input.Password placeholder="Enter new password" />
          </Form.Item>
          <Form.Item
            label="Confirm Password"
            name="confirmPassword"
            dependencies={['password']}
            hasFeedback
            rules={[
              { required: true, message: 'Please confirm your password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Passwords do not match!'));
                },
              }),
            ]}
          >
            <Input.Password placeholder="Confirm your password" />
          </Form.Item>
          <StepButton loading={loading} onClick={handleResetPassword}>
            Reset Password
          </StepButton>
        </>
      ),
    },
  ];

  return (
    <>
      {contextHolder}
      <AppHeader />
      <ResetPasswordWrapper>
        <ResetCard>
          <ResetTitle>Reset your password</ResetTitle>
          <CustomSteps current={currentStep}>
            {steps.map((step) => (
              <Step key={step.title} title={step.title} icon={step.icon} />
            ))}
          </CustomSteps>
          <ResetForm layout="vertical" form={form}>
            {steps[currentStep].content}
          </ResetForm>
        </ResetCard>
      </ResetPasswordWrapper>
    </>
  );
};

export default ResetPasswordFlow;
