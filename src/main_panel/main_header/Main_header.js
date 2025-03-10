import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Menu, Dropdown, Button, Layout, Avatar } from 'antd';
import { UserOutlined, DownOutlined, LogoutOutlined, ProfileOutlined, } from '@ant-design/icons';
import ProfilePage from '../profile/profile';
import './main_header.scss';
import { useNavigate } from 'react-router-dom';
const { Header } = Layout;
const Main_header = () => {
    const [isProfileVisible, setIsProfileVisible] = useState(false);
    const navigate = useNavigate();
    const handleMenuClick = ({ key }) => {
        if (key === 'profile') {
            setIsProfileVisible(true); // Show profile when "Profile" is clicked
        }
        else if (key === 'logout') {
            setIsProfileVisible(false); // Hide profile on logout
            console.log('Logged out');
        }
    };
    const menu = (_jsxs(Menu, Object.assign({ onClick: handleMenuClick }, { children: [_jsx(Menu.Item, Object.assign({ icon: _jsx(ProfileOutlined, {}) }, { children: "Profile" }), "profile"), _jsx(Menu.Item, Object.assign({ icon: _jsx(LogoutOutlined, {}), onClick: () => navigate('/') }, { children: "Log Out" }), "logout")] })));
    return (_jsx(Header, Object.assign({ className: "main-header" }, { children: _jsx("div", Object.assign({ className: "header-right" }, { children: _jsx(Dropdown, Object.assign({ overlay: menu, trigger: ['click'] }, { children: _jsxs(Button, Object.assign({ type: "text", className: "profile-dropdown" }, { children: [_jsx(Avatar, { size: "small", icon: _jsx(UserOutlined, {}), style: { marginRight: 8 } }), "Palensheeva Palenshe ", _jsx(DownOutlined, {})] })) })) })) })));
    {
        isProfileVisible && _jsx(ProfilePage, {});
    }
};
;
;
export default Main_header;
//# sourceMappingURL=Main_header.js.map