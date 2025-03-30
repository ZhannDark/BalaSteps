import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Layout, Button, Typography, Card, Rate, Input, List } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;
const marketplaceItems = [
    { id: 0, name: 'Pediatric Wheelchair', image: '/images/wheelchair.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 1, name: 'Nebulizer Machine', image: '/images/nebulizer.jpg', description: 'A medical nebulizer for children.', price: '$75' },
];
const MarketplaceDetails = () => {
    const { id } = useParams();
    const item = marketplaceItems[Number(id)];
    const navigate = useNavigate();
    const [rating, setRating] = useState(4.5);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');
    const [collapsed, setCollapsed] = useState(false);
    const handleAddComment = () => {
        if (newComment.trim()) {
            setComments([newComment, ...comments]);
            setNewComment('');
        }
    };
    return (_jsxs(Layout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: '/marketplace' }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s' } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "details-container" }, { children: [_jsx(Button, Object.assign({ icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate('/'), className: "back-button" }, { children: "Back" })), _jsxs(Card, Object.assign({ className: "details-card" }, { children: [_jsx("img", { src: item.image, alt: item.name, className: "details-image" }), _jsx(Title, { children: item.name }), _jsxs(Text, Object.assign({ strong: true }, { children: ["Price: ", item.price] })), _jsx("p", { children: item.description }), _jsx(Rate, { allowHalf: true, defaultValue: rating, onChange: (value) => setRating(value) })] })), _jsx(Title, Object.assign({ level: 3 }, { children: "Comments" })), _jsx(TextArea, { placeholder: "Write a comment...", value: newComment, onChange: (e) => setNewComment(e.target.value) }), _jsx(Button, Object.assign({ type: "primary", onClick: handleAddComment, className: "comment-button" }, { children: "Add Comment" })), _jsx(List, { dataSource: comments, renderItem: (comment, index) => _jsx(List.Item, { children: comment }, index) })] }))] }))] }));
};
export default MarketplaceDetails;
//# sourceMappingURL=marketplace_details.js.map