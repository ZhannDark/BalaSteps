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
import { Form, Input, Button, message, Typography } from 'antd';
import 'antd/dist/reset.css';
import './verify-otp.scss';
import AppHeader from '../main/header/header';
const { Title, Text } = Typography;
const VerifyOTP = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { phoneNumber } = location.state;
    const [loading, setLoading] = useState(false);
    const [otp, setOtp] = useState('');
    const handleOTPSubmit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!otp) {
            message.error('Please enter the verification code!');
            return;
        }
        console.log(phoneNumber);
        setLoading(true);
        try {
            const response = yield fetch('https://project-back-81mh.onrender.com/auth/verify-otp/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    otp: otp,
                }),
            });
            const data = yield response.json();
            if (response.ok) {
                message.success('Verification successful!');
                console.log('API Response:', data);
                // You can now redirect to another page if needed
                navigate('/symptom-tracker');
            }
            else {
                message.error((data === null || data === void 0 ? void 0 : data.message) || 'Verification failed!');
            }
        }
        catch (error) {
            console.error('Error:', error);
            message.error('An error occurred while verifying the code.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "verify-otp-container" }, { children: _jsxs("div", Object.assign({ className: "verify-otp-box" }, { children: [_jsx(Title, Object.assign({ level: 2, className: "verify-otp-title" }, { children: "Validate number" })), _jsx(Text, Object.assign({ className: "verify-otp-text" }, { children: "For security reasons, we will send a text message containing a code to verify your mobile number." })), _jsxs(Form, Object.assign({ layout: "vertical", className: "verify-otp-form" }, { children: [_jsx(Form.Item, Object.assign({ label: "Verification code :", className: "otp-input-item" }, { children: _jsx(Input, { placeholder: "Enter OTP", value: otp, onChange: (e) => setOtp(e.target.value), className: "otp-input" }) })), _jsx(Button, Object.assign({ type: "primary", onClick: handleOTPSubmit, loading: loading, className: "verify-otp-button" }, { children: "Verify code" }))] }))] })) }))] }));
};
export default VerifyOTP;
//# sourceMappingURL=sendOTP.js.map