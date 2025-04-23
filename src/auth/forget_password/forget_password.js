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
import { Steps, Form, Input, Button, Card, notification, } from 'antd';
import './forget-password.scss';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import { useNavigate } from 'react-router-dom';
import { MailTwoTone, SafetyCertificateTwoTone, LockTwoTone, CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
import axios from 'axios';
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
        var _a, _b;
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
            openNotification('error', 'Failed to Send OTP', ((_b = (_a = err === null || err === void 0 ? void 0 : err.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Something went wrong.');
        }
        finally {
            setLoading(false);
        }
    });
    const handleVerifyOTP = () => __awaiter(void 0, void 0, void 0, function* () {
        var _c, _d;
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
            openNotification('error', 'Invalid OTP', ((_d = (_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data) === null || _d === void 0 ? void 0 : _d.message) || 'The code is incorrect.');
        }
        finally {
            setLoading(false);
        }
    });
    const handleResetPassword = () => __awaiter(void 0, void 0, void 0, function* () {
        var _e, _f;
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
            openNotification('error', 'Reset Failed', ((_f = (_e = err === null || err === void 0 ? void 0 : err.response) === null || _e === void 0 ? void 0 : _e.data) === null || _f === void 0 ? void 0 : _f.message) || 'Failed to reset password.');
        }
        finally {
            setLoading(false);
        }
    });
    const steps = [
        {
            title: 'Email',
            icon: _jsx(MailTwoTone, { twoToneColor: "#6B8E23" }),
            content: (_jsxs(_Fragment, { children: [_jsx(Form.Item, Object.assign({ name: "email", label: "Email address", rules: [
                            { required: true, type: 'email', message: 'Enter valid email' },
                        ] }, { children: _jsx(Input, { placeholder: "Enter your email" }) })), _jsx(Button, Object.assign({ className: "step-button", loading: loading, onClick: handleSendOTP }, { children: "Send OTP" }))] })),
        },
        {
            title: 'OTP',
            icon: _jsx(SafetyCertificateTwoTone, { twoToneColor: "#6B8E23" }),
            content: (_jsxs(_Fragment, { children: [_jsx(Form.Item, Object.assign({ name: "otp", label: "Verification Code", rules: [
                            { required: true, message: 'Enter the OTP sent to your email' },
                        ] }, { children: _jsx(Input, { placeholder: "Enter OTP" }) })), _jsx(Button, Object.assign({ className: "step-button", loading: loading, onClick: handleVerifyOTP }, { children: "Verify OTP" }))] })),
        },
        {
            title: 'New Password',
            icon: _jsx(LockTwoTone, { twoToneColor: "#6B8E23" }),
            content: (_jsxs(_Fragment, { children: [_jsx(Form.Item, Object.assign({ name: "password", label: "New Password", rules: [{ required: true, message: 'Enter your new password' }] }, { children: _jsx(Input.Password, { placeholder: "Enter new password" }) })), _jsx(Button, Object.assign({ className: "step-button", loading: loading, onClick: handleResetPassword }, { children: "Reset Password" }))] })),
        },
    ];
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "reset-password-wrapper" }, { children: _jsxs(Card, Object.assign({ className: "reset-card" }, { children: [_jsx("h2", Object.assign({ className: "reset-title" }, { children: "Reset your password" })), _jsx(Steps, Object.assign({ current: currentStep, className: "custom-steps" }, { children: steps.map((step) => (_jsx(Step, { title: step.title, icon: step.icon }, step.title))) })), _jsx(Form, Object.assign({ layout: "vertical", form: form, className: "reset-form" }, { children: steps[currentStep].content }))] })) }))] }));
};
export default ResetPasswordFlow;
//# sourceMappingURL=forget_password.js.map