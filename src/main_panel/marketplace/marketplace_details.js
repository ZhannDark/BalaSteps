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
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Layout, Typography, Descriptions, Skeleton, Carousel, Button, Popconfirm, message, } from 'antd';
import { ArrowLeftOutlined, EditOutlined, DeleteOutlined, } from '@ant-design/icons';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import axios from 'axios';
import { DetailsContainer, BackButton, DetailsCard, ItemImage, CarouselWrapper, ButtonGroup, InfoSection, } from './marketplace-details.styled';
import imgPlaceholder from '../../assets/images/main_content/ default_img/no_img.png';
const { Header } = Layout;
const { Title } = Typography;
const MarketplaceDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const [item, setItem] = useState(null);
    const [collapsed, setCollapsed] = useState(false);
    const [loading, setLoading] = useState(true);
    const accessToken = localStorage.getItem('accessToken');
    const isMyItem = location.pathname.includes('my-items');
    const fetchItem = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const endpoint = isMyItem
                ? `https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`
                : `https://project-back-81mh.onrender.com/marketplace/public-items/${id}/`;
            const response = yield axios.get(endpoint, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            setItem(response.data);
        }
        catch (error) {
            console.error('Failed to load item details', error);
        }
        finally {
            setLoading(false);
        }
    });
    useEffect(() => {
        fetchItem();
    }, [id]);
    const handleDelete = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.delete(`https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            message.success('Item deleted successfully!');
            navigate('/marketplace');
        }
        catch (error) {
            console.error('Failed to delete item', error);
            message.error('Failed to delete item');
        }
    });
    const handleEdit = () => {
        navigate(`/marketplace/my-items/${id}/edit`);
    };
    return (_jsxs(Layout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: "/marketplace" }), _jsxs(Layout, { style: { marginLeft: collapsed ? 100 : 250 }, children: [_jsx(Header, { style: {
                            padding: 0,
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        }, children: _jsx(Main_header, {}) }), _jsxs(DetailsContainer, { children: [_jsx(BackButton, { type: "link", icon: _jsx(ArrowLeftOutlined, {}), onClick: () => navigate(-1), children: "Back" }), loading ? (_jsx(Skeleton, { active: true, paragraph: { rows: 8 } })) : item ? (_jsxs(DetailsCard, { children: [_jsx(CarouselWrapper, { children: _jsx(Carousel, { autoplay: true, children: item.photos.length > 0 ? (item.photos.map((photo) => (_jsx("div", { children: _jsx(ItemImage, { src: photo.image_url, alt: "Item Photo" }) }, photo.id)))) : (_jsx("div", { children: _jsx(ItemImage, { src: imgPlaceholder, alt: "No image available" }) })) }) }), _jsxs(InfoSection, { children: [_jsx(Title, { level: 2, children: item.name }), isMyItem && (_jsxs(ButtonGroup, { children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), onClick: handleEdit, children: "Edit" }), _jsx(Popconfirm, { title: "Are you sure to delete this item?", onConfirm: handleDelete, okText: "Yes", cancelText: "No", children: _jsx(Button, { icon: _jsx(DeleteOutlined, {}), danger: true, children: "Delete" }) })] })), _jsxs(Descriptions, { column: 1, bordered: true, size: "middle", children: [_jsx(Descriptions.Item, { label: "Description", children: item.description }), _jsxs(Descriptions.Item, { label: "Price", children: [item.price, " \u20B8"] }), _jsx(Descriptions.Item, { label: "Location", children: item.location }), _jsx(Descriptions.Item, { label: "Condition", children: item.condition.name }), _jsx(Descriptions.Item, { label: "Contact Method", children: item.contact_method }), _jsx(Descriptions.Item, { label: "Category", children: item.category.name })] })] })] })) : (_jsx(Skeleton, { active: true }))] })] })] }));
};
export default MarketplaceDetails;
