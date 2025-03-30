import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { CommentOutlined, DashboardOutlined, InfoCircleOutlined, MenuFoldOutlined, MenuUnfoldOutlined, QuestionCircleOutlined, ShoppingOutlined, } from '@ant-design/icons';
import { Button, Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import './menu_panel.scss';
import img from '../images/logo/main_logo.png';
const items = [
    {
        key: '1',
        icon: _jsx(DashboardOutlined, {}),
        label: 'Symptom Tracker',
        path: '/symptom-tracker',
    },
    {
        key: '2',
        icon: _jsx(CommentOutlined, {}),
        label: 'Discussion Forum',
        path: '/discussion-forum',
    },
    {
        key: '3',
        icon: _jsx(InfoCircleOutlined, {}),
        label: 'Information Hub',
        path: '/info_hub',
    },
    {
        key: '4',
        icon: _jsx(ShoppingOutlined, {}),
        label: 'Marketplace',
        path: '/marketplace',
    },
    {
        key: '5',
        icon: _jsx(QuestionCircleOutlined, {}),
        label: 'iKomek AI Assistant',
        path: '/ikomek_assistant',
    },
];
const MenuPanel = ({ collapsed, toggleCollapsed, selectedPage }) => {
    const navigate = useNavigate();
    const handleMenuClick = (e) => {
        const selectedItem = items.find((item) => item.key === e.key);
        if (selectedItem === null || selectedItem === void 0 ? void 0 : selectedItem.path) {
            navigate(selectedItem.path);
        }
    };
    return (_jsxs("div", Object.assign({ className: `menu-container ${collapsed ? 'collapsed' : ''}` }, { children: [_jsxs("div", Object.assign({ className: "menu-header" }, { children: [_jsx("img", { className: "img", src: img, alt: "Logo", style: { display: collapsed ? 'none' : 'block' } }), _jsx(Button, Object.assign({ type: "primary", onClick: toggleCollapsed, className: "toggle-button", style: { marginLeft: collapsed ? '15px' : '40px',
                            marginTop: '10px' } }, { children: collapsed ? _jsx(MenuUnfoldOutlined, {}) : _jsx(MenuFoldOutlined, {}) }))] })), _jsx(Menu, { defaultSelectedKeys: ['1'], mode: "inline", theme: "light", selectedKeys: selectedPage ? [selectedPage] : [], inlineCollapsed: collapsed, items: items, className: "custom-menu", onClick: handleMenuClick })] })));
};
export default MenuPanel;
//# sourceMappingURL=menu-panel.js.map