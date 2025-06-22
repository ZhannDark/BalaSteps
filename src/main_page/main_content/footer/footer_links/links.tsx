import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import axios from '../../../../main_panel/axios-instance';
import { Input, Radio, Button, notification } from 'antd';
import { SendOutlined } from '@ant-design/icons';

const Wrapper = styled.div`
  max-width: 900px;
  margin: 80px auto;
  padding: 40px 20px;
  text-align: center;
  overflow-x: hidden;

  @media (max-width: 768px) {
    margin: 60px 10px;
    padding: 20px 10px;
  }
`;

const Title = styled.h1`
  font-size: 36px;
  font-family: 'Inknut Antiqua', serif;
  color: #4b163b;
  margin-bottom: 24px;

  @media (max-width: 768px) {
    font-size: 28px;
  }

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

const Text = styled.p`
  font-size: 18px;
  line-height: 1.8;
  color: #444;
  font-family: 'Newsreader', serif;

  @media (max-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 480px) {
    font-size: 15px;
    line-height: 1.6;
  }
`;

const CustomRadioGroup = styled(Radio.Group)`
  .ant-radio-checked .ant-radio-inner {
    background-color: #426b1f;
    border-color: #426b1f;
  }

  .ant-radio-inner {
    border-color: #ccc;
  }
`;

const BackButton = styled.button`
  margin-top: 40px;
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  background-color: #426b1f;
  color: white;
  font-family: 'Acme', sans-serif;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #629432;
  }
`;

export const Services = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Our Services</Title>
        <Text>
          Explore a wide range of services provided by BalaSteps — from
          personalized therapy recommendations to educational content and child
          progress tracking tools. We aim to support you with practical,
          impactful features every step of the way.
        </Text>
        <BackButton onClick={() => navigate(-1)}>← Back to Home</BackButton>
      </motion.div>
    </Wrapper>
  );
};

export const Support = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Support</Title>
        <Text>
          If you need assistance, we are here to help. Contact us for any
          technical issues, questions about using the platform, or guidance on
          how to get started. Our team is ready to support you with care and
          clarity.
        </Text>
        <BackButton onClick={() => navigate('/')}>← Back to Home</BackButton>
      </motion.div>
    </Wrapper>
  );
};

export const PrivacyPolicy = () => {
  const navigate = useNavigate();
  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Privacy Policy</Title>
        <Text>
          Your privacy is important to us. BalaSteps ensures that all data is
          securely stored and never shared with third parties without consent.
          Learn how we protect your information and your child data.
        </Text>
        <BackButton onClick={() => navigate(-1)}>← Back to Home</BackButton>
      </motion.div>
    </Wrapper>
  );
};

export const Contact = () => {
  const navigate = useNavigate();
  const [method, setMethod] = useState<'email' | 'phone'>('email');
  const [contactValue, setContactValue] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const validateContact = () => {
    if (method === 'email') {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      return emailRegex.test(contactValue);
    } else {
      const phoneRegex = /^[0-9]{10}$/; // only digits, since +7 is added separately
      return phoneRegex.test(contactValue);
    }
  };

  const handleSubmit = async () => {
    if (!validateContact()) {
      notification.error({
        message: 'Invalid Contact Information',
        description:
          method === 'email'
            ? 'Please enter a valid email address.'
            : 'Please enter a valid 10-digit phone number.',
      });
      return;
    }

    if (!message.trim()) {
      notification.error({
        message: 'Message is Empty',
        description: 'Please enter a message before submitting the form.',
      });
      return;
    }

    try {
      setLoading(true);
      await axios.post('/contact_us/contact/', {
        method,
        contact_value: method === 'phone' ? `+7${contactValue}` : contactValue,
        message,
      });

      notification.success({
        message: 'Message Sent Successfully',
        description:
          'Thank you for reaching out to us. We’ll get back to you shortly.',
      });

      setContactValue('');
      setMessage('');
    } catch {
      notification.error({
        message: 'Submission Failed',
        description:
          'Something went wrong while sending your message. Please try again later.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Wrapper>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Title>Contact Us</Title>
        <Text>
          Got a question? We’d love to hear from you. Reach out via our contact
          form.
        </Text>

        <CustomRadioGroup
          onChange={(e) => {
            setMethod(e.target.value);
            setContactValue('');
          }}
          value={method}
          style={{ marginBottom: 16 }}
        >
          <Radio value="email">Email</Radio>
          <Radio value="phone">Phone</Radio>
        </CustomRadioGroup>

        {method === 'email' ? (
          <Input
            placeholder="Enter your email"
            value={contactValue}
            onChange={(e) => setContactValue(e.target.value)}
            style={{ marginBottom: 16 }}
          />
        ) : (
          <Input
            addonBefore="+7"
            placeholder="Enter 10-digit phone number"
            maxLength={10}
            value={contactValue}
            onChange={(e) => {
              const digitsOnly = e.target.value.replace(/\D/g, '');
              if (digitsOnly.length <= 10) {
                setContactValue(digitsOnly);
              }
            }}
            style={{ marginBottom: 16 }}
          />
        )}

        <div style={{ position: 'relative' }}>
          <Input.TextArea
            rows={4}
            placeholder="Write your message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button
            type="primary"
            onClick={handleSubmit}
            loading={loading}
            disabled={!message.trim()}
            style={{
              position: 'absolute',
              bottom: 8,
              right: 8,
              backgroundColor: '#426b1f',
              color: !message.trim() ? 'darkgray' : 'white',
            }}
          >
            <SendOutlined style={{ fontSize: 18 }} />
          </Button>
        </div>

        <BackButton onClick={() => navigate(-1)} style={{ marginTop: 24 }}>
          ← Back to Home
        </BackButton>
      </motion.div>
    </Wrapper>
  );
};
