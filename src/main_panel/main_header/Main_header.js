var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx } from "react/jsx-runtime";
import { useState } from 'react';
import { Dropdown, Button, Layout, Avatar, message } from 'antd';
import { UserOutlined, LogoutOutlined, ProfileOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './main_header.scss';
const { Header } = Layout;
const Main_header = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const navigate = useNavigate();
    const handleLogout = () => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        const refreshToken = localStorage.getItem('refreshToken');
        const accessToken = localStorage.getItem('accessToken');
        if (!refreshToken || !accessToken) {
            message.warning('You are already logged out.');
            return;
        }
        try {
            yield axios.post('https://project-back-81mh.onrender.com/auth/logout/', { refresh: refreshToken }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
            message.success('Logged out successfully!');
            navigate('/login');
        }
        catch (error) {
            console.error(error);
            message.error(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.detail) || 'Failed to log out. Try again.');
        }
    });
    const handleMenuClick = ({ key }) => {
        if (key === 'profile') {
            setIsProfileVisible(true);
            navigate('/profile');
        }
        else if (key === 'logout') {
            handleLogout();
        }
    };
    const items = [
        {
            key: 'profile',
            icon: _jsx(ProfileOutlined, {}),
            label: 'Profile',
        },
        {
            key: 'logout',
            icon: _jsx(LogoutOutlined, {}),
            label: 'Log Out',
        },
    ];
    return (_jsx(Layout, { style: { backgroundColor: '#E2E3E0' }, children: _jsx(Header, { className: "main-header", children: _jsx("div", { className: "header-right", children: _jsx(Dropdown, { menu: { items, onClick: handleMenuClick }, trigger: ['click'], children: _jsx(Button, { type: "text", className: "profile-dropdown", children: _jsx(Avatar, { size: "default", icon: _jsx(UserOutlined, {}), style: {
                                color: '#591C00',
                                backgroundColor: '#E2E3E0',
                            } }) }) }) }) }) }));
};
export default Main_header;
