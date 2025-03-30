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
import { useRef, useState } from 'react';
import { Typography, Card, Input, Button, Layout, message } from 'antd';
import { RightOutlined, LeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './information_hub.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
const { Title } = Typography;
const { Meta } = Card;
const { Search } = Input;
const { Header, Content } = Layout;
const InformationHub = () => {
    const newsRef = useRef(null);
    const specialistsRef = useRef(null);
    const centersRef = useRef(null);
    const [collapsed, setCollapsed] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();
    const scrollLeft = (ref) => {
        if (ref.current)
            ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    };
    const scrollRight = (ref) => {
        if (ref.current)
            ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    };
    const fetchItems = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get('https://project-back-81mh.onrender.com/hub/items/', {
            headers: {
                'Accept': 'application/json',
            },
        });
        return response.data;
    });
    const { data: items, isError } = useQuery({
        queryKey: ['hubItems'],
        queryFn: fetchItems,
    });
    if (isError) {
        message.error('Failed to load information hub items');
        return null;
    }
    const filtered = (type) => (items === null || items === void 0 ? void 0 : items.filter((item) => item.type === type && item.title.toLowerCase().includes(searchTerm.toLowerCase()))) || [];
    return (_jsxs(Layout, Object.assign({ className: "info-hub-layout" }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: '/info_hub' }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 70 : 250, transition: 'margin-left 0.3s ease' } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "content-container" }, { children: [_jsxs("div", Object.assign({ className: "name-search" }, { children: [_jsx("h1", Object.assign({ className: "title" }, { children: "Information Hub" })), _jsx(Search, { placeholder: "Search for topics, keywords", className: "search-bar", allowClear: true, enterButton: true, onChange: (e) => setSearchTerm(e.target.value) })] })), _jsxs("section", Object.assign({ className: "section" }, { children: [_jsx(Title, Object.assign({ level: 3, className: "section-title" }, { children: "Latest News :" })), _jsxs("div", Object.assign({ className: "scroll-container" }, { children: [_jsx(Button, { className: "scroll-btn", icon: _jsx(LeftOutlined, {}), onClick: () => scrollLeft(newsRef) }), _jsx("div", Object.assign({ className: "scroll-content", ref: newsRef }, { children: filtered('news').map((item) => (_jsxs(Card, Object.assign({ className: "info-card", hoverable: true, onClick: () => navigate(`/info_hub/news/${item.id}`) }, { children: [_jsx("img", { src: item.image, alt: item.title, className: "card-image" }), _jsx(Meta, { title: item.title, description: item.content.substring(0, 60) + '...' })] }), item.id))) })), _jsx(Button, { className: "scroll-btn", icon: _jsx(RightOutlined, {}), onClick: () => scrollRight(newsRef) })] }))] })), _jsxs("section", Object.assign({ className: "section" }, { children: [_jsx(Title, Object.assign({ level: 3, className: "section-title" }, { children: "Specialists :" })), _jsxs("div", Object.assign({ className: "scroll-container" }, { children: [_jsx(Button, { className: "scroll-btn", icon: _jsx(LeftOutlined, {}), onClick: () => scrollLeft(specialistsRef) }), _jsx("div", Object.assign({ className: "scroll-content", ref: specialistsRef }, { children: filtered('specialist').map((item) => (_jsxs(Card, Object.assign({ className: "info-card", hoverable: true, onClick: () => navigate(`/info_hub/specialist/${item.id}`) }, { children: [_jsx("img", { src: item.image, alt: item.title, className: "card-image" }), _jsx(Meta, { title: item.title, description: `Rating: ${item.average_rating}` })] }), item.id))) })), _jsx(Button, { className: "scroll-btn", icon: _jsx(RightOutlined, {}), onClick: () => scrollRight(specialistsRef) })] }))] })), _jsxs("section", Object.assign({ className: "section" }, { children: [_jsx(Title, Object.assign({ level: 3, className: "section-title" }, { children: "Therapy Centers :" })), _jsxs("div", Object.assign({ className: "scroll-container" }, { children: [_jsx(Button, { className: "scroll-btn", icon: _jsx(LeftOutlined, {}), onClick: () => scrollLeft(centersRef) }), _jsx("div", Object.assign({ className: "scroll-content", ref: centersRef }, { children: filtered('center').map((item) => (_jsxs(Card, Object.assign({ className: "info-card", hoverable: true, onClick: () => navigate(`/info_hub/therapy-center/${item.id}`) }, { children: [_jsx("img", { src: item.image, alt: item.title, className: "card-image" }), _jsx(Meta, { title: item.title, description: `Tags: ${item.tags.map(tag => tag.name).join(', ')}` })] }), item.id))) })), _jsx(Button, { className: "scroll-btn", icon: _jsx(RightOutlined, {}), onClick: () => scrollRight(centersRef) })] }))] }))] }))] }))] })));
};
export default InformationHub;
//# sourceMappingURL=information_hub.js.map