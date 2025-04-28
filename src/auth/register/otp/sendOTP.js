var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Form, notification } from 'antd';
import 'antd/dist/reset.css';
import AppHeader from '../../../main_page/main_page_header/main_page_header';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
import { Container, OTPInput, Box, SubmitButton, StyledTitle, StyledText, RegisterButtonContainer, } from './sendOTP.styled';
const VerifyOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { email } = location.state;
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            icon: type === 'success' ? (_jsx(CheckCircleOutlined, { style: { color: '#067908' } })) : type === 'error' ? (_jsx(CloseCircleOutlined, { style: { color: '#d01843' } })) : (_jsx(ExclamationCircleOutlined, { style: { color: '#da881c' } })),
        });
    };
    const handleOTPSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!otp) {
            openNotification('error', 'Missing OTP', 'Please enter the verification code!');
            return;
        }
        setLoading(true);
        try {
            const response = yield fetch('https://project-back-81mh.onrender.com/auth/verify-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    otp: otp,
                }),
            });
            if (response.ok) {
                openNotification('success', 'Verification successful', 'Your email has been verified successfully. You can now login.');
                setTimeout(() => {
                    navigate('/login');
                }, 4000);
            }
            else {
                openNotification('error', 'Verification failed', 'Invalid OTP. Please check your code and try again.');
            }
        }
        catch (error) {
            if (error instanceof Error) {
                openNotification('warning', 'Something went wrong', error.message ||
                    'An error occurred while verifying your email. Please try again.');
            }
            else {
                openNotification('warning', 'Something went wrong', 'An unexpected error occurred.');
            }
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx(Container, { children: _jsxs(Box, { children: [_jsx(StyledTitle, { level: 2, children: "Validate email" }), _jsx(StyledText, { children: "For security reasons, we have sent a text message containing a code to verify your email address." }), _jsxs(Form, { layout: "vertical", onFinish: handleOTPSubmit, children: [_jsx(Form.Item, { label: "Verification code :", children: _jsx(OTPInput, { placeholder: "Enter OTP", value: otp, onChange: (e) => setOtp(e.target.value) }) }), _jsx(RegisterButtonContainer, { children: _jsx(SubmitButton, { type: "primary", htmlType: "submit", loading: loading, children: "Verify email" }) })] })] }) })] }));
};
export default VerifyOTP;
