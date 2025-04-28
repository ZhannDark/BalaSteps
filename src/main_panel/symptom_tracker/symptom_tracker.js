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
import { Calendar, Button, Typography, Modal, Form, Input, Select, Popconfirm, notification, Tooltip, Drawer, Divider, Layout, } from 'antd';
import { EditOutlined, PlusOutlined, DeleteOutlined, InfoCircleOutlined, UserOutlined, SettingOutlined, ClockCircleOutlined, } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import Foot from '../../main_page/main_content/footer/footer/footer';
import { SymptomLayout, SymptomHeaderBar, SymptomContent, SymptomHeader, CalendarCell, DisabledDate, ChildSymptom, SymptomAction, AddSymptomButton, AddSymptomDrawerButton, DrawerContainer, SymptomDrawerTitle, } from './symptom-tracker.styled';
const { Title } = Typography;
const { Option } = Select;
const accessToken = localStorage.getItem('accessToken');
const SymptomTracker = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [formModalOpen, setFormModalOpen] = useState(false);
    const [form] = Form.useForm();
    const [isEditMode, setIsEditMode] = useState(false);
    const [editingId, setEditingId] = useState(null);
    const [drawerVisible, setDrawerVisible] = useState(false);
    const [drawerSymptoms, setDrawerSymptoms] = useState([]);
    const queryClient = useQueryClient();
    const childColors = [
        '#1890ff',
        '#52c41a',
        '#faad14',
        '#eb2f96',
        '#722ed1',
        '#13c2c2',
    ];
    const childColorMap = new Map();
    const fetchSymptoms = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios.get('https://project-back-81mh.onrender.com/symptoms/entries/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    });
    const fetchChildren = () => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios.get('https://project-back-81mh.onrender.com/auth/children/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return res.data;
    });
    const { data: symptoms = [] } = useQuery({
        queryKey: ['symptoms'],
        queryFn: fetchSymptoms,
    });
    const { data: children = [] } = useQuery({
        queryKey: ['children'],
        queryFn: fetchChildren,
    });
    children.forEach((child, index) => {
        if (!childColorMap.has(child.id)) {
            childColorMap.set(child.id, childColors[index % childColors.length]);
        }
    });
    const addSymptom = useMutation({
        mutationFn: (payload) => axios.post('https://project-back-81mh.onrender.com/symptoms/entries/', payload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        }),
        onSuccess: () => {
            notification.success({ message: 'Symptom added successfully' });
            queryClient.invalidateQueries({ queryKey: ['symptoms'] });
        },
        onError: () => notification.error({ message: 'Failed to add symptom' }),
    });
    const updateSymptom = useMutation({
        mutationFn: ({ id, payload }) => axios.patch(`https://project-back-81mh.onrender.com/symptoms/entries/${id}/`, payload, {
            headers: { Authorization: `Bearer ${accessToken}` },
        }),
        onSuccess: () => {
            notification.success({ message: 'Symptom updated successfully' });
            queryClient.invalidateQueries({ queryKey: ['symptoms'] });
        },
        onError: () => notification.error({ message: 'Failed to update symptom' }),
    });
    const deleteSymptom = useMutation({
        mutationFn: (id) => axios.delete(`https://project-back-81mh.onrender.com/symptoms/entries/${id}/`, {
            headers: { Authorization: `Bearer ${accessToken}` },
        }),
        onSuccess: () => {
            notification.success({ message: 'Symptom deleted' });
            setDrawerVisible(false);
            queryClient.invalidateQueries({ queryKey: ['symptoms'] });
        },
        onError: () => notification.error({ message: 'Failed to delete symptom' }),
    });
    const openFormModal = (symptom, date) => {
        var _a;
        if (symptom) {
            setIsEditMode(true);
            setEditingId(symptom.id);
            setSelectedDate(dayjs(symptom.date));
            form.setFieldsValue({
                child: (_a = children.find((c) => c.full_name === symptom.child_name)) === null || _a === void 0 ? void 0 : _a.id,
                symptom_name: symptom.symptom_name,
                action_taken: symptom.action_taken,
            });
        }
        else {
            setIsEditMode(false);
            form.resetFields();
            if (date)
                setSelectedDate(date);
        }
        setFormModalOpen(true);
    };
    const openDrawer = (symptoms, date) => {
        setDrawerSymptoms(symptoms);
        setSelectedDate(date);
        setDrawerVisible(true);
    };
    const handleFormSubmit = (values) => {
        if (!selectedDate)
            return;
        const payload = {
            child: values.child,
            date: selectedDate.format('YYYY-MM-DD'),
            symptom_name: values.symptom_name,
            action_taken: values.action_taken || '',
        };
        if (isEditMode && editingId) {
            updateSymptom.mutate({ id: editingId, payload });
        }
        else {
            addSymptom.mutate(payload);
        }
        setFormModalOpen(false);
        setEditingId(null);
    };
    const dateCellRender = (date) => {
        const isFuture = date.isAfter(dayjs(), 'day');
        if (isFuture)
            return _jsx(DisabledDate, {});
        const currentDaySymptoms = symptoms.filter((s) => dayjs(s.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD'));
        const limitedSymptoms = currentDaySymptoms.slice(0, 2);
        const overflow = currentDaySymptoms.length - 2;
        return (_jsxs(CalendarCell, { onClick: () => openDrawer(currentDaySymptoms, date), children: [limitedSymptoms.map((s) => (_jsxs("div", { style: {
                        color: '#000',
                        fontSize: 12,
                        display: 'flex',
                        alignItems: 'center',
                        gap: 6,
                    }, children: [_jsx("span", { style: {
                                backgroundColor: childColorMap.get(s.child),
                                width: 8,
                                height: 8,
                                borderRadius: '50%',
                                display: 'inline-block',
                            } }), s.symptom_name] }, s.id))), overflow > 0 && _jsxs("div", { style: { fontSize: 12 }, children: ["+", overflow, " more"] })] }));
    };
    return (_jsxs(SymptomLayout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed) }), _jsxs(Layout, { style: {
                    marginLeft: collapsed ? 100 : 250,
                    transition: 'margin-left 0.2s ease',
                }, children: [_jsx(SymptomHeaderBar, { children: _jsx(Main_header, {}) }), _jsxs(SymptomContent, { children: [_jsxs(SymptomHeader, { children: [_jsx(Title, { level: 3, style: { color: '#591C00', marginBottom: 0 }, children: "Symptom Tracker" }), _jsx(Tooltip, { title: "Click a day to view or add symptoms", children: _jsx(InfoCircleOutlined, { style: { marginLeft: 10, color: '#999' } }) })] }), _jsx(Calendar, { cellRender: dateCellRender, disabledDate: (current) => current && current > dayjs().endOf('day') }), _jsx(Modal, { title: isEditMode
                                    ? 'Edit Symptom'
                                    : `Add Symptom - ${selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format('MMMM D, YYYY')}`, open: formModalOpen, onCancel: () => setFormModalOpen(false), footer: null, style: { top: 50 }, bodyStyle: { maxHeight: '70vh', overflowY: 'auto' }, children: _jsxs(Form, { layout: "vertical", form: form, onFinish: handleFormSubmit, children: [_jsx(Divider, { orientation: "left", children: "Main Info" }), _jsx(Form.Item, { name: "child", label: "Child", rules: [{ required: true }], extra: "Select the child this symptom is related to.", children: _jsx(Select, { placeholder: "Select a child", children: children.map((child) => (_jsx(Option, { value: child.id, children: child.full_name }, child.id))) }) }), _jsx(Form.Item, { name: "symptom_name", label: "Symptom", rules: [{ required: true }], children: _jsx(Input.TextArea, {}) }), _jsx(Divider, { orientation: "left", children: "Details" }), _jsx(Form.Item, { name: "action_taken", label: "Actions / Therapies", extra: "Describe any action or therapy taken.", children: _jsx(Input.TextArea, {}) }), _jsx(Form.Item, { children: _jsx(AddSymptomButton, { type: "primary", htmlType: "submit", children: isEditMode ? 'Save Changes' : 'Add Symptom' }) })] }) }), _jsx(Drawer, { title: `Symptoms - ${selectedDate === null || selectedDate === void 0 ? void 0 : selectedDate.format('MMMM D, YYYY')}`, placement: "right", onClose: () => setDrawerVisible(false), open: drawerVisible, width: 360, children: _jsxs(DrawerContainer, { children: [drawerSymptoms.map((symptom) => (_jsxs("div", { style: { marginBottom: 16 }, children: [_jsxs(SymptomDrawerTitle, { children: [_jsx(UserOutlined, {}), " ", symptom.symptom_name] }), _jsxs(ChildSymptom, { children: [_jsx(SettingOutlined, {}), " Child: ", symptom.child_name] }), _jsxs(ChildSymptom, { children: [_jsx(ClockCircleOutlined, {}), " Created:", ' ', dayjs(symptom.created_at).format('YYYY-MM-DD HH:mm')] }), _jsxs(ChildSymptom, { style: { fontSize: '12px', color: '#888' }, children: ["Updated:", ' ', dayjs(symptom.updated_at).format('YYYY-MM-DD HH:mm')] }), _jsxs(ChildSymptom, { children: ["\u2699\uFE0F Actions: ", symptom.action_taken || '—'] }), _jsxs(SymptomAction, { children: [_jsx(Button, { icon: _jsx(EditOutlined, {}), size: "small", onClick: () => {
                                                                openFormModal(symptom);
                                                                setDrawerVisible(false);
                                                            }, children: "Edit" }), _jsx(Popconfirm, { title: "Are you sure to delete this symptom?", onConfirm: () => deleteSymptom.mutate(symptom.id), okText: "Yes", cancelText: "No", children: _jsx(Button, { icon: _jsx(DeleteOutlined, {}), size: "small", danger: true, children: "Delete" }) })] })] }, symptom.id))), _jsx(AddSymptomDrawerButton, { icon: _jsx(PlusOutlined, {}), onClick: () => {
                                                setDrawerVisible(false);
                                                openFormModal(undefined, selectedDate || dayjs());
                                            }, children: "Add Symptom" })] }) })] }), _jsx(Foot, {})] })] }));
};
export default SymptomTracker;
