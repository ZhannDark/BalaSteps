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
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Input, List, message, Rate, } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import axios from 'axios';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import './information_hub.scss';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const SpecialistDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchPost = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios.get(`https://project-back-81mh.onrender.com/info-hub/specialists/${id}/`);
                setPost(res.data);
                setComments(res.data.comments);
            }
            catch (_a) {
                message.error('Failed to load specialist details');
            }
        });
        fetchPost();
    }, [id]);
    const handleAddComment = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!newComment.trim()) {
            message.error('Comment content cannot be empty');
            return;
        }
        if (newRating === 0) {
            message.error('Please provide a rating before submitting');
            return;
        }
        try {
            const res = yield axios.post(`https://project-back-81mh.onrender.com/info-hub/specialists/${id}/comment/`, { content: newComment, rating: newRating }, { headers: { Authorization: `Bearer ${token}` } });
            setComments((prev) => [res.data, ...prev]);
            setNewComment('');
            setNewRating(0);
        }
        catch (_a) {
            message.error('Failed to add comment');
        }
    });
    return (_jsxs(Layout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed) }), _jsxs(Layout, { style: { marginLeft: collapsed ? 100 : 250 }, children: [_jsx(Header, { style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }, children: _jsx(Main_header, {}) }), _jsxs(Content, { className: "details-container", children: [_jsx(Button, { icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate('/info_hub'), className: "back-button", children: "Back" }), post && (_jsxs(Card, { className: "details-card", children: [_jsx("img", { src: post.photo, alt: post.name, className: "details-image" }), _jsx(Title, { children: post.name }), _jsx(Text, { type: "secondary", children: new Date(post.created_at).toLocaleString() }), _jsx("p", { children: post.description })] })), _jsx(Title, { level: 3, children: "Comments" }), _jsx(TextArea, { placeholder: "Write a comment...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsx(Text, { children: "Rate this specialist (required): " }), _jsx(Rate, { value: newRating, onChange: (value) => setNewRating(value) })] }), _jsx(Button, { type: "primary", onClick: handleAddComment, className: "comment-button", style: { marginTop: 10 }, children: "Add Comment" }), _jsx(List, { dataSource: comments, renderItem: (comment) => (_jsxs(List.Item, { children: [_jsx(List.Item.Meta, { title: comment.user.username, description: new Date(comment.created_at).toLocaleString() }), _jsx("p", { children: comment.content }), comment.rating && (_jsx(Rate, { disabled: true, value: comment.rating, style: { fontSize: 14 } }))] })) })] })] })] }));
};
export default SpecialistDetails;
