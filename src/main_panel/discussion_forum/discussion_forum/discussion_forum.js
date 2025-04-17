import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Layout, Typography, Input, Button, Card, List, Modal, Form, Select, } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation
import './discussion_forum.scss';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import dayjs from 'dayjs';
const { Title } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;
const topics = [
    "Child's Condition & Diagnosis",
    'Therapy & Treatment',
    'Education & Learning Support',
    'Parenting & Daily Life',
    'Community & Socialization',
    'Legal & Financial Assistance',
    'Technology & Accessibility',
];
const initialThreads = [
    {
        id: 1,
        title: 'How to find the best therapy centers?',
        author: 'John Doe',
        createdAt: 'March 18, 2025',
        content: 'Looking for recommendations on therapy centers for my child in Almaty. Any suggestions?',
        topic: 'Therapy & Treatment',
    },
    {
        id: 2,
        title: 'Best speech therapy exercises at home',
        author: 'Jane Smith',
        createdAt: 'March 17, 2025',
        content: 'Has anyone tried speech therapy exercises at home? Looking for effective techniques!',
        topic: 'Education & Learning Support',
    },
];
const DiscussionForum = () => {
    const [threads, setThreads] = useState(initialThreads);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate(); // ✅ Use navigation
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleTopicFilter = (value) => {
        setSelectedTopic(value);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleCreateThread = (values) => {
        const newThread = {
            id: threads.length + 1,
            title: values.title,
            author: 'Current User',
            createdAt: dayjs().format('MMMM D, YYYY'),
            content: values.content,
            topic: values.topic,
        };
        setThreads([newThread, ...threads]);
        setIsModalOpen(false);
        form.resetFields();
    };
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const filteredThreads = threads.filter((thread) => thread.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedTopic || thread.topic === selectedTopic));
    return (_jsxs(Layout, Object.assign({ className: "forum-layout" }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: toggleCollapsed, selectedPage: '/discussion-forum' }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s ease' } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "forum-content" }, { children: [_jsxs("div", Object.assign({ className: "forum-controls" }, { children: [_jsx("h1", Object.assign({ className: "section-title" }, { children: "Discussion Forum" })), _jsx(Input, { placeholder: "Search discussions...", prefix: _jsx(SearchOutlined, {}), className: "search-bar", value: searchTerm, onChange: handleSearch }), _jsx(Select, Object.assign({ placeholder: "Filter by topic", className: "filter-dropdown", allowClear: true, onChange: handleTopicFilter }, { children: topics.map((topic) => (_jsx(Option, Object.assign({ value: topic }, { children: topic }), topic))) })), _jsx(Button, Object.assign({ className: "new-thread", type: "default", icon: _jsx(PlusOutlined, {}), onClick: showModal }, { children: "New Thread" }))] })), _jsx(List, { itemLayout: "vertical", dataSource: filteredThreads, renderItem: (thread) => (_jsxs(Card, Object.assign({ className: "thread-card", hoverable: true, onClick: () => navigate(`/discussion-forum/${thread.id}`, { state: { thread } }) }, { children: [_jsx("div", Object.assign({ className: "thread-topic" }, { children: thread.topic })), _jsx(Title, Object.assign({ level: 4 }, { children: thread.title })), _jsxs("p", Object.assign({ className: "thread-meta" }, { children: ["By ", thread.author, " - ", thread.createdAt] })), _jsx("p", Object.assign({ className: "thread-content" }, { children: thread.content }))] }), thread.id)) })] }))] })), _jsx(Modal, Object.assign({ title: "Create New Thread", open: isModalOpen, onCancel: handleCancel, footer: null }, { children: _jsxs(Form, Object.assign({ form: form, layout: "vertical", onFinish: handleCreateThread }, { children: [_jsx(Form.Item, Object.assign({ label: "Thread Title", name: "title", rules: [{ required: true, message: 'Please enter a thread title' }] }, { children: _jsx(Input, { placeholder: "Enter title..." }) })), _jsx(Form.Item, Object.assign({ label: "Topic", name: "topic", rules: [{ required: true, message: 'Please select a topic' }] }, { children: _jsx(Select, Object.assign({ placeholder: "Select a topic" }, { children: topics.map((topic) => (_jsx(Option, Object.assign({ value: topic }, { children: topic }), topic))) })) })), _jsx(Form.Item, Object.assign({ label: "Content", name: "content", rules: [{ required: true, message: 'Please enter the discussion content' }] }, { children: _jsx(Input.TextArea, { rows: 4, placeholder: "Enter your discussion..." }) })), _jsx(Form.Item, { children: _jsx(Button, Object.assign({ className: "new-thread", htmlType: "submit" }, { children: "Create" })) })] })) }))] })));
};
export default DiscussionForum;
//# sourceMappingURL=discussion_forum.js.map