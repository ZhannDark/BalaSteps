import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import { Button, Layout, Typography, Card, Modal, Form, Input, DatePicker, Space, theme, } from 'antd';
import dayjs from 'dayjs';
import './symptom_tracker.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
const { Title, Text } = Typography;
const { Header, Content } = Layout;
const SymptomTracker = () => {
    const [symptoms, setSymptoms] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [collapsed, setCollapsed] = useState(false); // Добавляем состояние для сворачивания
    const [form] = Form.useForm();
    const { token: { colorBgContainer, borderRadiusLG }, } = theme.useToken();
    const showAddSymptomModal = () => {
        setIsModalOpen(true);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleAddSymptom = (values) => {
        const newSymptom = {
            id: symptoms.length + 1,
            name: values.name,
            actions: values.actions,
            date: dayjs(values.date).format('DD/MM/YYYY'),
        };
        setSymptoms([...symptoms, newSymptom]);
        setIsModalOpen(false);
        form.resetFields();
    };
    const handleToggleMenu = () => {
        setCollapsed(!collapsed);
    };
    return (_jsxs(Layout, Object.assign({ style: { minHeight: '100vh' } }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: handleToggleMenu }), ' ', _jsxs(Layout, Object.assign({ style: {
                    marginLeft: collapsed ? 100 : 250,
                    transition: 'margin-left 0.3s',
                } }, { children: [_jsx(Header, Object.assign({ style: {
                            padding: 0,
                            background: colorBgContainer,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                        } }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ style: {
                            margin: '10px 8px',
                            padding: 24,
                            minHeight: 280,
                            background: '#F6F6F6',
                            borderRadius: borderRadiusLG,
                        } }, { children: [_jsx(Title, Object.assign({ level: 2, className: "title" }, { children: "Symptom Tracker" })), _jsx(Button, Object.assign({ type: "primary", icon: _jsx(PlusOutlined, {}), onClick: showAddSymptomModal, className: "add-button" }, { children: "Add Symptom" })), _jsx(Space, Object.assign({ direction: "vertical", style: { width: '100%' } }, { children: symptoms.map((symptom) => (_jsxs(Card, Object.assign({ className: "symptom-card" }, { children: [_jsxs("div", Object.assign({ className: "symptom-header" }, { children: [_jsx(Text, Object.assign({ strong: true }, { children: symptom.name })), _jsxs(Text, { children: ["Date: ", symptom.date] })] })), _jsx(Text, { children: symptom.actions })] }), symptom.id))) })), _jsx(Modal, Object.assign({ title: "Add New Symptom", open: isModalOpen, onCancel: handleCancel, footer: null }, { children: _jsxs(Form, Object.assign({ form: form, layout: "vertical", onFinish: handleAddSymptom }, { children: [_jsx(Form.Item, Object.assign({ label: "Symptom Name", name: "name", rules: [
                                                { required: true, message: 'Please enter the symptom name' },
                                            ] }, { children: _jsx(Input, { placeholder: "Enter symptom name" }) })), _jsx(Form.Item, Object.assign({ label: "Actions/Therapies", name: "actions", rules: [
                                                {
                                                    required: true,
                                                    message: 'Please enter actions or therapies',
                                                },
                                            ] }, { children: _jsx(Input, { placeholder: "Enter actions/therapies" }) })), _jsx(Form.Item, Object.assign({ label: "Date", name: "date", rules: [{ required: true, message: 'Please select a date' }] }, { children: _jsx(DatePicker, { style: { width: '100%' } }) })), _jsx(Form.Item, { children: _jsx(Button, Object.assign({ type: "primary", htmlType: "submit", style: { width: '100%' } }, { children: "Add Symptom" })) })] })) }))] }))] }))] })));
};
export default SymptomTracker;
//# sourceMappingURL=symptom_tracker.js.map