import React, { useState } from 'react';
import { Form, Input, Button, Steps } from 'antd';
import 'antd/dist/reset.css';
import './register.scss';
import { Link } from 'react-router-dom';

const { Step } = Steps;

const Register = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onFinishParent = (values: any) => {
    console.log('Parent Info:', values);
    setCurrentStep(1);
  };

  const onFinishChild = (values: any) => {
    console.log('Child Info:', values);
    alert('Registration Complete!');
  };

  return (
    <div className="register-container">
      <Steps current={currentStep} className="register-steps">
        <Step title={<span className="step-title">Parent Registration</span>} />
        <Step title={<span className="step-title">Child Registration</span>} />
      </Steps>

      <div className="register-form-container">
        <h2 className="register-title">Register</h2>

        {currentStep === 0 ? (
          <Form layout="vertical" className="register-form" onFinish={onFinishParent}>
            <Form.Item label="First name :" name="firstName" rules={[{ required: true, message: 'Please enter your first name!' }]}>
              <Input className="register-input" />
            </Form.Item>
            <Form.Item label="Last name :" name="lastName" rules={[{ required: true, message: 'Please enter your last name!' }]}>
              <Input className="register-input" />
            </Form.Item>
            <Form.Item label="Email:" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email!' }]}>
              <Input className="register-input" type="email" />
            </Form.Item>
            <Form.Item label="Phone number:" name="phoneNumber" rules={[{ required: true, message: 'Please enter your phone number!' }]}>
              <Input type="number" className="register-input" />
            </Form.Item>
            <Form.Item label="Password:" name="password" rules={[{ required: true, message: 'Please enter your password!' }]} hasFeedback>
              <Input.Password className="register-input" type="password"/>
            </Form.Item>
            <Form.Item
              label="Confirm Password :"
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
              <Input.Password className="register-input password-mismatch" />
            </Form.Item>

            <Form.Item>
              <div className="register-button-container">
                <Button type="primary" htmlType="submit" className="register-button">
                  Continue
                </Button>
                <p className="login-link">
                  Already have an account? <Link to="/login" className="login-link">Login</Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        ) : (
          <Form layout="vertical" className="register-form" onFinish={onFinishChild}>
            <Form.Item label="First name :" name="childFirstName" rules={[{ required: true, message: 'Please enter your child\'s first name!' }]}>
              <Input className="register-input" />
            </Form.Item>

            <Form.Item label="Last name :" name="childLastName" rules={[{ required: true, message: 'Please enter your child\'s last name!' }]}>
              <Input className="register-input" />
            </Form.Item>

            <Form.Item label="Age:" name="childAge" rules={[{ required: true, message: 'Please enter your child\'s age!' }]}>
              <Input type="number" className="register-input" />
            </Form.Item>

            <Form.Item label="City:" name="childCity" rules={[{ required: true, message: 'Please enter your city!' }]}>
              <Input className="register-input" />
            </Form.Item>

            <Form.Item label="Child’s Diagnose :" name="childDiagnose" rules={[{ required: true, message: 'Please enter the diagnosis!' }]}>
              <Input className="register-input" />
            </Form.Item>

            <Form.Item label="Current Therapy or Support :" name="childTherapy">
              <Input className="register-input" />
            </Form.Item>

            <Form.Item>
              <div className="register-button-container">
                <Button type="primary" htmlType="submit" className="register-button">
                  Register
                </Button>
                <p className="login-link">
                  Already have an account? <Link to="/login" className="login-link">Login</Link>
                </p>
              </div>
            </Form.Item>
          </Form>
        )}
      </div>
    </div>
  );
};

export default Register;
