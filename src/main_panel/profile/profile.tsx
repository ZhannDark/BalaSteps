import React, { useState } from 'react';
import {
  Layout,
  Button,
  Input,
  Form,
  Modal,
  Upload,
  message,
  Spin,
} from 'antd';
import {
  EditOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './profile.scss';
import img from '../../images/fav.jpg';

const { Content, Header } = Layout;

interface ProfileData {
  full_name: string;
  email: string;
  profile_photo?: string;
  additional_info?: string;
  city?: string;
}

const ProfilePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();

  const fetchProfile = async (): Promise<ProfileData> => {
    const response = await axios.get('https://project-back-81mh.onrender.com/auth/profile/', {
      // headers: {
      //   Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
      // },
    });
    return response.data;
  };

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery<ProfileData, Error>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });

  const handleEditClick = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      full_name: profile?.full_name,
      additional_info: profile?.additional_info,
      city: profile?.city,
    });
  };

  const handleCancel = () => {
    setIsModalVisible(false);
    form.resetFields();
  };

  const handleSave = () => {
    form.validateFields().then((values) => {
      console.log('Saved values:', values);
      message.success('Profile updated successfully!');
      setIsModalVisible(false);
    });
  };

  if (isLoading) {
    return <Spin tip="Loading profile..." style={{ margin: 40 }} />;
  }

  if (isError || !profile) {
    return <p style={{ padding: 20, color: 'red' }}>Failed to load profile data.</p>;
  }

  return (
    <Layout className="profile-layout">
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
        selectedPage={null}
      />

      <Layout
        style={{
          marginLeft: collapsed ? 100 : 250,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <Header
          style={{
            padding: 0,
            marginLeft: '5px',
            background: '#E2E3E0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Main_header />
        </Header>

        <Content className="profile-page">
          <h1 className="profile-title">Profile</h1>
          <div className="profile-container">
            <div className="profile-picture-section">
              <div className="profile-picture">
                <img
                  src={profile.profile_photo || img}
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
                <h2 className="profile-name">{profile.full_name}</h2>
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
                <Form.Item label="Additional Info">
                  <Input.TextArea
                    className="profile-input"
                    placeholder="Empty additional information..."
                    value={profile.additional_info || ''}
                    disabled
                  />
                </Form.Item>
                <Form.Item label="City (optional)">
                  <Input
                    className="profile-input"
                    placeholder="Empty"
                    value={profile.city || ''}
                    disabled
                  />
                </Form.Item>
              </Form>
            </div>
          </div>

          <Modal
            title="Edit Profile"
            open={isModalVisible}
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
                name="full_name"
                rules={[
                  { required: true, message: 'Please enter your full name' },
                ]}
              >
                <Input placeholder="Enter full name" />
              </Form.Item>
              <Form.Item label="Profile Image" name="profile_photo">
                <Upload listType="picture" maxCount={1}>
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item label="Additional Info" name="additional_info">
                <Input.TextArea placeholder="Enter additional info..." />
              </Form.Item>
              <Form.Item label="City" name="city">
                <Input placeholder="Enter city" />
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
