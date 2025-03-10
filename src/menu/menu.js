import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { UserOutlined, DashboardOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, CommentOutlined, InfoCircleOutlined, ShoppingOutlined, } from '@ant-design/icons';
import { Typography } from 'antd';
import { Button, Menu } from 'antd';
import './menu_panel.scss';
import logo from '../images/logo/panel_logo.png';
const { Title } = Typography;
const items = [
    { key: '1', icon: _jsx(DashboardOutlined, {}), label: 'Symptom Tracker' },
    { key: '2', icon: _jsx(CommentOutlined, {}), label: 'Discussion Forum' },
    { key: '3', icon: _jsx(InfoCircleOutlined, {}), label: 'Information Hub' },
    { key: '4', icon: _jsx(ShoppingOutlined, {}), label: 'Marketplace' },
    { key: '5', icon: _jsx(QuestionCircleOutlined, {}), label: 'iKomek AI Assistant' },
    { key: '6', icon: _jsx(UserOutlined, {}), label: 'Profile' },
];
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (_jsxs("div", Object.assign({ className: `menu_container ${collapsed ? 'collapsed' : ''}` }, { children: [_jsxs("div", Object.assign({ className: "logo-section" }, { children: [_jsx("img", { src: logo, alt: "Balasteps", className: "menu-logo" }), !collapsed && _jsx(Title, Object.assign({ level: 3, className: "menu-title" }, { children: "Balasteps" }))] })), _jsxs("div", Object.assign({ className: "menu_panel" }, { children: [_jsx(Menu, { defaultSelectedKeys: ['1'], mode: "inline", theme: "light", inlineCollapsed: collapsed, items: items, className: `custom-menu ${collapsed ? 'collapsed-menu' : ''}` }), _jsx(Button, Object.assign({ type: "primary", onClick: toggleCollapsed, className: "toggle-button" }, { children: collapsed ? _jsx(MenuUnfoldOutlined, {}) : _jsx(MenuFoldOutlined, {}) }))] }))] })));
};
export default App;
//# sourceMappingURL=menu.js.map