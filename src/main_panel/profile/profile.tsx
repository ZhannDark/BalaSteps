import React, { useState } from 'react';
import { Button, Input, Form, Modal, Upload, message } from 'antd';
import { EditOutlined, UploadOutlined } from '@ant-design/icons';
import './profile.scss';
import Panel_header from '../../main/header/panel_header';
import img from '../../images/fav.jpg';

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
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

  return (
    <div>
      <Panel_header />
      <div className="profile-page">
        <h1 className="profile-title">Profile</h1>
        <div className="profile-container">
          <div className="profile-left-section">
            <div className="profile-picture">
              <img
                src={img}
                alt="Profile"
                className="profile-image"
              />
            </div>
            <div className="profile-options">
              <p className="profile-option">Change phone number</p>
              <p className="profile-option">Change password</p>
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-header">
              <h2 className="profile-name">Palensheeva Palenshe</h2>
              <Button
                icon={<EditOutlined />}
                type="text"
                className="edit-button"
                onClick={handleEditClick}
              >
                Edit
              </Button>
            </div>
            <Form layout="vertical" className="profile-form">
              <Form.Item label="Age of child (optional)">
                <Input className="profile-input" placeholder="Enter age" disabled />
              </Form.Item>
              <Form.Item label="Diagnose (optional)">
                <Input className="profile-input" placeholder="Enter diagnose" disabled />
              </Form.Item>
              <Form.Item label="City (optional)">
                <Input className="profile-input" placeholder="Enter city" disabled />
              </Form.Item>
            </Form>
          </div>
        </div>

        <Modal
          title="Edit Profile"
          visible={isModalVisible}
          onCancel={handleCancel}
          footer={[
            <Button key="cancel" onClick={handleCancel}>
              Cancel
            </Button>,
            <Button key="save" type="primary" onClick={handleSave}>
              Save
            </Button>,
          ]}
        >
          <Form layout="vertical" form={form}>
            <Form.Item
              label="Full Name"
              name="fullName"
              rules={[{ required: true, message: 'Please enter your full name' }]}
            >
              <Input placeholder="Enter full name" />
            </Form.Item>
            <Form.Item label="Profile Image" name="profileImage">
              <Upload listType="picture" maxCount={1}>
                <Button icon={<UploadOutlined />}>Upload</Button>
              </Upload>
            </Form.Item>
            <Form.Item
              label="Age of child (optional)"
              name="age"
              rules={[
                { pattern: /^[0-9]*$/, message: 'Please enter a valid age' },
              ]}
            >
              <Input placeholder="Enter age" />
            </Form.Item>
            <Form.Item label="Diagnose (optional)" name="diagnose">
              <Input placeholder="Enter diagnose" />
            </Form.Item>
            <Form.Item label="City (optional)" name="city">
              <Input placeholder="Enter city" />
            </Form.Item>
          </Form>
        </Modal>
      </div>
    </div>
  );
};

export default ProfilePage;
