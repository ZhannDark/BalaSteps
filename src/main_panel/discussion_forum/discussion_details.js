import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Layout, Typography, Card, Button, Input } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './discussion_details.scss';
const { Title } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const DiscussionDetails = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { thread } = location.state;
    const [collapsed, setCollapsed] = useState(false);
    const [comments, setComments] = useState([
        { id: 1, author: 'Tugensheeva_tugenshe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vel felis id ligula ultrices pharetra.' },
        { id: 2, author: 'Tugensheeva_tugenshe', content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla facilisi. Vestibulum vel felis id ligula ultrices pharetra.' },
    ]);
    const [newComment, setNewComment] = useState('');
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    const handleAddComment = () => {
        if (newComment.trim() === '')
            return;
        const newCommentObj = {
            id: comments.length + 1,
            author: 'Current User',
            content: newComment,
        };
        setComments([newCommentObj, ...comments]);
        setNewComment('');
    };
    return (_jsxs(Layout, Object.assign({ className: "discussion-layout" }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: toggleCollapsed, selectedPage: '/discussion-forum' }), _jsxs(Layout, Object.assign({ style: { marginLeft: 250 } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "discussion-content" }, { children: [_jsx(Button, Object.assign({ type: "link", icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate(-1), style: { marginBottom: '20px', fontSize: '16px', color: '#591C00' } }, { children: "Back" })), _jsxs(Card, Object.assign({ className: "discussion-card", style: { border: '1px solid #426B1F' } }, { children: [_jsx(Title, Object.assign({ level: 4, style: { marginBottom: '10px' } }, { children: thread.author })), _jsx("div", Object.assign({ style: { fontWeight: 'bold', color: '#000' } }, { children: thread.topic })), _jsx(Card, Object.assign({ className: "thread-description", style: { marginTop: '10px', background: '#F8F8F8' } }, { children: _jsx("p", { children: thread.content }) })), _jsx("div", Object.assign({ style: { display: 'flex', justifyContent: 'space-between', marginTop: '15px' } }, { children: _jsxs("span", Object.assign({ style: { fontSize: '14px', color: '#666' } }, { children: ["\uD83D\uDDE8\uFE0F ", comments.length] })) }))] })), _jsxs("div", Object.assign({ style: { marginTop: '20px' } }, { children: [_jsx(TextArea, { rows: 3, placeholder: "Write your comment here...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsx(Button, Object.assign({ type: "primary", style: { marginTop: '10px', backgroundColor: '#426B1F' }, onClick: handleAddComment }, { children: "Add Comment" }))] })), comments.map((comment) => (_jsxs(Card, Object.assign({ className: "comment-card", style: { marginTop: '10px', borderRadius: '8px' } }, { children: [_jsx(Title, Object.assign({ level: 5, style: { marginBottom: '5px', fontWeight: 'bold' } }, { children: comment.author })), _jsx("p", { children: comment.content })] }), comment.id)))] }))] }))] })));
};
export default DiscussionDetails;
//# sourceMappingURL=discussion_details.js.map