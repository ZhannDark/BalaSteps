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
import { useState } from 'react';
import { Layout, Input, Modal, Form, Upload, Select, Tabs, message, Skeleton, Button, Popconfirm, } from 'antd';
import { PlusOutlined, UploadOutlined, DeleteOutlined, } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import { MarketplaceLayout, MarketplaceContent, TopBar, MarketplaceTitle, AddItemButton, ItemsGrid, ItemCard, ItemImage, } from './marketplace.styled';
import img from '../../assets/images/main_content/ default_img/no_img.png';
const { Header } = Layout;
const { Option } = Select;
const { TabPane } = Tabs;
const accessToken = localStorage.getItem('accessToken');
const Marketplace = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [form] = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [activeTab, setActiveTab] = useState('all');
    const [selectedImages, setSelectedImages] = useState([]);
    const [editingItem, setEditingItem] = useState(null);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const { data: myItems = [], isLoading: myItemsLoading } = useQuery({
        queryKey: ['my-items'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios.get('https://project-back-81mh.onrender.com/marketplace/my-items/', {
                headers: { Authorization: `Bearer ${accessToken}` },
            })).data;
        }),
    });
    const { data: publicItems = [], isLoading: publicItemsLoading } = useQuery({
        queryKey: ['public-items'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios.get('https://project-back-81mh.onrender.com/marketplace/public-items/')).data;
        }),
    });
    const { data: categories = [] } = useQuery({
        queryKey: ['categories'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios.get('https://project-back-81mh.onrender.com/marketplace/categories/')).data;
        }),
    });
    const { data: availabilities = [] } = useQuery({
        queryKey: ['availabilities'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios.get('https://project-back-81mh.onrender.com/marketplace/availability-types/')).data;
        }),
    });
    const { data: conditions = [] } = useQuery({
        queryKey: ['conditions'],
        queryFn: () => __awaiter(void 0, void 0, void 0, function* () {
            return (yield axios.get('https://project-back-81mh.onrender.com/marketplace/conditions/')).data;
        }),
    });
    const addItemMutation = useMutation({
        mutationFn: (formData) => axios.post('https://project-back-81mh.onrender.com/marketplace/my-items/', formData, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
                'Content-Type': 'multipart/form-data',
            },
        }),
        onSuccess: (response) => __awaiter(void 0, void 0, void 0, function* () {
            const newItem = response.data;
            if (selectedImages.length > 0) {
                const imageForm = new FormData();
                selectedImages.forEach((file) => {
                    imageForm.append('images', file.originFileObj);
                });
                try {
                    yield axios.post('https://project-back-81mh.onrender.com/marketplace/equipment-photos/', imageForm, {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                            'Content-Type': 'multipart/form-data',
                        },
                        params: { item_id: newItem.id },
                    });
                }
                catch (err) {
                    console.error('Image upload error:', err);
                }
            }
            queryClient.invalidateQueries({ queryKey: ['my-items'] });
            queryClient.invalidateQueries({ queryKey: ['public-items'] });
            message.success('Item added!');
            resetForm();
        }),
        onError: () => message.error('Failed to add item'),
    });
    const deleteItemMutation = useMutation({
        mutationFn: (id) => axios.delete(`https://project-back-81mh.onrender.com/marketplace/my-items/${id}/`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        }),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['my-items'] });
            message.success('Item deleted!');
        },
        onError: () => message.error('Failed to delete item'),
    });
    const resetForm = () => {
        setIsModalOpen(false);
        form.resetFields();
        setSelectedImages([]);
        setEditingItem(null);
    };
    const handleAddItem = (values) => {
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('location', values.location);
        formData.append('contact_method', values.contact_method);
        formData.append('category_id', values.category);
        formData.append('condition_id', values.condition);
        if (Array.isArray(values.availability)) {
            values.availability.forEach((id) => {
                formData.append('availability_ids', id);
            });
        }
        addItemMutation.mutate(formData);
    };
    const handleCardClick = (item) => {
        if (activeTab === 'my') {
            navigate(`/marketplace/my-items/${item.id}`);
        }
        else {
            navigate(`/marketplace/public-items/${item.id}`);
        }
    };
    const displayedItems = activeTab === 'my' ? myItems : publicItems;
    const filteredItems = displayedItems.filter((item) => selectedCategory ? item.category.id === selectedCategory : true);
    const loading = myItemsLoading || publicItemsLoading;
    return (_jsxs(MarketplaceLayout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: "/marketplace" }), _jsxs(Layout, { style: { marginLeft: collapsed ? 100 : 250 }, children: [_jsx(Header, { style: { background: '#E2E3E0', height: '48px', padding: 0 }, children: _jsx(Main_header, {}) }), _jsxs(MarketplaceContent, { children: [_jsxs(TopBar, { children: [_jsx(MarketplaceTitle, { children: "Marketplace" }), _jsxs(AddItemButton, { onClick: () => setIsModalOpen(true), children: [_jsx(PlusOutlined, {}), " Add Item"] })] }), _jsxs(Tabs, { defaultActiveKey: "all", onChange: setActiveTab, children: [_jsx(TabPane, { tab: "All" }, "all"), _jsx(TabPane, { tab: "My Items" }, "my")] }), _jsx(Select, { placeholder: "Filter by category", style: { width: 250, marginBottom: 20 }, onChange: (value) => setSelectedCategory(value), allowClear: true, children: categories.map((cat) => (_jsx(Option, { value: cat.id, children: cat.name }, cat.id))) }), _jsx(ItemsGrid, { children: loading
                                    ? Array.from({ length: 6 }).map((_, index) => (_jsx(Skeleton.Button, { active: true, style: { width: 280, height: 340 } }, index)))
                                    : filteredItems.map((item) => {
                                        var _a;
                                        return (_jsxs(ItemCard, { onClick: () => handleCardClick(item), children: [_jsx(ItemImage, { src: ((_a = item === null || item === void 0 ? void 0 : item.photos) === null || _a === void 0 ? void 0 : _a.length) ? item.photos[0].image_url : img, alt: item.name }), _jsxs("div", { style: { padding: '10px' }, children: [_jsx("h3", { style: { marginBottom: 8 }, children: item.name }), _jsxs("p", { style: { fontWeight: 'bold' }, children: [item.price, " \u20B8"] })] }), activeTab === 'my' && (_jsx("div", { style: {
                                                        marginTop: 10,
                                                        display: 'flex',
                                                        justifyContent: 'space-between',
                                                    }, children: _jsx(Popconfirm, { title: "Delete this item?", onConfirm: () => deleteItemMutation.mutate(item.id), okText: "Yes", cancelText: "No", children: _jsx(Button, { icon: _jsx(DeleteOutlined, {}), danger: true, onClick: (e) => e.stopPropagation() }) }) }))] }, item.id));
                                    }) }), isModalOpen && (_jsx(motion.div, { initial: { scale: 0.8, opacity: 0 }, animate: { scale: 1, opacity: 1 }, children: _jsx(Modal, { title: "Add New Item", open: isModalOpen, onCancel: () => resetForm(), footer: null, destroyOnClose: true, children: _jsxs(Form, { layout: "vertical", form: form, onFinish: handleAddItem, children: [_jsx(Form.Item, { name: "name", label: "Item Name", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "description", label: "Description", rules: [{ required: true }], children: _jsx(Input.TextArea, {}) }), _jsx(Form.Item, { name: "price", label: "Price", rules: [{ required: true }], children: _jsx(Input, { type: "number" }) }), _jsx(Form.Item, { name: "location", label: "Location", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "contact_method", label: "Contact Method", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "availability", label: "Availability", rules: [{ required: true }], children: _jsx(Select, { mode: "multiple", placeholder: "Select availability", children: availabilities.map((a) => (_jsx(Option, { value: a.id, children: a.name }, a.id))) }) }), _jsx(Form.Item, { name: "condition", label: "Condition", rules: [{ required: true }], children: _jsx(Select, { placeholder: "Select condition", children: conditions.map((c) => (_jsx(Option, { value: c.id, children: c.name }, c.id))) }) }), _jsx(Form.Item, { name: "category", label: "Category", rules: [{ required: true }], children: _jsx(Select, { placeholder: "Select category", children: categories.map((cat) => (_jsx(Option, { value: cat.id, children: cat.name }, cat.id))) }) }), _jsx(Form.Item, { label: "Upload Images", children: _jsxs(Upload.Dragger, { multiple: true, listType: "picture", beforeUpload: () => false, fileList: selectedImages, onChange: ({ fileList }) => setSelectedImages(fileList.slice(0, 5)), children: [_jsx("p", { className: "ant-upload-drag-icon", children: _jsx(UploadOutlined, {}) }), _jsx("p", { children: "Click or drag files here to upload (Max 5)" })] }) }), _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "Add Item" })] }) }) }))] })] })] }));
};
export default Marketplace;
