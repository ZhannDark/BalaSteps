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
import { Layout, Typography, Input, Button, List, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ikomek_assistant.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const IkomekAssistant = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const handleSendMessage = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!input.trim())
            return;
        const userMessage = { text: input, sender: 'user' };
        setMessages([...messages, userMessage]);
        setInput('');
        // Simulating AI response (replace this with actual API call)
        setTimeout(() => {
            const botMessage = {
                text: `I'm here to help! You asked: "${input}".`,
                sender: 'bot',
            };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }, 1000);
    });
    return (_jsxs(Layout, Object.assign({ className: "ikomek-layout" }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: '/ikomek_assistant' }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s' } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "ikomek-content" }, { children: [_jsx(Title, Object.assign({ className: "ikomek-title" }, { children: "iKomek AI Assistant" })), _jsx(Text, Object.assign({ className: "ikomek-subtitle" }, { children: "Hi! How can I assist you today?" })), _jsx("div", Object.assign({ className: "chat-container" }, { children: _jsx(List, { dataSource: messages, renderItem: (msg, index) => (_jsx(Card, Object.assign({ className: `chat-message ${msg.sender}` }, { children: _jsx(Text, { children: msg.text }) }), index)) }) })), _jsxs("div", Object.assign({ className: "message-input-container" }, { children: [_jsx(TextArea, { className: "message-input", placeholder: "Message to iKomek", value: input, onChange: (e) => setInput(e.target.value), onPressEnter: handleSendMessage }), _jsx(Button, { type: "primary", icon: _jsx(SendOutlined, {}), className: "send-button", onClick: handleSendMessage })] }))] }))] }))] })));
};
export default IkomekAssistant;
//# sourceMappingURL=ikomek_assistant.js.map