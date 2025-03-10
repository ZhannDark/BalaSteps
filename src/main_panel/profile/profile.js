import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Button, Input, Form, Modal, message, Upload, DatePicker, Radio, Card, } from 'antd';
import { EditOutlined, UploadOutlined, UserAddOutlined, } from '@ant-design/icons';
import moment from 'moment';
import './profile.scss';
import img from '../../images/fav.jpg';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';
const ProfilePage = () => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isEditChildModalVisible, setIsEditChildModalVisible] = useState(false);
    const [isAddChildModalVisible, setIsAddChildModalVisible] = useState(false);
    const [children, setChildren] = useState([]);
    const [form] = Form.useForm();
    const [addChildForm] = Form.useForm();
    const [editChildForm] = Form.useForm();
    const [currentChildIndex, setCurrentChildIndex] = useState(null);
    const handleEditClick = () => {
        setIsModalVisible(true);
    };
    const handleAddChildClick = () => {
        setIsAddChildModalVisible(true);
    };
    const handleEditChildClick = (index) => {
        const child = children[index];
        editChildForm.setFieldsValue({
            fullName: child.fullName,
            birthday: moment(child.birthday, 'YYYY-MM-DD'),
            diagnose: child.diagnose,
            gender: child.gender,
        });
        setCurrentChildIndex(index);
        setIsEditChildModalVisible(true);
    };
    const handleEditChildCancel = () => {
        setIsEditChildModalVisible(false);
        editChildForm.resetFields();
        setCurrentChildIndex(null);
    };
    const handleCancel = () => {
        setIsModalVisible(false);
        form.resetFields();
    };
    const handleAddChildCancel = () => {
        setIsAddChildModalVisible(false);
        addChildForm.resetFields();
    };
    const handleSave = () => {
        form
            .validateFields()
            .then((values) => {
            console.log('Saved values:', values);
            message.success('Profile updated successfully!');
            setIsModalVisible(false);
        })
            .catch((info) => {
            console.log('Validation Failed:', info);
        });
    };
    const handleAddChildSave = () => {
        addChildForm.validateFields().then((values) => {
            const newChild = {
                fullName: values.fullName,
                birthday: values.birthday.format('YYYY-MM-DD'),
                diagnose: values.diagnose || 'N/A',
                gender: values.gender,
            };
            setChildren([...children, newChild]);
            message.success('Child added successfully!');
            setIsAddChildModalVisible(false);
            addChildForm.resetFields();
        });
    };
    const handleEditChildSave = () => {
        editChildForm.validateFields().then((values) => {
            if (currentChildIndex !== null) {
                const updatedChildren = [...children];
                updatedChildren[currentChildIndex] = Object.assign(Object.assign({}, updatedChildren[currentChildIndex]), { fullName: values.fullName, birthday: values.birthday.format('YYYY-MM-DD'), diagnose: values.diagnose, gender: values.gender });
                setChildren(updatedChildren);
                message.success('Child info updated successfully!');
                setIsEditChildModalVisible(false);
                editChildForm.resetFields();
            }
        });
    };
    return (_jsxs("div", Object.assign({ className: "page-container" }, { children: [_jsxs("div", Object.assign({ className: "content-wrap" }, { children: [_jsx("h1", Object.assign({ className: "profile-title" }, { children: "Profile" })), _jsxs("div", Object.assign({ className: "profile-left-section" }, { children: [_jsx("div", Object.assign({ className: "profile-picture" }, { children: _jsx("img", { src: img, alt: "Profile", className: "profile-image" }) })), _jsxs("div", { children: [_jsx("h2", Object.assign({ className: "profile-name" }, { children: "Palensheeva Palenshe" })), _jsx(Link, Object.assign({ to: '/change number', className: "button-change-number" }, { children: "Change phone number" })), _jsx(Link, Object.assign({ to: '/change pass', className: "button-change-password" }, { children: "Change password" })), _jsxs("div", Object.assign({ className: "parent-buttons" }, { children: [_jsx(Button, Object.assign({ className: "button-add-child", icon: _jsx(UserAddOutlined, {}), type: "default", onClick: handleAddChildClick }, { children: "+Add child" })), _jsx(Button, Object.assign({ className: "button-edit", icon: _jsx(EditOutlined, {}), type: "default", onClick: handleEditClick, style: { marginBottom: '20px' } }, { children: "Edit" }))] }))] }), _jsxs("div", Object.assign({ className: "info-city-container" }, { children: [_jsxs("div", Object.assign({ className: "add-info" }, { children: [_jsx("label", Object.assign({ className: "label-info-city" }, { children: "Additional Info:" })), _jsx(TextArea, { placeholder: "Enter additional information..............." })] })), _jsxs("div", Object.assign({ className: "add-info" }, { children: [_jsx("label", Object.assign({ className: "label-info-city" }, { children: "City:" })), _jsx(Input, { placeholder: "Enter your city" })] }))] }))] })), children.map((child, index) => (_jsxs(Card, Object.assign({ title: child.fullName, extra: _jsx(Button, { type: "text", icon: _jsx(EditOutlined, {}), onClick: () => handleEditChildClick(index) }), bordered: true, className: "child-card" }, { children: [_jsxs("p", { children: [_jsx("strong", { children: "Birthday:" }), " ", child.birthday] }), _jsxs("p", { children: [_jsx("strong", { children: "Diagnose:" }), " ", child.diagnose] }), _jsxs("p", { children: [_jsx("strong", { children: "Gender:" }), " ", child.gender] })] }), index)))] })), _jsx(Modal, Object.assign({ title: "Edit Parent Info", visible: isModalVisible, onCancel: handleCancel, footer: [
                    _jsx(Button, Object.assign({ onClick: handleCancel }, { children: "Cancel" }), "cancel"),
                    _jsx(Button, Object.assign({ type: "primary", onClick: handleSave, style: { backgroundColor: '#556B2F' } }, { children: "Save" }), "save"),
                ] }, { children: _jsxs(Form, Object.assign({ layout: "vertical", form: form }, { children: [_jsx(Form.Item, Object.assign({ label: "Full Name:", name: "fullName" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "Phone number:", name: "phoneNumber" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "City:", name: "city" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "Additional Info:", name: "additionalInfo" }, { children: _jsx(Input.TextArea, { rows: 4 }) })), _jsx(Form.Item, Object.assign({ label: "Change photo:", name: "profileImage" }, { children: _jsx(Upload, Object.assign({ listType: "text" }, { children: _jsx(Button, Object.assign({ icon: _jsx(UploadOutlined, {}) }, { children: "Upload" })) })) }))] })) })), _jsx(Modal, Object.assign({ title: "Add Child", visible: isAddChildModalVisible, onCancel: handleAddChildCancel, footer: [
                    _jsx(Button, Object.assign({ type: "primary", onClick: handleAddChildSave, style: { backgroundColor: '#556B2F' } }, { children: "+Add" }), "save"),
                    _jsx(Button, Object.assign({ onClick: handleAddChildCancel }, { children: "Cancel" }), "cancel"),
                ] }, { children: _jsxs(Form, Object.assign({ layout: "vertical", form: addChildForm }, { children: [_jsx(Form.Item, Object.assign({ label: "Full Name:", name: "fullName" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "Birthday:", name: "birthday" }, { children: _jsx(DatePicker, { style: { width: '100%' } }) })), _jsx(Form.Item, Object.assign({ label: "Diagnose:", name: "diagnose" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "Gender:", name: "gender" }, { children: _jsxs(Radio.Group, { children: [_jsx(Radio, Object.assign({ value: "male" }, { children: "Male" })), _jsx(Radio, Object.assign({ value: "female" }, { children: "Female" }))] }) }))] })) })), _jsx(Modal, Object.assign({ title: "Edit Child Info", visible: isEditChildModalVisible, onCancel: handleEditChildCancel, footer: [
                    _jsx(Button, Object.assign({ onClick: handleEditChildCancel }, { children: "Cancel" }), "cancel"),
                    _jsx(Button, Object.assign({ type: "primary", onClick: handleEditChildSave, style: { backgroundColor: '#556B2F' } }, { children: "Save" }), "save"),
                ] }, { children: _jsxs(Form, Object.assign({ layout: "vertical", form: editChildForm }, { children: [_jsx(Form.Item, Object.assign({ label: "Full Name:", name: "fullName" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "Birthday:", name: "birthday" }, { children: _jsx(DatePicker, { style: { width: '100%' } }) })), _jsx(Form.Item, Object.assign({ label: "Diagnose:", name: "diagnose" }, { children: _jsx(Input, {}) })), _jsx(Form.Item, Object.assign({ label: "Gender:", name: "gender" }, { children: _jsxs(Radio.Group, { children: [_jsx(Radio, Object.assign({ value: "male" }, { children: "Male" })), _jsx(Radio, Object.assign({ value: "female" }, { children: "Female" }))] }) }))] })) }))] })));
};
export default ProfilePage;
//# sourceMappingURL=profile.js.map