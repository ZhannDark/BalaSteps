import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { Form, notification } from 'antd';
import 'antd/dist/reset.css';
import { useNavigate } from 'react-router-dom';
import { CheckCircleOutlined, CloseCircleOutlined, ExclamationCircleOutlined, } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import AppHeader from '../../main_page/main_page_header/main_page_header';
import { LoginContainer, LoginFormContainer, LoginTitle, StyledButton, StyledInput, StyledPasswordInput, StyledLink, LoginLinks, } from './login.styled';
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
    return (_jsxs(_Fragment, { children: [contextHolder, _jsx(AppHeader, {}), _jsx(LoginContainer, { children: _jsxs(LoginFormContainer, { children: [_jsx(LoginTitle, { children: "Login" }), _jsxs(Form, { layout: "vertical", onFinish: (values) => loginMutation.mutate(values), children: [_jsx(Form.Item, { label: "Email:", name: "email", rules: [
                                        { required: true, message: 'Please enter an email' },
                                        {
                                            type: 'email',
                                            message: 'Please enter a valid email address',
                                        },
                                    ], children: _jsx(StyledInput, { placeholder: "Enter your email" }) }), _jsx(Form.Item, { label: "Password:", name: "password", rules: [
                                        { required: true, message: 'Please enter your password' },
                                    ], children: _jsx(StyledPasswordInput, { placeholder: "Enter password" }) }), _jsx(Form.Item, { children: _jsx(StyledButton, { type: "primary", htmlType: "submit", loading: loginMutation.isPending, children: loginMutation.isPending ? 'Logging in...' : 'Login' }) })] }), _jsxs(LoginLinks, { children: [_jsx(StyledLink, { to: "/forgot-password", children: "Forgot password?" }), _jsx(StyledLink, { to: "/register", children: "New user? Register" })] })] }) })] }));
};
export default Login;
