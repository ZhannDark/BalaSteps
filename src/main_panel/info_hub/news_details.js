import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const newsData = [
    {
        title: 'Kazakhstan Allocates $2.7M in Recovered Assets',
        source: 'Astana Times',
        date: 'March 10, 2025',
        link: 'https://astanatimes.com',
        image: '/images/news1.jpg',
        description: 'Kazakhstan is investing in schools using recovered assets...',
    },
    {
        title: 'Kazakhstan to Build Kindergarten for Special Needs Kids',
        source: 'Inform',
        date: 'March 8, 2025',
        link: 'https://inform.kz',
        image: '/images/news2.jpg',
        description: 'The government plans to build a new kindergarten...',
    },
];
const NewsDetails = () => {
    const { id } = useParams();
    const news = newsData[Number(id)];
    const navigate = useNavigate();
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([newComment, ...comments]);
            setNewComment('');
        }
    };
    const toggleCollapsed = () => {
        setCollapsed(!collapsed);
    };
    return (_jsxs(Layout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: toggleCollapsed, selectedPage: '/info_hub' }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s ease' } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "details-container" }, { children: [_jsx(Button, Object.assign({ icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate('/info_hub'), className: "back-button" }, { children: "Back" })), _jsxs(Card, Object.assign({ className: "details-card" }, { children: [_jsx("img", { src: news.image, alt: news.title, className: "details-image" }), _jsx(Title, { children: news.title }), _jsxs(Text, Object.assign({ strong: true }, { children: ["Source: ", _jsx("a", Object.assign({ href: news.link, target: "_blank", rel: "noopener noreferrer" }, { children: news.source }))] })), _jsx(Text, Object.assign({ type: "secondary" }, { children: news.date })), _jsx("p", { children: news.description })] })), _jsx(Title, Object.assign({ level: 3 }, { children: "Comments" })), _jsx(TextArea, { placeholder: "Write a comment...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsx(Button, Object.assign({ type: "primary", onClick: handleAddComment, className: "comment-button" }, { children: "Add Comment" })), _jsx(List, { dataSource: comments, renderItem: (comment, index) => _jsx(List.Item, { children: comment }, index) })] }))] }))] }));
};
export default NewsDetails;
//# sourceMappingURL=news_details.js.map