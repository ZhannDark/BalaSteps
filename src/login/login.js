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
import 'antd/dist/reset.css';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import AppHeader from '../main/header/header';
const Login = () => {
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const handleLogin = (values) => __awaiter(void 0, void 0, void 0, function* () {
        setLoading(true);
        try {
            const response = yield fetch('https://project-back-81mh.onrender.com/auth/login/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(values),
            });
            const data = yield response.json();
            if (response.ok) {
                console.log('Login successful!');
                message.success('Login successful!');
                localStorage.setItem('token', data.token);
                navigate('/main_header');
            }
            else {
                message.error(data.message || 'Invalid email or password');
            }
        }
        catch (error) {
            console.error('Login error:', error);
            message.error('Something went wrong. Please try again.');
        }
        finally {
            setLoading(false);
        }
    });
    return (_jsxs(_Fragment, { children: [_jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "login-container" }, { children: _jsxs("div", Object.assign({ className: "login-form-container" }, { children: [_jsx("h2", Object.assign({ className: "login-title" }, { children: "Login" })), _jsxs(Form, Object.assign({ layout: "vertical", className: "login-form", onFinish: handleLogin }, { children: [_jsx(Form.Item, Object.assign({ label: "Phone number:", name: "phone-number", rules: [
                                        { required: true, message: 'Please enter a phone number' },
                                    ] }, { children: _jsx(Input, { className: "login-input", placeholder: "Enter phone number" }) })), _jsx(Form.Item, Object.assign({ label: "Password:", name: "password", rules: [
                                        { required: true, message: 'Please enter your password' },
                                    ] }, { children: _jsx(Input.Password, { className: "login-input", placeholder: "Enter password" }) })), _jsx(Form.Item, { children: _jsx(Button, Object.assign({ type: "primary", htmlType: "submit", className: "login-button", loading: loading, onClick: () => navigate('/symptom-tracker') }, { children: loading ? 'Logging in...' : 'Login' })) })] })), _jsxs("div", Object.assign({ className: "login-links" }, { children: [_jsx(Link, Object.assign({ to: "/forgot-password", className: "forgot-password" }, { children: "Forgot password?" })), _jsx(Link, Object.assign({ to: "/register", className: "new-user" }, { children: "New user? Register" }))] }))] })) }))] }));
};
export default Login;
//# sourceMappingURL=login.js.map