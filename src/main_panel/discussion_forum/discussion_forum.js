import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Layout, Menu, Table, Input, Button, Typography } from 'antd';
import { HomeOutlined, CommentOutlined, InfoCircleOutlined, ShoppingOutlined, RobotOutlined, UserOutlined, BellOutlined, LogoutOutlined, PlusOutlined, SearchOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './discussion_forum.scss';
const { Header, Sider, Content } = Layout;
const { Title } = Typography;
const DiscussionForum = () => {
    const [collapsed, setCollapsed] = useState(false);
    const navigate = useNavigate();
    const handleMenuClick = (key) => {
        if (key === '1')
            navigate('/symptom-tracker');
        if (key === '2')
            navigate('/discussion-forum');
        if (key === '3')
            navigate('/information-hub');
        if (key === '4')
            navigate('/marketplace');
        if (key === '5')
            navigate('/ikomek-ai-assistant');
        if (key === '6')
            navigate('/profile');
    };
    const columns = [
        {
            title: 'User',
            dataIndex: 'user',
            key: 'user',
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
        },
        {
            title: 'Content',
            dataIndex: 'content',
            key: 'content',
        },
        {
            title: 'Created Date',
            dataIndex: 'date',
            key: 'date',
        },
    ];
    const data = [
        { key: 1, user: 'User1', title: 'Title1', content: 'Content1', date: '23.02.2025' },
        { key: 2, user: 'User2', title: 'Title2', content: 'Content2', date: '22.02.2025' },
        { key: 3, user: 'User3', title: 'Title3', content: 'Content3', date: '21.02.2025' },
        { key: 4, user: 'User4', title: 'Title4', content: 'Content4', date: '20.02.2025' },
        { key: 5, user: 'User5', title: 'Title5', content: 'Content5', date: '19.02.2025' },
    ];
    return (_jsxs(Layout, Object.assign({ className: "discussion-forum" }, { children: [_jsxs(Sider, Object.assign({ className: "sidebar", collapsible: true, collapsed: collapsed, onCollapse: setCollapsed, theme: "light" }, { children: [_jsx("div", Object.assign({ className: "logo" }, { children: "Balasteps" })), _jsxs(Menu, Object.assign({ defaultSelectedKeys: ['2'], mode: "vertical", className: "menu", onClick: (e) => handleMenuClick(e.key) }, { children: [_jsx(Menu.Item, Object.assign({ icon: _jsx(HomeOutlined, {}) }, { children: "Symptom Tracker" }), "1"), _jsx(Menu.Item, Object.assign({ icon: _jsx(CommentOutlined, {}) }, { children: "Discussion Forum" }), "2"), _jsx(Menu.Item, Object.assign({ icon: _jsx(InfoCircleOutlined, {}) }, { children: "Information Hub" }), "3"), _jsx(Menu.Item, Object.assign({ icon: _jsx(ShoppingOutlined, {}) }, { children: "Marketplace" }), "4"), _jsx(Menu.Item, Object.assign({ icon: _jsx(RobotOutlined, {}) }, { children: "iKomek AI Assistant" }), "5"), _jsx(Menu.Item, Object.assign({ icon: _jsx(UserOutlined, {}) }, { children: "Profile" }), "6")] }))] })), _jsxs(Layout, Object.assign({ className: "main-layout" }, { children: [_jsxs(Header, Object.assign({ className: "header" }, { children: [_jsx(Title, Object.assign({ level: 3, className: "header-title" }, { children: "Discussion Forum" })), _jsxs("div", Object.assign({ className: "header-actions" }, { children: [_jsx(Input, { placeholder: "Search for topics, keywords", prefix: _jsx(SearchOutlined, {}), className: "search-bar" }), _jsx(Button, Object.assign({ type: "primary", icon: _jsx(PlusOutlined, {}), className: "create-button" }, { children: "Create" })), _jsx(Button, { icon: _jsx(BellOutlined, {}), type: "text" }), _jsx(Button, { icon: _jsx(UserOutlined, {}), type: "text" }), _jsx(Button, Object.assign({ icon: _jsx(LogoutOutlined, {}), type: "text", className: "logout-button" }, { children: "Log out" }))] }))] })), _jsx(Content, Object.assign({ className: "content" }, { children: _jsx(Table, { columns: columns, dataSource: data, pagination: false, className: "discussion-table" }) }))] }))] })));
};
export default DiscussionForum;
//# sourceMappingURL=discussion_forum.js.map