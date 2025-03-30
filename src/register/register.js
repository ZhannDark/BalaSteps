import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, Input, Button, notification } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import './register.scss';
import AppHeader from '../main/header/header';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
const Register = () => {
    const [api, contextHolder] = notification.useNotification();
    const navigate = useNavigate();
    const openNotification = (type, message, description) => {
        api[type]({
            message,
            description,
            icon: type === 'success' ? (_jsx(CheckCircleOutlined, { style: { color: '#067908' } })) : type === 'error' ? (_jsx(CloseCircleOutlined, { style: { color: '#d01843' } })) : (_jsx(ExclamationCircleOutlined, { style: { color: '#da881c' } })),
        });
    };
    const registerMutation = useMutation({
        mutationFn: (values) => axios.post('https://project-back-81mh.onrender.com/auth/register/', {
            email: values.email,
            full_name: `${values.firstName} ${values.lastName}`,
            password: values.password,
        }),
        onSuccess: (_, variables) => {
            openNotification('success', 'Registration successful!', 'You have successfully registered. Please verify your email.');
            setTimeout(() => {
                navigate('/send-otp', { state: { email: variables.email } });
            }, 6000);
        },
        onError: (error) => {
            var _a, _b, _c, _d, _e;
            const emailError = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.email) === null || _c === void 0 ? void 0 : _c[0];
            if (emailError === 'user with this email already exists.') {
                openNotification('error', 'Registration failed', 'A user with this email already exists. Please try logging in.');
            }
            else {
                openNotification('error', 'Registration failed', ((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) || 'An error occurred. Please try again.');
            }
        },
    });
    const onFinishRegister = (values) => {
        registerMutation.mutate({
            email: values.email,
            firstName: values.firstName,
            lastName: values.lastName,
            password: values.password,
        });
    };
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx("div", Object.assign({ className: "register-container" }, { children: _jsxs("div", Object.assign({ className: "register-form-container" }, { children: [_jsx("h2", Object.assign({ className: "register-title" }, { children: "Register" })), _jsxs(Form, Object.assign({ layout: "vertical", className: "register-form", onFinish: onFinishRegister }, { children: [_jsx(Form.Item, Object.assign({ label: "First Name:", name: "firstName", rules: [{ required: true, message: 'Please enter your first name!' }] }, { children: _jsx(Input, { className: "register-input", placeholder: "Enter first name" }) })), _jsx(Form.Item, Object.assign({ label: "Last Name:", name: "lastName", rules: [{ required: true, message: 'Please enter your last name!' }] }, { children: _jsx(Input, { className: "register-input", placeholder: "Enter last name" }) })), _jsx(Form.Item, Object.assign({ label: "Email:", name: "email", rules: [{ required: true, message: 'Please enter your email address!' }] }, { children: _jsx(Input, { type: "email", className: "register-input", placeholder: "Enter email" }) })), _jsx(Form.Item, Object.assign({ label: "Password:", name: "password", rules: [{ required: true, message: 'Please enter your password!' }], hasFeedback: true }, { children: _jsx(Input.Password, { className: "register-input", placeholder: "Enter password" }) })), _jsx(Form.Item, Object.assign({ label: "Confirm Password:", name: "confirmPassword", dependencies: ['password'], hasFeedback: true, rules: [
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ] }, { children: _jsx(Input.Password, { className: "register-input", placeholder: "Confirm your password" }) })), _jsxs("div", Object.assign({ className: "register-button-container" }, { children: [_jsx(Button, Object.assign({ type: "primary", htmlType: "submit", loading: registerMutation.isPending, className: "register-button" }, { children: "Register" })), _jsxs("span", Object.assign({ className: "login-link-inline" }, { children: ["Already have an account?", ' ', _jsx(Link, Object.assign({ to: "/login", className: "login-link" }, { children: "Login" }))] }))] }))] }))] })) }))] }));
};
export default Register;
//# sourceMappingURL=register.js.map