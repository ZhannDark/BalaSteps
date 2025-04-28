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
import { useState } from 'react';
import { Layout, Typography, Input, Button, List, Card, Spin } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosBase from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const axios = axiosBase.create({
    baseURL: 'https://project-back-81mh.onrender.com',
    headers: {
        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
    },
});
axios.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
    return config;
});
const IkomekAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [activeSessionId, setActiveSessionId] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const queryClient = useQueryClient();
    const { data: sessionsData = [], isLoading: sessionsLoading } = useQuery({
        queryKey: ['sessions'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () { return (yield axios.get('/api/komekai/sessions/')).data; }),
    });
    const createSession = useMutation({
        mutationFn: () => axios.post('/api/komekai/sessions/', {}),
        onSuccess: (res) => {
            queryClient.invalidateQueries({ queryKey: ['sessions'] });
            setActiveSessionId(res.data.id);
            setMessages([]);
        },
    });
    const sendMessage = useMutation({
        mutationFn: (_a) => __awaiter(void 0, [_a], void 0, function* ({ sessionId, message, }) {
            const res = yield axios.post(`/api/komekai/sessions/${sessionId}/message/`, { message });
            return res.data;
        }),
        onSuccess: (res) => {
            setMessages((prev) => [
                ...prev,
                { text: input, sender: 'user' },
                { text: res.reply, sender: 'bot' },
            ]);
            setInput('');
        },
    });
    const handleSendMessage = () => {
        if (!input.trim() || !activeSessionId)
            return;
        sendMessage.mutate({ sessionId: activeSessionId, message: input });
    };
    const handleSelectChat = (sessionId) => {
        const selectedSession = sessionsData.find((s) => s.id === sessionId);
        setActiveSessionId(sessionId);
        const parsedMessages = (selectedSession === null || selectedSession === void 0 ? void 0 : selectedSession.messages.map((m) => ({
            text: m.content,
            sender: m.sender === 'assistant' ? 'bot' : 'user',
        }))) || [];
        setMessages(parsedMessages);
    };
    return (_jsxs(Layout, { className: "ikomek-layout", children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed) }), _jsxs(Layout, { style: {
                    marginLeft: collapsed ? 100 : 250,
                    transition: 'margin-left 0.3s',
                }, children: [_jsx(Header, { style: { padding: 0, background: '#E2E3E0', height: '48px' }, children: _jsx(Main_header, {}) }), _jsxs(Content, { className: "ikomek-content", style: { padding: '24px' }, children: [_jsx(Title, { level: 3, style: { color: '#4B244A', fontFamily: 'Newsreader, serif' }, children: "iKomek AI Assistant" }), _jsx(Text, { style: { color: '#555' }, children: "Hi! How can I assist you today?" }), _jsxs("div", { style: { margin: '24px 0' }, children: [_jsx(Button, { type: "primary", onClick: () => createSession.mutate(), children: "+ New Chat" }), sessionsLoading ? (_jsx(Spin, { style: { marginTop: 10 } })) : (_jsx(List, { size: "small", bordered: true, style: { marginTop: 10 }, dataSource: sessionsData, renderItem: (session) => (_jsx(List.Item, { style: { cursor: 'pointer', fontFamily: 'Alegreya Sans' }, onClick: () => handleSelectChat(session.id), children: session.title || 'New Chat' })) }))] }), _jsx("div", { className: "chat-container", style: { minHeight: 300, marginBottom: 20 }, children: _jsx(List, { dataSource: messages, renderItem: (msg, index) => (_jsx(Card, { style: {
                                            marginBottom: 10,
                                            backgroundColor: msg.sender === 'user' ? '#f6f6f6' : '#d6e9c6',
                                        }, children: _jsx(Text, { style: { fontFamily: 'Alegreya Sans' }, children: _jsx(ReactMarkdown, { remarkPlugins: [remarkGfm], children: msg.text }) }) }, index)) }) }), _jsxs("div", { style: { display: 'flex', gap: 10 }, children: [_jsx(TextArea, { rows: 2, style: { flex: 1, resize: 'none', borderRadius: 8 }, placeholder: "Message to iKomek", value: input, onChange: (e) => setInput(e.target.value), onPressEnter: handleSendMessage }), _jsx(Button, { type: "primary", icon: _jsx(SendOutlined, {}), onClick: handleSendMessage, disabled: !activeSessionId, children: "Send" })] })] })] })] }));
};
export default IkomekAssistant;
