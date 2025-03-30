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
import React, { useEffect, useState } from 'react';
import { Layout, Button, Input, Form, Modal, Upload, message, DatePicker, Radio, Divider, } from 'antd';
import { EditOutlined, UploadOutlined, PlusOutlined, } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './profile.scss';
import img from '../../images/fav.jpg';
import { useNavigate } from 'react-router-dom';
const { Content, Header } = Layout;
const ProfilePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isAddChildModalVisible, setAddChildModalVisible] = useState(false);
    const [isEditChildModalVisible, setEditChildModalVisible] = useState(false);
    const [editChildId, setEditChildId] = useState(null);
    const [isOtpModalVisible, setIsOtpModalVisible] = useState(false);
    const [editChildForm] = Form.useForm();
    const [form] = Form.useForm();
    const [childForm] = Form.useForm();
    const [otpForm] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [newEmail, setNewEmail] = useState('');
    const [timer, setTimer] = useState(600);
    const queryClient = useQueryClient();
    const navigate = useNavigate();
    const accessToken = localStorage.getItem('accessToken');
    useEffect(() => {
        if (timer > 0) {
            const interval = setInterval(() => setTimer((t) => t - 1), 1000);
            return () => clearInterval(interval);
        }
    }, [timer]);
    const formatTimer = (seconds) => {
        const minutes = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };
    const fetchProfile = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get('https://project-back-81mh.onrender.com/auth/profile/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    });
    const fetchChildById = (id) => __awaiter(void 0, void 0, void 0, function* () {
        const res = yield axios.get(`https://project-back-81mh.onrender.com/auth/edit-child/${id}/`, {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return res.data;
    });
    const handleVerifyOtp = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            setLoading(true);
            yield axios.post('https://project-back-81mh.onrender.com/auth/verify-new-email/', {
                new_email: newEmail,
                otp: values.otp,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Email updated successfully!');
            setIsOtpModalVisible(false);
            setIsModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
        catch (err) {
            console.error(err);
            message.error('OTP verification failed');
        }
        finally {
            setLoading(false);
        }
    });
    const handleEditChildClick = (id) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        try {
            console.log('Fetching child by ID:', id);
            console.log('Access token:', localStorage.getItem('accessToken'));
            const childData = yield fetchChildById(id);
            editChildForm.setFieldsValue({
                full_name: childData.full_name,
                gender: childData.gender,
                birthday: dayjs(childData.birthday),
                diagnose: ((_a = childData.diagnoses[0]) === null || _a === void 0 ? void 0 : _a.name) || '',
            });
            setEditChildId(id);
            setEditChildModalVisible(true);
        }
        catch (err) {
            console.error('Error while fetching child:', ((_b = err === null || err === void 0 ? void 0 : err.response) === null || _b === void 0 ? void 0 : _b.data) || err.message);
            message.error('Failed to fetch child data');
        }
    });
    const handleSaveEditedChild = () => __awaiter(void 0, void 0, void 0, function* () {
        var _c;
        try {
            const values = yield editChildForm.validateFields();
            const updatedChild = {
                full_name: values.full_name,
                gender: values.gender,
                birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
                diagnoses: [{ name: values.diagnose }],
            };
            console.log('➡️ Updating child with:', updatedChild);
            console.log('Diagnose: ', values.diagnose);
            yield axios.patch(`https://project-back-81mh.onrender.com/auth/edit-child/${editChildId}/`, updatedChild, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Child updated!');
            setEditChildModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['children'] });
        }
        catch (err) {
            console.error('❌ Failed to update child:', ((_c = err === null || err === void 0 ? void 0 : err.response) === null || _c === void 0 ? void 0 : _c.data) || err.message);
            message.error('Failed to update child');
        }
    });
    const fetchChildren = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get('https://project-back-81mh.onrender.com/auth/children/', {
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });
        return response.data;
    });
    const { data: profile, isError: profileError } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
    });
    const { data: children, isError: childrenError, refetch: refetchChildren, } = useQuery({
        queryKey: ['children'],
        queryFn: fetchChildren,
    });
    const handleEditClick = () => {
        setIsModalVisible(true);
        form.setFieldsValue({
            full_name: profile === null || profile === void 0 ? void 0 : profile.full_name,
            email: profile === null || profile === void 0 ? void 0 : profile.email,
            additional_info: profile === null || profile === void 0 ? void 0 : profile.additional_info,
            city: profile === null || profile === void 0 ? void 0 : profile.city,
        });
    };
    const handleSave = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const values = yield form.validateFields();
            const formData = new FormData();
            formData.append('full_name', values.full_name);
            formData.append('email', values.email);
            formData.append('additional_info', values.additional_info || '');
            formData.append('city', values.city || '');
            if (values.profile_photo && values.profile_photo.length > 0) {
                formData.append('profile_photo', values.profile_photo[0].originFileObj);
            }
            yield axios.patch('https://project-back-81mh.onrender.com/auth/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (values.email !== (profile === null || profile === void 0 ? void 0 : profile.email)) {
                setNewEmail(values.email);
                setIsOtpModalVisible(true);
                setTimer(600);
            }
            else {
                message.success('Profile updated!');
                setIsModalVisible(false);
                queryClient.invalidateQueries({ queryKey: ['profile'] });
            }
        }
        catch (error) {
            console.error(error);
            message.error('Failed to update profile');
        }
    });
    const handleAddChild = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const values = yield childForm.validateFields();
            const payload = {
                full_name: values.full_name,
                birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
                gender: values.gender,
                diagnoses: [{ name: values.diagnose }],
            };
            yield axios.post('https://project-back-81mh.onrender.com/auth/add-child/', payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Child added!');
            childForm.resetFields();
            setAddChildModalVisible(false);
            refetchChildren();
        }
        catch (error) {
            console.error(error);
            message.error('Failed to add child.');
        }
    });
    if (profileError || !profile) {
        return _jsx("p", Object.assign({ style: { padding: 20, color: 'red' } }, { children: "Failed to load profile." }));
    }
    return (_jsxs(Layout, Object.assign({ className: "profile-layout" }, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed), selectedPage: null }), _jsxs(Layout, Object.assign({ style: { marginLeft: collapsed ? 100 : 250 } }, { children: [_jsx(Header, Object.assign({ className: "main-header" }, { children: _jsx(Main_header, {}) })), _jsxs(Content, Object.assign({ className: "profile-page" }, { children: [_jsx("h1", Object.assign({ className: "profile-title" }, { children: "Profile" })), _jsxs("div", Object.assign({ className: "profile-container" }, { children: [_jsxs("div", Object.assign({ className: "profile-picture-section" }, { children: [_jsx("img", { src: `${profile.profile_photo || img}?${Date.now()}`, alt: "Profile", className: "profile-image" }, profile.profile_photo), _jsx("div", Object.assign({ className: "profile-options" }, { children: _jsx("a", Object.assign({ onClick: () => navigate('/forgot-password') }, { children: "Change password" })) }))] })), _jsxs("div", Object.assign({ className: "profile-details" }, { children: [_jsxs("div", Object.assign({ className: "profile-header" }, { children: [_jsx("h1", { children: profile.full_name }), _jsx(Button, Object.assign({ icon: _jsx(EditOutlined, {}), onClick: handleEditClick }, { children: "Edit" })), _jsx(Button, Object.assign({ icon: _jsx(PlusOutlined, {}), onClick: () => setAddChildModalVisible(true) }, { children: "+ Add child" }))] })), _jsxs(Form, Object.assign({ layout: "vertical", className: "profile-form" }, { children: [_jsx(Form.Item, Object.assign({ label: "Additional Info" }, { children: _jsx(Input.TextArea, { value: profile.additional_info || '', disabled: true }) })), _jsx(Form.Item, Object.assign({ label: "City" }, { children: _jsx(Input, { value: profile.city || '', disabled: true }) }))] }))] }))] })), children && (_jsxs("div", Object.assign({ className: "children-section" }, { children: [_jsx("h3", { children: "Children" }), children.map((child) => (_jsx(React.Fragment, { children: _jsxs("div", Object.assign({ className: "child-card" }, { children: [_jsx("h3", { children: child.full_name }), _jsx(Divider, { style: { marginTop: '-10px', marginBottom: '10px' } }), _jsxs("p", { children: [_jsx("strong", { children: "Birthday:" }), " ", child.birthday] }), _jsxs("p", { children: [_jsx("strong", { children: "Diagnose:" }), " ", child.diagnoses.map(d => d.name).join(', ')] }), _jsxs("p", { children: [_jsx("strong", { children: "Gender:" }), " ", child.gender] }), _jsx(Button, Object.assign({ type: "link", icon: _jsx(EditOutlined, {}), onClick: () => handleEditChildClick(child.id) }, { children: "Edit" }))] }), child.id) }, child.id)))] }))), _jsx(Modal, Object.assign({ title: "Edit Profile", open: isModalVisible, onCancel: () => setIsModalVisible(false), footer: [
                                    _jsx(Button, Object.assign({ onClick: () => setIsModalVisible(false) }, { children: "Cancel" }), "cancel"),
                                    _jsx(Button, Object.assign({ type: "primary", onClick: handleSave }, { children: "Save" }), "save"),
                                ] }, { children: _jsxs(Form, Object.assign({ layout: "vertical", form: form }, { children: [_jsx(Form.Item, Object.assign({ name: "full_name", label: "Full Name", rules: [{ required: true }] }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ name: "email", label: "Email", rules: [{ required: true }] }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ name: "profile_photo", label: "Profile Image", valuePropName: "fileList", getValueFromEvent: (e) => Array.isArray(e) ? e : e === null || e === void 0 ? void 0 : e.fileList }, { children: _jsx(Upload, Object.assign({ listType: "picture", maxCount: 1, beforeUpload: () => false }, { children: _jsx(Button, Object.assign({ icon: _jsx(UploadOutlined, {}) }, { children: "Upload" })) })) })), _jsx(Form.Item, Object.assign({ name: "additional_info", label: "Additional Info" }, { children: _jsx(Input.TextArea, {}) })), _jsx(Form.Item, Object.assign({ name: "city", label: "City" }, { children: _jsx(Input, {}) }))] })) })), _jsx(Modal, Object.assign({ title: "Add Child", open: isAddChildModalVisible, onCancel: () => setAddChildModalVisible(false), footer: [
                                    _jsx(Button, Object.assign({ onClick: () => setAddChildModalVisible(false) }, { children: "Cancel" }), "cancel"),
                                    _jsx(Button, Object.assign({ type: "primary", onClick: handleAddChild }, { children: "+ Add" }), "save"),
                                ] }, { children: _jsxs(Form, Object.assign({ layout: "vertical", form: childForm }, { children: [_jsx(Form.Item, Object.assign({ name: "full_name", label: "Full Name", rules: [{ required: true }] }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ name: "birthday", label: "Birthday", rules: [{ required: true }] }, { children: _jsx(DatePicker, { style: { width: '100%' } }) })), _jsx(Form.Item, Object.assign({ name: "gender", label: "Gender", rules: [{ required: true }] }, { children: _jsxs(Radio.Group, { children: [_jsx(Radio, Object.assign({ value: "Male" }, { children: "Male" })), _jsx(Radio, Object.assign({ value: "Female" }, { children: "Female" }))] }) })), _jsx(Form.Item, Object.assign({ name: "diagnose", label: "Diagnose", rules: [{ required: true }] }, { children: _jsx(Input, { placeholder: "e.g., Autism" }) }))] })) })), _jsx(Modal, Object.assign({ title: "Edit Child", open: isEditChildModalVisible, onCancel: () => setEditChildModalVisible(false), footer: [
                                    _jsx(Button, Object.assign({ onClick: () => setEditChildModalVisible(false) }, { children: "Cancel" }), "cancel"),
                                    _jsx(Button, Object.assign({ type: "primary", onClick: handleSaveEditedChild }, { children: "Save" }), "save"),
                                ] }, { children: _jsxs(Form, Object.assign({ layout: "vertical", form: editChildForm }, { children: [_jsx(Form.Item, Object.assign({ label: "Full Name", name: "full_name", rules: [{ required: true }] }, { children: _jsx(Input, { placeholder: "Enter name" }) })), _jsx(Form.Item, Object.assign({ label: "Birthday", name: "birthday", rules: [{ required: true }] }, { children: _jsx(DatePicker, { style: { width: '100%' } }) })), _jsx(Form.Item, Object.assign({ label: "Diagnose", name: "diagnose", rules: [{ required: true }] }, { children: _jsx(Input, { placeholder: "Diagnose" }) })), _jsx(Form.Item, Object.assign({ label: "Gender", name: "gender", rules: [{ required: true }] }, { children: _jsxs(Radio.Group, { children: [_jsx(Radio, Object.assign({ value: "Male" }, { children: "Male" })), _jsx(Radio, Object.assign({ value: "Female" }, { children: "Female" }))] }) }))] })) })), _jsx(Modal, Object.assign({ title: "Verify your new email", open: isOtpModalVisible, onCancel: () => setIsOtpModalVisible(false), footer: null }, { children: _jsxs(Form, Object.assign({ form: otpForm, onFinish: handleVerifyOtp }, { children: [_jsx(Form.Item, Object.assign({ name: "otp", rules: [{ required: true, message: 'Enter the OTP sent to your new email' }] }, { children: _jsx(Input, { placeholder: "Enter OTP" }) })), _jsx(Button, Object.assign({ type: "primary", htmlType: "submit", loading: loading }, { children: "Verify" })), _jsx("p", Object.assign({ style: { marginTop: 16 } }, { children: timer > 0 && ` in ${formatTimer(timer)}` }))] })) }))] }))] }))] })));
};
export default ProfilePage;
//# sourceMappingURL=profile.js.map