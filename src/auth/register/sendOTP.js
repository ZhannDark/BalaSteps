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
import { Form, Input, Button, Typography, notification } from 'antd';
import 'antd/dist/reset.css';
import './verify-otp.scss';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
const { Title, Text } = Typography;
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
                }, 5000);
            }
            else {
                openNotification('error', 'Verification failed', 'Invalid OTP. Please check your code and try again.');
            }
        }
        catch (error) {
            openNotification('warning', 'Something went wrong', 'An error occurred while verifying your email. Please try again.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "verify-otp-container" }, { children: _jsxs("div", Object.assign({ className: "verify-otp-box" }, { children: [_jsx(Title, Object.assign({ level: 2, className: "verify-otp-title" }, { children: "Validate email" })), _jsx(Text, Object.assign({ className: "verify-otp-text" }, { children: "For security reasons, we have sent a text message containing a code to verify your email." })), _jsxs(Form, Object.assign({ layout: "vertical", className: "verify-otp-form" }, { children: [_jsx(Form.Item, Object.assign({ label: "Verification code :", className: "otp-input-item" }, { children: _jsx(Input, { placeholder: "Enter OTP", value: otp, onChange: (e) => setOtp(e.target.value), className: "otp-input" }) })), _jsx(Button, Object.assign({ type: "primary", onClick: handleOTPSubmit, loading: loading, className: "verify-otp-button" }, { children: "Verify code" }))] }))] })) }))] }));
};
export default VerifyOTP;
//# sourceMappingURL=sendOTP.js.map