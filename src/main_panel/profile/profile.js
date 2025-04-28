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
import { Layout, Button, Input, Form, Modal, Upload, message, DatePicker, Steps, notification, Radio, Skeleton, Descriptions, Dropdown, Menu, } from 'antd';
import { EditOutlined, UploadOutlined, PlusOutlined, CheckOutlined, MailOutlined, MoreOutlined, } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import { useNavigate } from 'react-router-dom';
import { ProfileLayout, ProfileContent, ProfileTitle, ProfileContainer, ProfileLeft, ProfileRight, DescriptionBlock, ChildrenSection, ChildCard, AddChildButton, ProfileDropdownTrigger, ParentInfoBlock, HeaderSection, ChildrenHeader, ProfileImage, } from './profile.styled';
const { Header } = Layout;
const { Step } = Steps;
const ProfilePage = () => {
    const [collapsed, setCollapsed] = useState(false);
    const [emailStepModalVisible, setEmailStepModalVisible] = useState(false);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [addChildModalVisible, setAddChildModalVisible] = useState(false);
    const [editChildModalVisible, setEditChildModalVisible] = useState(false);
    const [editingChildId, setEditingChildId] = useState(null);
    const [form] = Form.useForm();
    const [childForm] = Form.useForm();
    const [editChildForm] = Form.useForm();
    const [emailForm] = Form.useForm();
    const [otpForm] = Form.useForm();
    const [step, setStep] = useState(0);
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
        const minutes = Math.floor(seconds / 60)
            .toString()
            .padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        return `${minutes}:${secs}`;
    };
    const fetchProfile = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get('https://project-back-81mh.onrender.com/auth/profile/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    });
    const fetchChildren = () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield axios.get('https://project-back-81mh.onrender.com/auth/children/', {
            headers: { Authorization: `Bearer ${accessToken}` },
        });
        return response.data;
    });
    const { data: profile, isLoading } = useQuery({
        queryKey: ['profile'],
        queryFn: fetchProfile,
    });
    const { data: children } = useQuery({
        queryKey: ['children'],
        queryFn: fetchChildren,
    });
    const handleEditClick = () => {
        setEditModalVisible(true);
        form.setFieldsValue({
            full_name: profile === null || profile === void 0 ? void 0 : profile.full_name,
            city: profile === null || profile === void 0 ? void 0 : profile.city,
            additional_info: profile === null || profile === void 0 ? void 0 : profile.additional_info,
        });
    };
    const handleSendOtp = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const formData = new FormData();
            formData.append('email', values.newEmail);
            yield axios.patch('https://project-back-81mh.onrender.com/auth/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            setNewEmail(values.newEmail);
            notification.success({ message: 'OTP sent to your new email' });
            setStep(1);
            setTimer(600);
        }
        catch (_a) {
            notification.error({ message: 'Failed to send OTP' });
        }
    });
    const handleVerifyOtp = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield axios.post('https://project-back-81mh.onrender.com/auth/verify-new-email/', {
                new_email: newEmail,
                otp: values.otp,
            }, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            notification.success({ message: 'Email successfully updated' });
            setEmailStepModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
        catch (_a) {
            notification.error({ message: 'Invalid OTP code' });
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
            message.success('Child added');
            setAddChildModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['children'] });
        }
        catch (_a) {
            message.error('Failed to add child');
        }
    });
    const handleSaveEdit = (values) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const formData = new FormData();
            formData.append('full_name', values.full_name);
            formData.append('city', values.city || '');
            formData.append('additional_info', values.additional_info || '');
            if (values.profile_photo && values.profile_photo.length > 0) {
                formData.append('profile_photo', values.profile_photo[0].originFileObj);
            }
            yield axios.patch('https://project-back-81mh.onrender.com/auth/profile/', formData, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'multipart/form-data',
                },
            });
            message.success('Profile updated');
            setEditModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['profile'] });
        }
        catch (_a) {
            message.error('Failed to update profile');
        }
    });
    const handleEditChildClick = (childId) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            const res = yield axios.get(`https://project-back-81mh.onrender.com/auth/edit-child/${childId}/`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            });
            const child = res.data;
            editChildForm.setFieldsValue({
                full_name: child.full_name,
                birthday: dayjs(child.birthday),
                gender: child.gender,
                diagnose: ((_a = child.diagnoses[0]) === null || _a === void 0 ? void 0 : _a.name) || '',
            });
            setEditingChildId(childId);
            setEditChildModalVisible(true);
        }
        catch (_b) {
            message.error('Failed to fetch child data');
        }
    });
    const handleSaveEditedChild = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const values = yield editChildForm.validateFields();
            const payload = {
                full_name: values.full_name,
                birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
                gender: values.gender,
                diagnoses: [{ name: values.diagnose }],
            };
            yield axios.patch(`https://project-back-81mh.onrender.com/auth/edit-child/${editingChildId}/`, payload, {
                headers: {
                    Authorization: `Bearer ${accessToken}`,
                    'Content-Type': 'application/json',
                },
            });
            message.success('Child updated successfully');
            setEditChildModalVisible(false);
            queryClient.invalidateQueries({ queryKey: ['children'] });
        }
        catch (_a) {
            message.error('Failed to update child');
        }
    });
    const menu = (_jsxs(Menu, { children: [_jsx(Menu.Item, { icon: _jsx(EditOutlined, {}), onClick: handleEditClick, children: "Edit Profile" }, "edit"), _jsx(Menu.Item, { icon: _jsx(MailOutlined, {}), onClick: () => setEmailStepModalVisible(true), children: "Change Email" }, "email"), _jsx(Menu.Item, { onClick: () => navigate('/forgot-password'), children: "Change Password" }, "password")] }));
    return (_jsxs(ProfileLayout, { children: [_jsx(MenuPanel, { collapsed: collapsed, toggleCollapsed: () => setCollapsed(!collapsed) }), _jsxs(Layout, { style: { marginLeft: collapsed ? 100 : 250 }, children: [_jsx(Header, { style: {
                            padding: 0,
                            marginLeft: 5,
                            background: '#E2E3E0',
                            height: 48,
                        }, children: _jsx(Main_header, {}) }), _jsxs(ProfileContent, { children: [_jsx(ProfileTitle, { children: "Profile" }), isLoading || !profile ? (_jsx(Skeleton, { active: true, paragraph: { rows: 6 } })) : (_jsxs(ProfileContainer, { children: [_jsxs(ProfileLeft, { children: [_jsx(ProfileImage, { src: `${profile.profile_photo}?${Date.now()}`, alt: "Profile Image" }, profile.profile_photo), _jsxs(ParentInfoBlock, { children: [_jsxs(HeaderSection, { children: [_jsx("h1", { children: profile.full_name }), _jsx(ProfileDropdownTrigger, { children: _jsx(Dropdown, { overlay: menu, trigger: ['click'], placement: "top", children: _jsx(Button, { size: 'middle', icon: _jsx(MoreOutlined, {}) }) }) })] }), _jsxs(DescriptionBlock, { bordered: false, column: 1, size: "small", children: [_jsx(Descriptions.Item, { label: "Email", children: profile.email }), _jsx(Descriptions.Item, { label: "Additional Info", children: profile.additional_info || 'Empty' }), _jsx(Descriptions.Item, { label: "City", children: profile.city || 'Empty' })] })] })] }), _jsx(ProfileRight, { children: _jsxs(ChildrenSection, { children: [_jsxs(ChildrenHeader, { children: [_jsx("h3", { children: "Your Children" }), _jsx(AddChildButton, { icon: _jsx(PlusOutlined, {}), onClick: () => setAddChildModalVisible(true), type: "primary", children: "Add Child" })] }), children === null || children === void 0 ? void 0 : children.map((child) => (_jsxs(ChildCard, { children: [_jsx("h3", { children: child.full_name }), _jsxs("p", { children: [_jsx("strong", { children: "Birthday:" }), " ", child.birthday] }), _jsxs("p", { children: [_jsx("strong", { children: "Diagnose:" }), ' ', child.diagnoses.map((d) => d.name).join(', ')] }), _jsxs("p", { children: [_jsx("strong", { children: "Gender:" }), " ", child.gender] }), _jsx(Button, { type: "link", icon: _jsx(EditOutlined, {}), onClick: () => handleEditChildClick(child.id), children: "Edit" })] }, child.id)))] }) })] })), _jsxs(Modal, { title: "Change Email", open: emailStepModalVisible, onCancel: () => {
                                    setStep(0);
                                    setEmailStepModalVisible(false);
                                }, footer: null, children: [_jsxs(Steps, { current: step, style: { marginBottom: 24 }, children: [_jsx(Step, { title: "Enter Email", icon: _jsx(MailOutlined, {}) }), _jsx(Step, { title: "Verify OTP", icon: _jsx(CheckOutlined, {}) })] }), step === 0 ? (_jsxs(Form, { form: emailForm, onFinish: handleSendOtp, layout: "vertical", children: [_jsx(Form.Item, { name: "newEmail", label: "New Email", rules: [{ required: true, type: 'email' }], children: _jsx(Input, { placeholder: "example@mail.com" }) }), _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "Send OTP" })] })) : (_jsxs(Form, { form: otpForm, onFinish: handleVerifyOtp, layout: "vertical", children: [_jsx(Form.Item, { name: "otp", label: "OTP", rules: [{ required: true, message: 'Please enter the OTP' }], children: _jsx(Input, { placeholder: "Enter the OTP" }) }), _jsx(Button, { type: "primary", htmlType: "submit", disabled: timer !== 0, block: true, children: "Verify" }), _jsx("p", { style: { marginTop: 12 }, children: timer > 0
                                                    ? `Resend available in ${formatTimer(timer)}`
                                                    : 'You can resend now.' })] }))] }), _jsx(Modal, { title: "Edit Profile", open: editModalVisible, onCancel: () => setEditModalVisible(false), footer: null, children: _jsxs(Form, { layout: "vertical", form: form, onFinish: handleSaveEdit, children: [_jsx(Form.Item, { name: "full_name", label: "Full Name", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "profile_photo", label: "Profile Image", valuePropName: "fileList", getValueFromEvent: (e) => (Array.isArray(e) ? e : e === null || e === void 0 ? void 0 : e.fileList), children: _jsx(Upload, { listType: "picture", maxCount: 1, beforeUpload: () => false, children: _jsx(Button, { icon: _jsx(UploadOutlined, {}), children: "Upload" }) }) }), _jsx(Form.Item, { name: "additional_info", label: "Additional Info", children: _jsx(Input.TextArea, {}) }), _jsx(Form.Item, { name: "city", label: "City", children: _jsx(Input, {}) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, onClick: form.submit, children: "Save" }) })] }) }), _jsx(Modal, { title: "Add Child", open: addChildModalVisible, onCancel: () => setAddChildModalVisible(false), footer: null, children: _jsxs(Form, { layout: "vertical", form: childForm, onFinish: handleAddChild, children: [_jsx(Form.Item, { name: "full_name", label: "Full Name", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "birthday", label: "Birthday", rules: [{ required: true }], children: _jsx(DatePicker, { style: { width: '100%' } }) }), _jsx(Form.Item, { name: "gender", label: "Gender", rules: [{ required: true }], children: _jsxs(Radio.Group, { children: [_jsx(Radio, { value: "Male", children: "Male" }), _jsx(Radio, { value: "Female", children: "Female" })] }) }), _jsx(Form.Item, { name: "diagnose", label: "Diagnose", rules: [{ required: true }], children: _jsx(Input, { placeholder: "e.g., Autism" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "Add" }) })] }) }), _jsx(Modal, { title: "Edit Child", open: editChildModalVisible, onCancel: () => setEditChildModalVisible(false), footer: null, children: _jsxs(Form, { layout: "vertical", form: editChildForm, onFinish: handleSaveEditedChild, children: [_jsx(Form.Item, { name: "full_name", label: "Full Name", rules: [{ required: true }], children: _jsx(Input, {}) }), _jsx(Form.Item, { name: "birthday", label: "Birthday", rules: [{ required: true }], children: _jsx(DatePicker, { style: { width: '100%' } }) }), _jsx(Form.Item, { name: "gender", label: "Gender", rules: [{ required: true }], children: _jsxs(Radio.Group, { children: [_jsx(Radio, { value: "Male", children: "Male" }), _jsx(Radio, { value: "Female", children: "Female" })] }) }), _jsx(Form.Item, { name: "diagnose", label: "Diagnose", rules: [{ required: true }], children: _jsx(Input, { placeholder: "e.g., Autism" }) }), _jsx(Form.Item, { children: _jsx(Button, { type: "primary", htmlType: "submit", block: true, children: "Save" }) })] }) })] })] })] }));
};
export default ProfilePage;
