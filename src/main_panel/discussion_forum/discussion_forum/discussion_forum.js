var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { Layout, Modal, Form, message, List, Skeleton, Typography, Select, Input, } from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axios from 'axios';
import { ForumLayout, ForumControls, ForumContent, SectionTitle, SearchBar, FilterDropdown, NewThreadButton, ThreadCard, ThreadTopic, ThreadMeta, ThreadContent as ThreadText, } from './discussion-forum.styled';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import TextArea from 'antd/lib/input/TextArea';
const { Header } = Layout;
const { Title } = Typography;
const { Option } = FilterDropdown;
const DiscussionForum = () => {
    const [threads, setThreads] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedTopic, setSelectedTopic] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [categories, setCategories] = useState([]);
    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchCategories = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios.get('https://project-back-81mh.onrender.com/forum/categories/');
                setCategories(res.data);
            }
            catch (error) {
                console.error('Failed to fetch categories:', error);
            }
        });
        fetchCategories();
    }, []);
    useEffect(() => {
        const fetchThreads = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const response = yield axios.get('https://project-back-81mh.onrender.com/forum/posts/', {
                    headers: { Authorization: `Bearer ${token}` },
                });
                const formatted = response.data.map((post) => ({
                    id: post.id,
                    title: post.title,
                    author: post.author,
                    createdAt: dayjs(post.createdAt).format('MMMM D, YYYY'),
                    content: post.content,
                    category: post.category,
                }));
                setThreads(formatted);
            }
            catch (error) {
                console.error('Failed to fetch threads:', error);
                message.error('Failed to load discussion posts.');
            }
            finally {
                setLoading(false);
            }
        });
        fetchThreads();
    }, []);
    const handleCreateThread = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const payload = {
                title: values.title,
                content: values.content,
                category: values.topic,
            };
            const response = yield axios.post('https://project-back-81mh.onrender.com/forum/posts/', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            const newThread = {
                id: response.data.id,
                title: response.data.title,
                author: response.data.user || 'You',
                createdAt: dayjs(response.data.created_at).format('MMMM D, YYYY'),
                content: response.data.content,
                category: response.data.category,
            };
            setThreads((prev) => [newThread, ...prev]);
            setIsModalOpen(false);
            form.resetFields();
            message.success('Thread created successfully!');
        }
        catch (error) {
            console.error('Failed to create thread:', error);
            message.error('Failed to create thread.');
        }
    });
    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
    };
    const handleTopicFilter = (value) => {
        if (typeof value === 'string' || value === null) {
            setSelectedTopic(value);
        }
    };
    const filteredThreads = threads.filter((thread) => thread.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
        (!selectedTopic || thread.category === selectedTopic));
    return (_jsxs(ForumLayout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: "/discussion-forum" }), _jsxs(Layout, { style: { marginLeft: collapsed ? 100 : 250 }, children: [_jsx(Header, { style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }, children: _jsx(Main_header, {}) }), _jsxs(ForumContent, { children: [_jsxs(ForumControls, { children: [_jsx(SectionTitle, { children: "Discussion Forum" }), _jsx(SearchBar, { placeholder: "Search discussions...", prefix: _jsx(SearchOutlined, {}), value: searchTerm, onChange: handleSearch }), _jsx(FilterDropdown, { placeholder: "Filter by topic", className: "filter-dropdown", allowClear: true, onChange: handleTopicFilter, children: categories.map((cat) => (_jsx(Option, { value: cat.name, children: cat.name }, cat.id))) }), _jsx(NewThreadButton, { icon: _jsx(PlusOutlined, {}), onClick: () => setIsModalOpen(true), children: "New Thread" })] }), loading ? (_jsx("div", { style: { padding: '20px' }, children: [1, 2, 3].map((n) => (_jsx(Skeleton, { active: true, title: true, paragraph: { rows: 3 } }, n))) })) : (_jsx(List, { itemLayout: "vertical", dataSource: filteredThreads, renderItem: (thread) => (_jsxs(ThreadCard, { hoverable: true, onClick: () => navigate(`/discussion-forum/${thread.id}`, {
                                        state: { thread },
                                    }), children: [_jsx(ThreadTopic, { children: thread.category }), _jsx(Title, { level: 4, children: thread.title }), _jsxs(ThreadMeta, { children: ["By ", thread.author, " - ", thread.createdAt] }), _jsx(ThreadText, { children: thread.content })] }, thread.id)) }))] })] }), _jsx(Modal, { title: "Create New Thread", open: isModalOpen, onCancel: () => {
                    setIsModalOpen(false);
                    form.resetFields();
                }, footer: null, children: _jsxs(Form, { form: form, layout: "vertical", onFinish: handleCreateThread, children: [_jsx(Form.Item, { label: "Thread Title", name: "title", rules: [{ required: true, message: 'Please enter a thread title' }], children: _jsx(Input, { placeholder: "Enter title..." }) }), _jsx(Form.Item, { label: "Topic", name: "topic", rules: [{ required: true, message: 'Please select a topic' }], children: _jsx(Select, { placeholder: "Select a topic", children: categories.map((cat) => (_jsx(Option, { value: cat.name, children: cat.name }, cat.id))) }) }), _jsx(Form.Item, { label: "Content", name: "content", rules: [
                                {
                                    required: true,
                                    message: 'Please enter the discussion content',
                                },
                            ], children: _jsx(TextArea, { rows: 4, placeholder: "Enter your discussion..." }) }), _jsx(Form.Item, { children: _jsx(NewThreadButton, { htmlType: "submit", children: "Create" }) })] }) })] }));
};
export default DiscussionForum;
