import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, notification } from 'antd';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useMutation } from '@tanstack/react-query';
import AppHeader from '../../../main_page/main_page_header/main_page_header';
import { RegisterContainer, RegisterTitle, RegisterFormContainer, RegisterInput, RegisterPassword, RegisterButtonContainer, RegisterButton, LoginLink, } from './register.styled';
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
            }, 4000);
        },
        onError: (error) => {
            var _a, _b, _c, _d, _e;
            const emailError = (_c = (_b = (_a = error === null || error === void 0 ? void 0 : error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.email) === null || _c === void 0 ? void 0 : _c[0];
            if (emailError === 'user with this email already exists.') {
                openNotification('error', 'Registration failed', 'A user with this email already exists. Please try logging in.');
            }
            else {
                openNotification('error', 'Registration failed', ((_e = (_d = error === null || error === void 0 ? void 0 : error.response) === null || _d === void 0 ? void 0 : _d.data) === null || _e === void 0 ? void 0 : _e.message) ||
                    'An error occurred. Please try again.');
            }
        },
    });
    const onFinishRegister = ({ email, firstName, lastName, password, }) => {
        registerMutation.mutate({ email, firstName, lastName, password });
    };
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx(RegisterContainer, { children: _jsxs(RegisterFormContainer, { children: [_jsx(RegisterTitle, { children: "Register" }), _jsxs(Form, { layout: "vertical", onFinish: onFinishRegister, children: [_jsx(Form.Item, { label: "First Name:", name: "firstName", rules: [
                                        { required: true, message: 'Please enter your first name!' },
                                    ], children: _jsx(RegisterInput, { placeholder: "Enter first name" }) }), _jsx(Form.Item, { label: "Last Name:", name: "lastName", rules: [
                                        { required: true, message: 'Please enter your last name!' },
                                    ], children: _jsx(RegisterInput, { placeholder: "Enter last name" }) }), _jsx(Form.Item, { label: "Email:", name: "email", rules: [
                                        { required: true, message: 'Please enter your email address!' },
                                        {
                                            type: 'email',
                                            message: 'Please enter a valid email address!',
                                        },
                                    ], children: _jsx(RegisterInput, { placeholder: "Enter email", type: "email" }) }), _jsx(Form.Item, { label: "Password:", name: "password", rules: [
                                        { required: true, message: 'Please enter your password!' },
                                    ], hasFeedback: true, children: _jsx(RegisterPassword, { placeholder: "Enter password" }) }), _jsx(Form.Item, { label: "Confirm Password:", name: "confirmPassword", dependencies: ['password'], hasFeedback: true, rules: [
                                        { required: true, message: 'Please confirm your password!' },
                                        ({ getFieldValue }) => ({
                                            validator(_, value) {
                                                if (!value || getFieldValue('password') === value) {
                                                    return Promise.resolve();
                                                }
                                                return Promise.reject(new Error('Passwords do not match!'));
                                            },
                                        }),
                                    ], children: _jsx(RegisterPassword, { placeholder: "Confirm your password" }) }), _jsxs(RegisterButtonContainer, { children: [_jsx(RegisterButton, { type: "primary", htmlType: "submit", loading: registerMutation.isPending, children: "Continue" }), _jsxs("span", { className: "login-link-inline", children: ["Already have an account?", ' ', _jsx(LoginLink, { to: "/login", children: "Login" })] })] })] })] }) })] }));
};
export default Register;
