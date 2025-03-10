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
import { Form, Input, Button, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import 'antd/dist/reset.css';
import './register.scss';
import AppHeader from '../main/header/header';
const Register = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const onFinishRegister = (values) => __awaiter(void 0, void 0, void 0, function* () {
        const { firstName, lastName, phoneNumber, password } = values;
        try {
            setLoading(true);
            const response = yield fetch('https://project-back-81mh.onrender.com/auth/register/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    phone_number: phoneNumber,
                    full_name: `${firstName} ${lastName}`,
                    password: password,
                }),
            });
            const data = yield response.json();
            if (response.ok) {
                console.log('Registration successful!');
                message.success('Registration successful!');
                navigate('/send-otp', { state: { phoneNumber: phoneNumber } });
            }
            else {
                console.log('Response Status:', response.status);
                console.log('Response Data:', data);
                message.error(data.message || 'Registration failed. Please try again.');
            }
        }
        catch (error) {
            console.error('Registration Error:', error);
            message.error('Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "register-container" }, { children: _jsxs("div", Object.assign({ className: "register-form-container" }, { children: [_jsx("h2", Object.assign({ className: "register-title" }, { children: "Register" })), _jsxs(Form, Object.assign({ layout: "vertical", className: "register-form", onFinish: onFinishRegister }, { children: [_jsx(Form.Item, Object.assign({ label: "First Name:", name: "firstName", rules: [
                                        { required: true, message: 'Please enter your first name!' },
                                    ] }, { children: _jsx(Input, { className: "register-input", placeholder: "Enter first name" }) })), _jsx(Form.Item, Object.assign({ label: "Last Name:", name: "lastName", rules: [
                                        { required: true, message: 'Please enter your last name!' },
                                    ] }, { children: _jsx(Input, { className: "register-input", placeholder: "Enter last name" }) })), _jsx(Form.Item, Object.assign({ label: "Phone Number:", name: "phoneNumber", rules: [
                                        { required: true, message: 'Please enter your phone number!' },
                                    ] }, { children: _jsx(Input, { className: "register-input", placeholder: "Enter phone number" }) })), _jsx(Form.Item, Object.assign({ label: "Password:", name: "password", rules: [
                                        { required: true, message: 'Please enter your password!' },
                                    ], hasFeedback: true }, { children: _jsx(Input.Password, { className: "register-input", placeholder: "Enter password" }) })), _jsx(Form.Item, Object.assign({ label: "Confirm Password:", name: "confirmPassword", dependencies: ['password'], hasFeedback: true, rules: [
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ] }, { children: _jsx(Input.Password, { className: "register-input", placeholder: "Confirm your password" }) })), _jsxs("div", Object.assign({ className: "register-button-container" }, { children: [_jsx(Button, Object.assign({ type: "primary", htmlType: "submit", loading: loading, className: "register-button" }, { children: "Register" })), _jsxs("span", Object.assign({ className: "login-link-inline" }, { children: ["Already have an account?", ' ', _jsx(Link, Object.assign({ to: "/login", className: "login-link" }, { children: "Login" }))] }))] }))] }))] })) }))] }));
};
export default Register;
//# sourceMappingURL=register.js.map