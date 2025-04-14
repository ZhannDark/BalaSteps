import React, { useEffect, useState } from 'react';
import {
  Layout,
  Button,
  Input,
  Form,
  Modal,
  Upload,
  message,
  DatePicker,
  Radio,
  Divider,
} from 'antd';
import { EditOutlined, UploadOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './profile.scss';
import img from '../../images/fav.jpg';
import { useNavigate } from 'react-router-dom';
import { Skeleton } from 'antd';

const { Content, Header } = Layout;

interface ProfileData {
  full_name: string;
  email: string;
  profile_photo?: string;
  additional_info?: string;
  city?: string;
}

interface Child {
  id: string;
  full_name: string;
  birthday: string;
  gender: string;
  diagnoses: { name: string }[];
}

const ProfilePage = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAddChildModalVisible, setAddChildModalVisible] = useState(false);
  const [isEditChildModalVisible, setEditChildModalVisible] = useState(false);
  const [editChildId, setEditChildId] = useState<string | null>(null);
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
  const [changeEmailModalVisible, setChangeEmailModalVisible] = useState(false);
  const [newEmailInput, setNewEmailInput] = useState('');

  const accessToken = localStorage.getItem('accessToken');

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const fetchProfile = async (): Promise<ProfileData> => {
    const response = await axios.get(
      'https://project-back-81mh.onrender.com/auth/profile/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };

  const fetchChildById = async (id: string) => {
    const res = await axios.get(
      `https://project-back-81mh.onrender.com/auth/edit-child/${id}/`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return res.data;
  };

  const handleVerifyOtp = async (values) => {
    try {
      setLoading(true);
      await axios.post(
        'https://project-back-81mh.onrender.com/auth/verify-new-email/',
        {
          new_email: newEmail,
          otp: values.otp,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );
      message.success('Email updated successfully!');
      setIsOtpModalVisible(false);
      setIsModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch (err) {
      console.error(err);
      message.error('OTP verification failed');
    } finally {
      setLoading(false);
    }
  };

  const handleEditChildClick = async (id: string) => {
    try {
      console.log('Fetching child by ID:', id);
      console.log('Access token:', localStorage.getItem('accessToken'));
      const childData = await fetchChildById(id);
      editChildForm.setFieldsValue({
        full_name: childData.full_name,
        gender: childData.gender,
        birthday: dayjs(childData.birthday),
        diagnose: childData.diagnoses[0]?.name || '',
      });
      setEditChildId(id);
      setEditChildModalVisible(true);
    } catch (err: any) {
      console.error(
        'Error while fetching child:',
        err?.response?.data || err.message
      );
      message.error('Failed to fetch child data');
    }
  };

  const handleSaveEditedChild = async () => {
    try {
      const values = await editChildForm.validateFields();

      const updatedChild = {
        full_name: values.full_name,
        gender: values.gender,
        birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
        diagnoses: [{ name: values.diagnose }],
      };

      console.log('➡️ Updating child with:', updatedChild);
      console.log('Diagnose: ', values.diagnose);

      await axios.patch(
        `https://project-back-81mh.onrender.com/auth/edit-child/${editChildId}/`,
        updatedChild,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      message.success('Child updated!');
      setEditChildModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ['children'] });
    } catch (err: any) {
      console.error(
        'Failed to update child:',
        err?.response?.data || err.message
      );
      message.error('Failed to update child');
    }
  };

  const fetchChildren = async (): Promise<Child[]> => {
    const response = await axios.get(
      'https://project-back-81mh.onrender.com/auth/children/',
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );
    return response.data;
  };

  const { data: profile, isError: profileError } = useQuery<ProfileData, Error>(
    {
      queryKey: ['profile'],
      queryFn: fetchProfile,
    }
  );

  const {
    data: children,
    isError: childrenError,
    refetch: refetchChildren,
  } = useQuery<Child[], Error>({
    queryKey: ['children'],
    queryFn: fetchChildren,
  });

  const handleEditClick = () => {
    setIsModalVisible(true);
    form.setFieldsValue({
      full_name: profile?.full_name,
      additional_info: profile?.additional_info,
      city: profile?.city,
    });
  };

  const handleSave = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();

      formData.append('full_name', values.full_name);
      formData.append('additional_info', values.additional_info || '');
      formData.append('city', values.city || '');

      if (values.profile_photo && values.profile_photo.length > 0) {
        formData.append('profile_photo', values.profile_photo[0].originFileObj);
      }

      await axios.patch(
        'https://project-back-81mh.onrender.com/auth/profile/',
        formData,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (values.email !== profile?.email) {
        setNewEmail(values.email);
        setIsOtpModalVisible(true);
        setTimer(600);
      } else {
        message.success('Profile updated!');
        setIsModalVisible(false);
        queryClient.invalidateQueries({ queryKey: ['profile'] });
      }
    } catch (error) {
      console.error(error);
      message.error('Failed to update profile');
    }
  };

  const handleAddChild = async () => {
    try {
      const values = await childForm.validateFields();
      const payload = {
        full_name: values.full_name,
        birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
        gender: values.gender,
        diagnoses: [{ name: values.diagnose }],
      };

      await axios.post(
        'https://project-back-81mh.onrender.com/auth/add-child/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      message.success('Child added!');
      childForm.resetFields();
      setAddChildModalVisible(false);
      refetchChildren();
    } catch (error) {
      console.error(error);
      message.error('Failed to add child.');
    }
  };

  if (profileError || !profile) {
    return <p style={{ padding: 20, color: 'red' }}>Failed to load profile.</p>;
  }

  return (
    <Layout className="profile-layout">
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
        selectedPage={null}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
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
          {!profile ? (
            <Skeleton active avatar paragraph={{ rows: 4 }} />
          ) : (
            <div className="profile-container">
              <div className="profile-left">
                <img
                  key={profile.profile_photo}
                  src={`${profile.profile_photo || img}?${Date.now()}`}
                  alt="Profile"
                  className="profile-image"
                />
              </div>

              <div className="profile-info-right">
                <h2 className="profile-fullname">{profile.full_name}</h2>

                <div className="profile-links">
                  <a onClick={() => navigate('/change-phone')}>Change email</a>
                  <a onClick={() => navigate('/forgot-password')}>
                    Change password
                  </a>
                </div>

                <div className="profile-action-buttons">
                  <Button
                    icon={<PlusOutlined />}
                    onClick={() => setAddChildModalVisible(true)}
                  >
                    Add child
                  </Button>
                  <Button icon={<EditOutlined />} onClick={handleEditClick}>
                    Edit
                  </Button>
                  <Button onClick={() => setChangeEmailModalVisible(true)}>
                    Change Email
                  </Button>
                </div>
              </div>

              <div className="profile-form-readonly">
                <Form layout="vertical">
                  <Form.Item label="Additional Info (optional):">
                    <Input.TextArea
                      value={
                        profile.additional_info ||
                        'Empty additional information...'
                      }
                      disabled
                    />
                  </Form.Item>
                  <Form.Item label="City (optional):">
                    <Input value={profile.city || 'Empty'} disabled />
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}

          {!children ? (
            <Skeleton active paragraph={{ rows: 5 }} />
          ) : (
            <div className="children-section">
              <h3>Children</h3>
              {children.map((child) => (
                <div key={child.id} className="child-card">
                  <h3>{child.full_name}</h3>
                  <Divider
                    style={{ marginTop: '-10px', marginBottom: '10px' }}
                  />
                  <p>
                    <strong>Birthday:</strong> {child.birthday}
                  </p>
                  <p>
                    <strong>Diagnose:</strong>{' '}
                    {child.diagnoses.map((d) => d.name).join(', ')}
                  </p>
                  <p>
                    <strong>Gender:</strong> {child.gender}
                  </p>
                  <Button
                    type="link"
                    icon={<EditOutlined />}
                    onClick={() => handleEditChildClick(child.id)}
                  >
                    Edit
                  </Button>
                </div>
              ))}
            </div>
          )}

          {/* Edit Profile Modal */}
          <Modal
            title="Edit Profile"
            open={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={[
              <Button key="cancel" onClick={() => setIsModalVisible(false)}>
                Cancel
              </Button>,
              <Button key="save" type="primary" onClick={handleSave}>
                Save
              </Button>,
            ]}
          >
            <Form layout="vertical" form={form}>
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="profile_photo"
                label="Profile Image"
                valuePropName="fileList"
                getValueFromEvent={(e) => (Array.isArray(e) ? e : e?.fileList)}
              >
                <Upload
                  listType="picture"
                  maxCount={1}
                  beforeUpload={() => false}
                >
                  <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
              </Form.Item>
              <Form.Item name="additional_info" label="Additional Info">
                <Input.TextArea />
              </Form.Item>
              <Form.Item name="city" label="City">
                <Input />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Email */}
          <Modal
            title="Change Email"
            open={changeEmailModalVisible}
            onCancel={() => setChangeEmailModalVisible(false)}
            footer={null}
          >
            <Form
              onFinish={async () => {
                try {
                  const formData = new FormData();
                  formData.append('email', newEmailInput);

                  await axios.patch(
                    'https://project-back-81mh.onrender.com/auth/profile/',
                    formData,
                    {
                      headers: {
                        Authorization: `Bearer ${accessToken}`,
                        'Content-Type': 'multipart/form-data',
                      },
                    }
                  );

                  setNewEmail(newEmailInput); // for otp
                  setChangeEmailModalVisible(false);
                  setIsOtpModalVisible(true);
                  setTimer(600);
                } catch (err) {
                  console.error(err);
                  message.error('Failed to send email update');
                }
              }}
            >
              <Form.Item
                label="New Email"
                name="newEmail"
                rules={[{ required: true, type: 'email' }]}
              >
                <Input
                  value={newEmailInput}
                  onChange={(e) => setNewEmailInput(e.target.value)}
                  placeholder="Enter new email"
                />
              </Form.Item>

              <Button
                htmlType="submit"
                type="primary"
                style={{ width: '100%' }}
              >
                Send OTP
              </Button>
            </Form>
          </Modal>

          {/* Add Child Modal */}
          <Modal
            title="Add Child"
            open={isAddChildModalVisible}
            onCancel={() => setAddChildModalVisible(false)}
            footer={[
              <Button
                key="cancel"
                onClick={() => setAddChildModalVisible(false)}
              >
                Cancel
              </Button>,
              <Button key="save" type="primary" onClick={handleAddChild}>
                + Add
              </Button>,
            ]}
          >
            <Form layout="vertical" form={childForm}>
              <Form.Item
                name="full_name"
                label="Full Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="birthday"
                label="Birthday"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                name="gender"
                label="Gender"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="diagnose"
                label="Diagnose"
                rules={[{ required: true }]}
              >
                <Input placeholder="e.g., Autism" />
              </Form.Item>
            </Form>
          </Modal>

          {/* Edit Child Modal */}
          <Modal
            title="Edit Child"
            open={isEditChildModalVisible}
            onCancel={() => setEditChildModalVisible(false)}
            footer={[
              <Button
                key="cancel"
                onClick={() => setEditChildModalVisible(false)}
              >
                Cancel
              </Button>,
              <Button key="save" type="primary" onClick={handleSaveEditedChild}>
                Save
              </Button>,
            ]}
          >
            <Form layout="vertical" form={editChildForm}>
              <Form.Item
                label="Full Name"
                name="full_name"
                rules={[{ required: true }]}
              >
                <Input placeholder="Enter name" />
              </Form.Item>
              <Form.Item
                label="Birthday"
                name="birthday"
                rules={[{ required: true }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item
                label="Diagnose"
                name="diagnose"
                rules={[{ required: true }]}
              >
                <Input placeholder="Diagnose" />
              </Form.Item>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[{ required: true }]}
              >
                <Radio.Group>
                  <Radio value="Male">Male</Radio>
                  <Radio value="Female">Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Form>
          </Modal>

          {/* Verify OTP Modal */}
          <Modal
            title="Verify your new email"
            open={isOtpModalVisible}
            onCancel={() => setIsOtpModalVisible(false)}
            footer={null}
          >
            <Form form={otpForm} onFinish={handleVerifyOtp}>
              <Form.Item
                name="otp"
                rules={[
                  {
                    required: true,
                    message: 'Enter the OTP sent to your new email',
                  },
                ]}
              >
                <Input placeholder="Enter OTP" />
              </Form.Item>

              <Button type="primary" htmlType="submit" loading={loading}>
                Verify
              </Button>

              <p style={{ marginTop: 16 }}>
                {timer > 0 && ` in ${formatTimer(timer)}`}
              </p>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default ProfilePage;
