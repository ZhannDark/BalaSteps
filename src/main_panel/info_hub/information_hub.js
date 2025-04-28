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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './information_hub.scss';
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
    // Fetch functions
    const fetchNews = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios.get('https://project-back-81mh.onrender.com/info-hub/news/');
        return res.data;
    });
    const fetchSpecialists = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios.get('https://project-back-81mh.onrender.com/info-hub/specialists/');
        return res.data;
    });
    const fetchCenters = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios.get('https://project-back-81mh.onrender.com/info-hub/centers/');
        return res.data;
    });
    // Queries
    const { data: news = [], isError: newsError } = useQuery({
        queryKey: ['news'],
        queryFn: fetchNews,
    });
    const { data: specialists = [], isError: specialistsError } = useQuery({
        queryKey: ['specialists'],
        queryFn: fetchSpecialists,
    });
    const { data: centers = [], isError: centersError } = useQuery({
        queryKey: ['centers'],
        queryFn: fetchCenters,
    });
    if (newsError || specialistsError || centersError) {
        message.error('Failed to load information hub items');
        return null;
    }
    const scrollLeft = (ref) => {
        if (ref.current)
            ref.current.scrollBy({ left: -300, behavior: 'smooth' });
    };
    const scrollRight = (ref) => {
        if (ref.current)
            ref.current.scrollBy({ left: 300, behavior: 'smooth' });
    };
    const filterNews = () => news.filter((item) => item.title.toLowerCase().includes(searchTerm.toLowerCase()));
    const filterSpecialists = () => specialists.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const filterCenters = () => centers.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    return (_jsxs(Layout, { className: "info-hub-layout", children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed) }), _jsxs(Layout, { style: { marginLeft: collapsed ? 70 : 250 }, children: [_jsx(Header, { style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }, children: _jsx(Main_header, {}) }), _jsxs(Content, { className: "content-container", children: [_jsxs("div", { className: "name-search", children: [_jsx("h1", { className: "title", children: "Information Hub" }), _jsx(Search, { placeholder: "Search for topics, keywords", className: "search-bar", allowClear: true, enterButton: true, onChange: (e) => setSearchTerm(e.target.value) })] }), _jsxs("section", { className: "section", children: [_jsx(Title, { level: 3, className: "section-title", children: "Latest News:" }), _jsxs("div", { className: "scroll-container", children: [_jsx(Button, { className: "scroll-btn", icon: _jsx(LeftOutlined, {}), onClick: () => scrollLeft(newsRef) }), _jsx("div", { className: "scroll-content", ref: newsRef, children: filterNews().map((item) => (_jsxs(Card, { className: "info-card", hoverable: true, onClick: () => navigate(`/info_hub/news/${item.id}`), children: [_jsx("img", { src: item.photo, alt: item.title, className: "card-image" }), _jsx(Meta, { title: item.title, description: (item.content ? item.content.slice(0, 60) : '') + '...' })] }, item.id))) }), _jsx(Button, { className: "scroll-btn", icon: _jsx(RightOutlined, {}), onClick: () => scrollRight(newsRef) })] })] }), _jsxs("section", { className: "section", children: [_jsx(Title, { level: 3, className: "section-title", children: "Specialists:" }), _jsxs("div", { className: "scroll-container", children: [_jsx(Button, { className: "scroll-btn", icon: _jsx(LeftOutlined, {}), onClick: () => scrollLeft(specialistsRef) }), _jsx("div", { className: "scroll-content", ref: specialistsRef, children: filterSpecialists().map((item) => (_jsxs(Card, { className: "info-card", hoverable: true, onClick: () => navigate(`/info_hub/specialist/${item.id}`), children: [_jsx("img", { src: item.photo, alt: item.name, className: "card-image" }), _jsx(Meta, { title: item.name, description: `Tags: ${item.tags.map((tag) => tag.name).join(', ')}` })] }, item.id))) }), _jsx(Button, { className: "scroll-btn", icon: _jsx(RightOutlined, {}), onClick: () => scrollRight(specialistsRef) })] })] }), _jsxs("section", { className: "section", children: [_jsx(Title, { level: 3, className: "section-title", children: "Therapy Centers:" }), _jsxs("div", { className: "scroll-container", children: [_jsx(Button, { className: "scroll-btn", icon: _jsx(LeftOutlined, {}), onClick: () => scrollLeft(centersRef) }), _jsx("div", { className: "scroll-content", ref: centersRef, children: filterCenters().map((item) => (_jsxs(Card, { className: "info-card", hoverable: true, onClick: () => navigate(`/info_hub/therapy-center/${item.id}`), children: [_jsx("img", { src: item.photo, alt: item.name, className: "card-image" }), _jsx(Meta, { title: item.name, description: `Tags: ${item.tags.map((tag) => tag.name).join(', ')}` })] }, item.id))) }), _jsx(Button, { className: "scroll-btn", icon: _jsx(RightOutlined, {}), onClick: () => scrollRight(centersRef) })] })] })] })] })] }));
};
export default InformationHub;
