import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Layout, Typography, Input, Button, Card, Modal, Form, Upload } from 'antd';
import { SearchOutlined, PlusOutlined, UploadOutlined } from '@ant-design/icons';
import './marketplace.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
const { Title } = Typography;
const { Header, Content } = Layout;
const { Meta } = Card;
const { Dragger } = Upload;
const marketplaceItems = [
    { id: 0, name: 'Pediatric Wheelchair', image: '/images/wheelchair.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 1, name: 'Nebulizer Machine', image: '/images/nebulizer.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 2, name: 'Standing Frame for Kids', image: '/images/standing-frame.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 3, name: 'Gait Trainer Walker', image: '/images/walker.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 4, name: 'Adaptive Stroller', image: '/images/stroller.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 5, name: 'Orthopedic Braces & Splints', image: '/images/braces.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 6, name: 'Feeding Pump & Accessories', image: '/images/feeding-pump.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
    { id: 7, name: 'Hospital Bed for Home Use', image: '/images/hospital-bed.jpg', description: 'A high-quality wheelchair for kids.', price: '$250' },
];
const Marketplace = () => {
    const [items, setItems] = useState(marketplaceItems);
    const [searchTerm, setSearchTerm] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const filteredItems = items.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    // Handle Modal Open/Close
    const showModal = () => setIsModalOpen(true);
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    // Handle Item Addition
    const handleAddItem = (values) => {
        var _a, _b, _c;
        const newItem = {
            id: items.length + 1,
            name: values.name,
            image: ((_c = (_b = (_a = values.image) === null || _a === void 0 ? void 0 : _a.file) === null || _b === void 0 ? void 0 : _b.response) === null || _c === void 0 ? void 0 : _c.url) || '/images/default-placeholder.png',
            description: values.description,
            price: `$${values.price}`,
        };
        setItems([...items, newItem]);
        setIsModalOpen(false);
        form.resetFields();
    };
    return (_jsxs(Layout, Object.assign({ className: "marketplace-layout" }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: '/marketplace' }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s' } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            marginLeft: '5px',
                            background: '#E2E3E0',
                            height: '48px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "marketplace-content" }, { children: [_jsxs("div", Object.assign({ className: "search-add-container" }, { children: [_jsx(Title, Object.assign({ className: "marketplace-title" }, { children: "Marketplace" })), _jsx(Input, { placeholder: "Search for topics, keywords", className: "search-bar", prefix: _jsx(SearchOutlined, {}), value: searchTerm, onChange: (e) => setSearchTerm(e.target.value) }), _jsx(Button, Object.assign({ type: "primary", icon: _jsx(PlusOutlined, {}), className: "add-item-button", onClick: showModal }, { children: "Add Item" }))] })), _jsx("div", Object.assign({ className: "items-grid" }, { children: filteredItems.map((item) => (_jsx(Card, Object.assign({ className: "item-card", hoverable: true, cover: _jsx("img", { alt: item.name, src: item.image, className: "item-image" }), onClick: () => navigate(`/marketplace/${item.id}`) }, { children: _jsx(Meta, { title: item.name, className: "item-title" }) }), item.id))) }))] }))] })), _jsx(Modal, Object.assign({ title: "Add New Item", open: isModalOpen, onCancel: handleCancel, footer: null }, { children: _jsxs(Form, Object.assign({ form: form, layout: "vertical", onFinish: handleAddItem }, { children: [_jsx(Form.Item, Object.assign({ label: "Item Name", name: "name", rules: [{ required: true, message: 'Enter item name' }] }, { children: _jsx(Input, { placeholder: "Enter item name..." }) })), _jsx(Form.Item, Object.assign({ label: "Upload Image", name: "image" }, { children: _jsx(Dragger, Object.assign({ name: "file", action: "/upload", listType: "picture" }, { children: _jsx(Button, Object.assign({ icon: _jsx(UploadOutlined, {}) }, { children: "Click to Upload" })) })) })), _jsx(Form.Item, Object.assign({ label: "Description", name: "description", rules: [{ required: true, message: 'Enter item description' }] }, { children: _jsx(Input.TextArea, { rows: 3, placeholder: "Enter description..." }) })), _jsx(Form.Item, Object.assign({ label: "Price", name: "price", rules: [{ required: true, message: 'Enter item price' }] }, { children: _jsx(Input, { type: "number", placeholder: "Enter price in $" }) })), _jsx(Button, Object.assign({ type: "primary", htmlType: "submit" }, { children: "Add Item" }))] })) }))] })));
};
export default Marketplace;
//# sourceMappingURL=marketplace.js.map