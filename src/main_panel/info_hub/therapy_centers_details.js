import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Rate, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const specialistsData = [
    {
        name: 'Абдиев Габит Серикович',
        specialization: 'Urologist',
        experience: '15 years',
        location: 'Almaty, Kazakhstan',
        rating: 4.5,
        image: '/images/specialist.jpg',
    },
];
const TherapyCentersDetails = () => {
    const { id } = useParams();
    const specialist = specialistsData[Number(id)];
    const navigate = useNavigate();
    const [rating, setRating] = useState(specialist.rating);
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
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "details-container" }, { children: [_jsx(Button, Object.assign({ icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate('/info_hub'), className: "back-button" }, { children: "Back" })), _jsxs(Card, Object.assign({ className: "details-card" }, { children: [_jsx("img", { src: specialist.image, alt: specialist.name, className: "details-image" }), _jsx(Title, { children: specialist.name }), _jsx(Text, Object.assign({ strong: true }, { children: specialist.specialization })), _jsxs(Text, { children: ["Experience: ", specialist.experience] }), _jsxs(Text, { children: ["Location: ", specialist.location] }), _jsx(Rate, { allowHalf: true, defaultValue: rating, onChange: (value) => setRating(value) })] })), _jsx(Title, Object.assign({ level: 3 }, { children: "Comments" })), _jsx(TextArea, { placeholder: "Write a comment...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsx(Button, Object.assign({ type: "primary", onClick: handleAddComment, className: "comment-button" }, { children: "Add Comment" })), _jsx(List, { dataSource: comments, renderItem: (comment, index) => _jsx(List.Item, { children: comment }, index) })] }))] }))] }));
};
export default TherapyCentersDetails;
//# sourceMappingURL=therapy_centers_details.js.map