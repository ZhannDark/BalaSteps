import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Input, Button, notification } from 'antd';
import 'antd/dist/reset.css';
import { Link, useNavigate } from 'react-router-dom';
import './login.scss';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AppHeader from '../main/header/header';
const Login = () => {
    const navigate = useNavigate();
    const [api, contextHolder] = notification.useNotification();
    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            icon: type === 'success' ? (_jsx(CheckCircleOutlined, { style: { color: '#067908' } })) : type === 'error' ? (_jsx(CloseCircleOutlined, { style: { color: '#d01843' } })) : (_jsx(ExclamationCircleOutlined, { style: { color: '#da881c' } })),
        });
    };
    const loginMutation = useMutation({
        mutationFn: (values) => axios.post('https://project-back-81mh.onrender.com/auth/login/', values),
        onSuccess: (response) => {
            localStorage.setItem('accessToken', response.data.access);
            localStorage.setItem('refreshToken', response.data.refresh);
            openNotification('success', 'Login successful', 'You have successfully logged in.');
            setTimeout(() => {
                navigate('/symptom-tracker');
            }, 3000);
        },
        onError: (error) => {
            var _a, _b;
            openNotification('error', 'Login failed', ((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.message) || 'Incorrect email or password.');
        },
    });
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "login-container" }, { children: _jsxs("div", Object.assign({ className: "login-form-container" }, { children: [_jsx("h2", Object.assign({ className: "login-title" }, { children: "Login" })), _jsxs(Form, Object.assign({ layout: "vertical", className: "login-form", onFinish: (values) => loginMutation.mutate(values) }, { children: [_jsx(Form.Item, Object.assign({ label: "Email:", name: "email", rules: [{ required: true, message: 'Please enter an email' }] }, { children: _jsx(Input, { className: "login-input", placeholder: "Enter your email" }) })), _jsx(Form.Item, Object.assign({ label: "Password:", name: "password", rules: [{ required: true, message: 'Please enter your password' }] }, { children: _jsx(Input.Password, { className: "login-input", placeholder: "Enter password" }) })), _jsx(Form.Item, { children: _jsx(Button, Object.assign({ type: "primary", htmlType: "submit", className: "login-button", loading: loginMutation.isPending }, { children: loginMutation.isPending ? 'Logging in...' : 'Login' })) })] })), _jsxs("div", Object.assign({ className: "login-links" }, { children: [_jsx(Link, Object.assign({ to: "/forgot-password", className: "forgot-password" }, { children: "Forgot password?" })), _jsx(Link, Object.assign({ to: "/register", className: "new-user" }, { children: "New user? Register" }))] }))] })) }))] }));
};
export default Login;
//# sourceMappingURL=login.js.map