var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Input, List, Popconfirm, message, Rate, } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, LikeOutlined, } from '@ant-design/icons';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const NewsDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [post, setPost] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [newRating, setNewRating] = useState(0);
    const [editingId, setEditingId] = useState(null);
    const [editingContent, setEditingContent] = useState('');
    const token = localStorage.getItem('accessToken');
    useEffect(() => {
        const fetchPost = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const res = yield axios.get(`https://project-back-81mh.onrender.com/info-hub/news/${id}/`);
                setPost(res.data);
                setComments(res.data.comments);
            }
            catch (_a) {
                message.error('Failed to load news');
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
            const res = yield axios.post(`https://project-back-81mh.onrender.com/info-hub/news/${id}/comment/`, { content: newComment, rating: newRating }, { headers: { Authorization: `Bearer ${token}` } });
            setComments((prev) => [res.data, ...(prev || [])]);
            setNewComment('');
            setNewRating(0);
        }
        catch (_a) {
            message.error('Failed to add comment');
        }
    });
    const handleDelete = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.delete(`https://project-back-81mh.onrender.com/info-hub/news/comment/${commentId}/`, { headers: { Authorization: `Bearer ${token}` } });
            setComments((prev) => prev.filter((c) => c.id !== commentId));
        }
        catch (_a) {
            message.error('Failed to delete comment');
        }
    });
    const handleEdit = () => __awaiter(void 0, void 0, void 0, function* () {
        if (!editingContent.trim())
            return;
        try {
            const res = yield axios.patch(`https://project-back-81mh.onrender.com/info-hub/news/comment/${editingId}/`, { content: editingContent }, { headers: { Authorization: `Bearer ${token}` } });
            setComments((prev) => prev.map((c) => c.id === editingId ? Object.assign(Object.assign({}, c), { content: res.data.content }) : c));
            setEditingId(null);
        }
        catch (_a) {
            message.error('Failed to edit comment');
        }
    });
    const handleLike = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.post(`https://project-back-81mh.onrender.com/info-hub/news/comment/${commentId}/like/`, {}, { headers: { Authorization: `Bearer ${token}` } });
            setComments((prev) => prev.map((c) => c.id === commentId ? Object.assign(Object.assign({}, c), { likes_count: c.likes_count + 1 }) : c));
        }
        catch (_a) {
            message.error('Failed to like comment');
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
                        }, children: _jsx(Main_header, {}) }), _jsxs(Content, { className: "details-container", children: [_jsx(Button, { icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate('/info_hub'), className: "back-button", children: "Back" }), post && (_jsxs(Card, { className: "details-card", children: [_jsx("img", { src: post.photo, alt: post.title, className: "details-image" }), _jsx(Title, { children: post.title }), _jsx(Text, { type: "secondary", children: new Date(post.created_at).toLocaleString() }), _jsx("p", { children: post.content }), post.source && _jsxs(Text, { italic: true, children: ["Source: ", post.source] })] })), _jsx(Title, { level: 3, children: "Comments" }), _jsx(TextArea, { placeholder: "Write a comment...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsxs("div", { style: { marginTop: 8 }, children: [_jsx(Text, { children: "Rate this news (required): " }), _jsx(Rate, { value: newRating, onChange: (value) => setNewRating(value) })] }), _jsx(Button, { type: "primary", onClick: handleAddComment, className: "comment-button", style: { marginTop: 10 }, children: "Add Comment" }), _jsx(List, { dataSource: comments, renderItem: (comment) => (_jsxs(List.Item, { actions: [
                                        _jsx(Button, { icon: _jsx(LikeOutlined, {}), onClick: () => handleLike(comment.id), children: comment.likes_count }),
                                        _jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: () => {
                                                setEditingId(comment.id);
                                                setEditingContent(comment.content);
                                            } }),
                                        _jsx(Popconfirm, { title: "Are you sure?", onConfirm: () => handleDelete(comment.id), okText: "Yes", cancelText: "No", children: _jsx(Button, { danger: true, icon: _jsx(DeleteOutlined, {}) }) }),
                                    ], children: [_jsx(List.Item.Meta, { title: comment.user.username, description: new Date(comment.created_at).toLocaleString() }), editingId === comment.id ? (_jsxs(_Fragment, { children: [_jsx(TextArea, { value: editingContent, onChange: (e) => setEditingContent(e.target.value) }), _jsx(Button, { type: "primary", onClick: handleEdit, children: "Save" })] })) : (_jsxs(_Fragment, { children: [_jsx("p", { children: comment.content }), comment.rating && (_jsx(Rate, { disabled: true, value: comment.rating, style: { fontSize: 14 } }))] }))] })) })] })] })] }));
};
export default NewsDetails;
