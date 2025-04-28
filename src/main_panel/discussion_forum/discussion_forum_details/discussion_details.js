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
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Typography, Button, Input, message, Divider, Popconfirm, } from 'antd';
import { ArrowLeftOutlined, MessageOutlined, LikeOutlined, DeleteOutlined, } from '@ant-design/icons';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import axios from 'axios';
import dayjs from 'dayjs';
import { StyledLayout, StyledHeader, StyledContent, BackButton, DiscussionCard, DiscussionMeta, AuthorName, CategoryLabel, DiscussionText, CommentCount, AddCommentSection, AddCommentButton, CommentCard, CommentHeader, CommentAuthor, CommentDate, CommentText, CommentActions, } from './discussion-details.styled';
const { Title } = Typography;
const { TextArea } = Input;
const DiscussionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [post, setPost] = useState(null);
    const [newComment, setNewComment] = useState('');
    const [addingComment, setAddingComment] = useState(false);
    const token = localStorage.getItem('accessToken');
    const toggleCollapsed = () => setCollapsed(!collapsed);
    const fetchPostDetails = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios.get(`https://project-back-81mh.onrender.com/forum/posts/${id}/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPost(response.data);
        }
        catch (error) {
            message.error('Failed to load discussion details');
            console.error(error);
        }
    });
    useEffect(() => {
        fetchPostDetails();
    }, [id]);
    const handleAddComment = () => __awaiter(void 0, void 0, void 0, function* () {
        if (newComment.trim() === '')
            return;
        try {
            setAddingComment(true);
            const response = yield axios.post(`https://project-back-81mh.onrender.com/forum/posts/${id}/comment/`, { content: newComment }, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPost((prev) => prev ? Object.assign(Object.assign({}, prev), { comments: [response.data, ...prev.comments] }) : prev);
            setNewComment('');
            message.success('Comment added');
        }
        catch (error) {
            console.error(error);
            message.error('Failed to add comment');
        }
        finally {
            setAddingComment(false);
        }
    });
    const handleDeleteComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.delete(`https://project-back-81mh.onrender.com/forum/comments/${commentId}/delete/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPost((prev) => prev
                ? Object.assign(Object.assign({}, prev), { comments: prev.comments.filter((c) => c.id !== commentId) }) : prev);
            message.success('Comment deleted');
        }
        catch (error) {
            console.error(error);
            message.error('Failed to delete comment');
        }
    });
    const handleLikeComment = (commentId) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const response = yield axios.post(`https://project-back-81mh.onrender.com/forum/comments/${commentId}/like/`, {}, {
                headers: { Authorization: `Bearer ${token}` },
            });
            setPost((prev) => prev
                ? Object.assign(Object.assign({}, prev), { comments: prev.comments.map((c) => c.id === commentId
                        ? Object.assign(Object.assign({}, c), { likes_count: response.data.likes_count }) : c) }) : prev);
        }
        catch (error) {
            console.error(error);
            message.error('Failed to like comment');
        }
    });
    const handleDeletePost = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.delete(`https://project-back-81mh.onrender.com/forum/posts/${id}/delete/`, {
                headers: { Authorization: `Bearer ${token}` },
            });
            message.success('Post deleted successfully');
            navigate('/discussion-forum');
        }
        catch (error) {
            console.error(error);
            message.error('Failed to delete post');
        }
    });
    return (_jsxs(StyledLayout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: toggleCollapsed, selectedPage: "/discussion-forum" }), _jsxs(Layout, { style: { marginLeft: collapsed ? 100 : 250 }, children: [_jsx(StyledHeader, { children: _jsx(Main_header, {}) }), _jsxs(StyledContent, { children: [_jsx(BackButton, { type: "link", icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate(-1), children: "Back" }), post && (_jsxs(_Fragment, { children: [_jsx(Title, { level: 2, style: { color: '#333' }, children: post.title }), _jsxs(DiscussionCard, { children: [_jsxs(DiscussionMeta, { children: [_jsx(AuthorName, { children: post.user }), _jsx(CategoryLabel, { children: post.category })] }), _jsx(Divider, {}), _jsx(DiscussionText, { children: post.content }), _jsxs(CommentCount, { children: [_jsx(MessageOutlined, { style: { marginRight: 6, color: '#426B1F' } }), post.comments.length, " comments"] }), _jsx(Popconfirm, { title: "Are you sure you want to delete this post?", onConfirm: handleDeletePost, okText: "Yes", cancelText: "No", children: _jsx(Button, { type: "primary", danger: true, icon: _jsx(DeleteOutlined, {}), style: { marginTop: '20px' }, children: "Delete Post" }) })] }), _jsxs(AddCommentSection, { children: [_jsx(TextArea, { rows: 3, placeholder: "Write your comment here...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsx(AddCommentButton, { type: "primary", onClick: handleAddComment, loading: addingComment, children: "Add Comment" })] }), post.comments.map((comment) => (_jsxs(CommentCard, { children: [_jsxs(CommentHeader, { children: [_jsx(CommentAuthor, { children: comment.user }), _jsx(CommentDate, { children: dayjs(comment.created_at).format('MMM D, YYYY HH:mm') })] }), _jsx(CommentText, { children: comment.content }), _jsxs(CommentActions, { children: [_jsx(Button, { size: "small", icon: _jsx(LikeOutlined, {}), onClick: () => handleLikeComment(comment.id), children: comment.likes_count }), _jsx(Popconfirm, { title: "Delete this comment?", onConfirm: () => handleDeleteComment(comment.id), okText: "Yes", cancelText: "No", children: _jsx(Button, { size: "small", danger: true, icon: _jsx(DeleteOutlined, {}), style: { marginLeft: '10px' }, children: "Delete" }) })] })] }, comment.id)))] }))] })] })] }));
};
export default DiscussionDetails;
