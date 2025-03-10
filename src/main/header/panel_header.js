import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Button, Popover } from 'antd';
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './panel_header.scss';
import { Layout } from 'antd';
const { Header } = Layout;
const UserProfile = () => {
    const navigate = useNavigate();
    const content = (_jsxs("div", Object.assign({ className: "header_" }, { children: [_jsx(Button, Object.assign({ type: "text", className: "user_name", onClick: () => navigate('/profile') }, { children: "Palensheeva Palenshe" })), _jsx(Button, Object.assign({ icon: _jsx(LogoutOutlined, {}), type: "text", className: "logout-button", onClick: () => {
                    localStorage.removeItem('token');
                    navigate('/');
                } }, { children: "Log out" }))] })));
    return (_jsx(Header, Object.assign({ className: "header" }, { children: _jsxs("div", Object.assign({ className: "logo-container" }, { children: [_jsx(BellOutlined, { className: "notification" }), _jsx(Popover, Object.assign({ content: content, trigger: "click", placement: "bottomRight" }, { children: _jsx(Button, { icon: _jsx(UserOutlined, {}), type: "text" }) }))] })) })));
};
export default UserProfile;
//# sourceMappingURL=panel_header.js.map