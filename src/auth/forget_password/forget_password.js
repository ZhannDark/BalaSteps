var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, Fragment as _Fragment, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Input, Steps, notification } from 'antd';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import axios from 'axios';
import { MailTwoTone, SafetyCertificateTwoTone, LockTwoTone, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
import { ResetPasswordWrapper, StepButton, CustomSteps, ResetCard, ResetForm, ResetTitle, } from './forget-password.styled';
const { Step } = Steps;
const ResetPasswordFlow = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, title, description) => {
        api[type]({
            message: title,
            description,
            icon: type === 'success' ? (_jsx(CheckCircleOutlined, { style: { color: '#067908' } })) : type === 'error' ? (_jsx(CloseCircleOutlined, { style: { color: '#d01843' } })) : (_jsx(ExclamationCircleOutlined, { style: { color: '#da881c' } })),
        });
    };
    const handleSendOTP = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        setLoading(true);
        try {
            const values = yield form.validateFields(['email']);
            yield axios.post('https://project-back-81mh.onrender.com/auth/request-password-reset/', {
                email: values.email,
            });
            openNotification('success', 'OTP Sent', 'Check your email for the code.');
            setEmail(values.email);
            setCurrentStep(1);
        }
        catch (err) {
            const error = err;
            const backendError = (_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.error;
            if (backendError === 'User is not verified.') {
                openNotification('error', 'Email Not Verified', 'Please verify your email before resetting the password.');
            }
            else {
                openNotification('error', 'Failed to Send OTP', ((_d = (_c = error.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || 'Something went wrong.');
            }
        }
        finally {
            setLoading(false);
        }
    });
    const handleVerifyOTP = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        setLoading(true);
        try {
            const values = yield form.validateFields(['otp']);
            yield axios.post('https://project-back-81mh.onrender.com/auth/verify-password-reset-otp/', {
                email,
                otp: values.otp,
            });
            openNotification('success', 'OTP Verified', 'You can now set a new password.');
            setCurrentStep(2);
        }
        catch (err) {
            const error = err;
            openNotification('error', 'Invalid OTP', ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'The code is incorrect.');
        }
        finally {
            setLoading(false);
        }
    });
    const handleResetPassword = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        setLoading(true);
        try {
            const values = yield form.validateFields(['password']);
            yield axios.post('https://project-back-81mh.onrender.com/auth/reset-password/', {
                email,
                new_password: values.password,
            });
            openNotification('success', 'Password Reset', 'You can now log in with your new password.');
            form.resetFields();
            setTimeout(() => navigate('/login'), 2000);
        }
        catch (err) {
            const error = err;
            openNotification('error', 'Reset Failed', ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Failed to reset password.');
        }
        finally {
            setLoading(false);
        }
    });
    const steps = [
        {
            title: 'Email',
            icon: _jsx(MailTwoTone, { twoToneColor: "#6B8E23" }),
            content: (_jsxs(_Fragment, { children: [_jsx(Form.Item, { name: "email", label: "Email address", rules: [
                            { required: true, type: 'email', message: 'Enter valid email' },
                        ], children: _jsx(Input, { placeholder: "Enter your email" }) }), _jsx(StepButton, { loading: loading, onClick: handleSendOTP, children: "Continue" })] })),
        },
        {
            title: 'OTP',
            icon: _jsx(SafetyCertificateTwoTone, { twoToneColor: "#6B8E23" }),
            content: (_jsxs(_Fragment, { children: [_jsx(Form.Item, { name: "otp", label: "Verification Code", rules: [
                            { required: true, message: 'Enter the OTP sent to your email' },
                        ], children: _jsx(Input, { placeholder: "Enter OTP" }) }), _jsx(StepButton, { loading: loading, onClick: handleVerifyOTP, children: "Verify OTP" })] })),
        },
        {
            title: 'New Password',
            icon: _jsx(LockTwoTone, { twoToneColor: "#6B8E23" }),
            content: (_jsxs(_Fragment, { children: [_jsx(Form.Item, { name: "password", label: "New Password", rules: [{ required: true, message: 'Enter your new password' }], hasFeedback: true, children: _jsx(Input.Password, { placeholder: "Enter new password" }) }), _jsx(Form.Item, { label: "Confirm Password", name: "confirmPassword", dependencies: ['password'], hasFeedback: true, rules: [
                            { required: true, message: 'Please confirm your password!' },
                            ({ getFieldValue }) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('Passwords do not match!'));
                                },
                            }),
                        ], children: _jsx(Input.Password, { placeholder: "Confirm your password" }) }), _jsx(StepButton, { loading: loading, onClick: handleResetPassword, children: "Reset Password" })] })),
        },
    ];
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx(ResetPasswordWrapper, { children: _jsxs(ResetCard, { children: [_jsx(ResetTitle, { children: "Reset your password" }), _jsx(CustomSteps, { current: currentStep, children: steps.map((step) => (_jsx(Step, { title: step.title, icon: step.icon }, step.title))) }), _jsx(ResetForm, { layout: "vertical", form: form, children: steps[currentStep].content })] }) })] }));
};
export default ResetPasswordFlow;
