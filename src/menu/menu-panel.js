import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CommentOutlined, DashboardOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, ShoppingOutlined, } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { MenuContainer, StyledMenu, MenuHeader, ToggleButton, Logo, } from './menu-panel.styled';
import img from '../assets/images/logo/main_logo.png';
const items = [
    {
        key: '/symptom-tracker',
        icon: _jsx(DashboardOutlined, {}),
        label: 'Symptom Tracker',
    },
    {
        key: '/discussion-forum',
        icon: _jsx(CommentOutlined, {}),
        label: 'Discussion Forum',
    },
    {
        key: '/info_hub',
        icon: _jsx(InfoCircleOutlined, {}),
        label: 'Information Hub',
    },
    {
        key: '/marketplace',
        icon: _jsx(ShoppingOutlined, {}),
        label: 'Marketplace',
    },
    {
        key: '/ikomek_assistant',
        icon: _jsx(QuestionCircleOutlined, {}),
        label: 'iKomek AI Assistant',
    },
];
const MenuPanel = ({ collapsed, toggleCollapsed, }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        navigate(e.key);
    };
    return (_jsxs(MenuContainer, { collapsed: collapsed, children: [_jsxs(MenuHeader, { children: [!collapsed && _jsx(Logo, { src: img, alt: "Logo" }), _jsx(ToggleButton, { onClick: toggleCollapsed, children: collapsed ? _jsx(MenuUnfoldOutlined, {}) : _jsx(MenuFoldOutlined, {}) })] }), _jsx(StyledMenu, { mode: "inline", theme: "light", selectedKeys: [location.pathname], inlineCollapsed: collapsed, items: items, onClick: handleMenuClick })] }));
};
export default MenuPanel;
