import React, { useEffect, useState, useRef } from 'react';
import {
  Layout,
  Button,
  Input,
  Form,
  Modal,
  Upload,
  DatePicker,
  Steps,
  notification,
  Radio,
  Skeleton,
  Descriptions,
  Dropdown,
  Menu,
} from 'antd';
import type { InputRef } from 'antd';
import {
  EditOutlined,
  UploadOutlined,
  PlusOutlined,
  CheckOutlined,
  MailOutlined,
  LockOutlined,
  MoreOutlined,
} from '@ant-design/icons';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../main_panel/axios-instance';
import dayjs from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import { useNavigate } from 'react-router-dom';
import {
  ProfileLayout,
  ProfileContent,
  ProfileTitle,
  ProfileContainer,
  ProfileLeft,
  ProfileRight,
  DescriptionBlock,
  ChildrenSection,
  ChildCard,
  AddChildButton,
  ProfileDropdownTrigger,
  ParentInfoBlock,
  HeaderSection,
  ChildrenHeader,
  ProfileImage,
  SaveEditedProfileButton,
} from './profile.styled';
import Foot from '../../main_page/main_content/footer/footer/footer';

const { Header } = Layout;
const { Step } = Steps;

interface ProfileData {
  full_name: string;
  email: string;
  profile_photo?: string;
  additional_info?: string;
  city?: string;
}

interface EditProfileValues {
  full_name: string;
  city?: string;
  additional_info?: string;
  profile_photo?: {
    originFileObj: File;
  }[];
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
  const [emailStepModalVisible, setEmailStepModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [addChildModalVisible, setAddChildModalVisible] = useState(false);
  const [editChildModalVisible, setEditChildModalVisible] = useState(false);
  const [editingChildId, setEditingChildId] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [newEmail, setNewEmail] = useState('');
  const [timer, setTimer] = useState(600);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [deletePassword, setDeletePassword] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  const [form] = Form.useForm();
  const [childForm] = Form.useForm();
  const [editChildForm] = Form.useForm();
  const [emailForm] = Form.useForm();
  const [otpForm] = Form.useForm();

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const otpInputRef = useRef<InputRef>(null);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    }
  }, [timer]);

  useEffect(() => {
    if (step === 1 && otpInputRef.current) {
      otpInputRef.current.focus();
    }
  }, [step]);

  const formatTimer = (seconds: number) => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, '0');
    const secs = (seconds % 60).toString().padStart(2, '0');
    return `${minutes}:${secs}`;
  };

  const fetchProfile = async (): Promise<ProfileData> => {
    const response = await axiosInstance.get('/auth/profile/');
    return response.data;
  };

  const fetchChildren = async (): Promise<Child[]> => {
    const response = await axiosInstance.get('/auth/children/');
    return response.data;
  };

  const { data: profile, isLoading } = useQuery<ProfileData>({
    queryKey: ['profile'],
    queryFn: fetchProfile,
  });
  const { data: children } = useQuery<Child[]>({
    queryKey: ['children'],
    queryFn: fetchChildren,
  });

  const handleSendOtp = async (values: { newEmail: string }) => {
    try {
      const formData = new FormData();
      formData.append('email', values.newEmail);
      await axiosInstance.patch('/auth/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setNewEmail(values.newEmail);
      notification.success({
        message: 'OTP Sent',
        description: 'An OTP code was sent to your new email address.',
      });
      setStep(1);
      setTimer(600);
    } catch {
      notification.error({
        message: 'Sending OTP Failed',
        description: 'Could not send OTP code. Please try again later.',
      });
    }
  };

  const handleDeleteAccount = async () => {
    if (!deletePassword) {
      notification.warning({
        message: 'Password Required',
        description: 'Please enter your password to delete your account.',
      });
      return;
    }

    setIsDeleting(true);
    try {
      await axiosInstance.post('/auth/delete-account/', {
        password: deletePassword,
      });

      notification.success({
        message: 'Account Deleted',
        description: 'Your account has been successfully deleted.',
      });

      localStorage.clear();
      navigate('/');
    } catch {
      notification.error({
        message: 'Deletion Failed',
        description: 'Failed to delete your account.',
      });
    } finally {
      setIsDeleting(false);
      setDeleteModalVisible(false);
      setDeletePassword('');
    }
  };

  const handleResendOtp = async () => {
    try {
      const formData = new FormData();
      formData.append('email', newEmail);
      await axiosInstance.patch('/auth/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notification.success({
        message: 'OTP Resent',
        description: 'A new OTP code has been sent to your email.',
      });
      setTimer(600);
    } catch {
      notification.error({
        message: 'Resending Failed',
        description: 'Could not resend OTP code. Try again later.',
      });
    }
  };

  const handleVerifyOtp = async (values: { otp: string }) => {
    try {
      await axiosInstance.post('/auth/verify-new-email/', {
        new_email: newEmail,
        otp: values.otp,
      });
      notification.success({
        message: 'Email Verified',
        description: 'Your email was successfully updated.',
      });
      setEmailStepModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch {
      notification.error({
        message: 'Verification Failed',
        description: 'The OTP code is incorrect. Please try again.',
      });
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
      await axiosInstance.post('/auth/add-child/', payload);
      notification.success({
        message: 'Child Added',
        description: `${values.full_name} has been successfully added.`,
      });
      setAddChildModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ['children'] });
    } catch {
      notification.error({
        message: 'Adding Child Failed',
        description:
          'Something went wrong while adding the child. Please try again.',
      });
    }
  };

  const handleSaveEdit = async (values: EditProfileValues) => {
    try {
      const formData = new FormData();
      formData.append('full_name', values.full_name);
      formData.append('city', values.city || '');
      formData.append('additional_info', values.additional_info || '');
      if (values.profile_photo && values.profile_photo.length > 0) {
        formData.append('profile_photo', values.profile_photo[0].originFileObj);
      }
      await axiosInstance.patch('/auth/profile/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      notification.success({
        message: 'Profile Updated',
        description: 'Your profile has been successfully updated.',
      });
      setEditModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ['profile'] });
    } catch {
      notification.error({
        message: 'Profile Update Failed',
        description: 'Failed to update your profile. Please try again.',
      });
    }
  };

  const handleEditChildClick = async (childId: string) => {
    try {
      const res = await axiosInstance.get(`/auth/edit-child/${childId}/`);
      const child = res.data;
      editChildForm.setFieldsValue({
        full_name: child.full_name,
        birthday: dayjs(child.birthday),
        gender: child.gender,
        diagnose: child.diagnoses[0]?.name || '',
      });
      setEditingChildId(childId);
      setEditChildModalVisible(true);
    } catch {
      notification.error({
        message: 'Failed to Fetch Child Data',
        description:
          'Could not retrieve child information. Please try again later.',
      });
    }
  };

  const handleSaveEditedChild = async () => {
    try {
      const values = await editChildForm.validateFields();
      const payload = {
        full_name: values.full_name,
        birthday: dayjs(values.birthday).format('YYYY-MM-DD'),
        gender: values.gender,
        diagnoses: [{ name: values.diagnose }],
      };
      await axiosInstance.patch(`/auth/edit-child/${editingChildId}/`, payload);
      notification.success({
        message: 'Child Info Updated',
        description: `${values.full_name}'s information has been successfully updated.`,
      });
      setEditChildModalVisible(false);
      queryClient.invalidateQueries({ queryKey: ['children'] });
    } catch {
      notification.error({
        message: 'Update Failed',
        description: 'Could not update child information. Please try again.',
      });
    }
  };

  const handleEditClick = () => {
    setEditModalVisible(true);
    form.setFieldsValue({
      full_name: profile?.full_name,
      city: profile?.city,
      additional_info: profile?.additional_info,
    });
  };

  const menu = (
    <Menu>
      <Menu.Item key="edit" icon={<EditOutlined />} onClick={handleEditClick}>
        Edit Profile
      </Menu.Item>
      <Menu.Item
        key="email"
        icon={<MailOutlined />}
        onClick={() => setEmailStepModalVisible(true)}
      >
        Change Email
      </Menu.Item>
      <Menu.Item
        key="password"
        icon={<LockOutlined />}
        onClick={() => navigate('/forgot-password')}
      >
        Change Password
      </Menu.Item>
      <Menu.Item
        key="delete"
        danger
        onClick={() => setDeleteModalVisible(true)}
      >
        Delete Account
      </Menu.Item>
    </Menu>
  );

  return (
    <ProfileLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout style={{ marginLeft: collapsed ? 100 : 250 }}>
        <Header
          style={{
            padding: 0,
            marginLeft: 5,
            background: '#E2E3E0',
            height: 48,
          }}
        >
          <Main_header />
        </Header>
        <ProfileContent>
          <ProfileTitle>Profile</ProfileTitle>
          {isLoading || !profile ? (
            <Skeleton active paragraph={{ rows: 6 }} />
          ) : (
            <ProfileContainer>
              <ProfileLeft>
                <ProfileImage
                  key={profile.profile_photo}
                  src={`${profile.profile_photo}?${Date.now()}`}
                  alt="Profile Image"
                />
                <ParentInfoBlock>
                  <HeaderSection>
                    <h1>{profile.full_name}</h1>
                    <ProfileDropdownTrigger>
                      <Dropdown overlay={menu} trigger={['click']}>
                        <Button
                          icon={<MoreOutlined style={{ fontSize: 'large' }} />}
                        />
                      </Dropdown>
                    </ProfileDropdownTrigger>
                  </HeaderSection>

                  <DescriptionBlock bordered={false} column={1} size="small">
                    <Descriptions.Item label="Email">
                      {profile.email}
                    </Descriptions.Item>
                    <Descriptions.Item label="Additional Info">
                      {profile.additional_info || 'Empty'}
                    </Descriptions.Item>
                    <Descriptions.Item label="City">
                      {profile.city || 'Empty'}
                    </Descriptions.Item>
                  </DescriptionBlock>
                </ParentInfoBlock>
              </ProfileLeft>

              <ProfileRight>
                <ChildrenSection>
                  <ChildrenHeader>
                    <h3>Your Children</h3>
                    <AddChildButton
                      icon={<PlusOutlined />}
                      onClick={() => {
                        childForm.resetFields();
                        setAddChildModalVisible(true);
                      }}
                      type="primary"
                    >
                      Add Child
                    </AddChildButton>
                  </ChildrenHeader>
                  {children?.map((child) => (
                    <ChildCard key={child.id}>
                      <h3>{child.full_name}</h3>
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
                    </ChildCard>
                  ))}
                </ChildrenSection>
              </ProfileRight>
            </ProfileContainer>
          )}
          <Modal
            title="Change Email"
            open={emailStepModalVisible}
            onCancel={() => {
              setStep(0);
              setEmailStepModalVisible(false);
            }}
            footer={null}
          >
            <Steps current={step} style={{ marginBottom: 24 }}>
              <Step title="Enter Email" icon={<MailOutlined />} />
              <Step title="Verify OTP" icon={<CheckOutlined />} />
            </Steps>
            {step === 0 ? (
              <Form form={emailForm} onFinish={handleSendOtp} layout="vertical">
                <Form.Item
                  name="newEmail"
                  label="New Email"
                  rules={[{ required: true, type: 'email' }]}
                >
                  <Input placeholder="example@mail.com" />
                </Form.Item>
                <Button type="primary" htmlType="submit" block>
                  Send OTP
                </Button>
              </Form>
            ) : (
              <Form
                form={otpForm}
                onFinish={handleVerifyOtp}
                layout="vertical"
                style={{ marginTop: 20 }}
              >
                <Form.Item
                  name="otp"
                  label="OTP Code"
                  rules={[
                    { required: true, message: 'Please enter the OTP code' },
                  ]}
                >
                  <Input placeholder="Enter the OTP code" size="large" />
                </Form.Item>

                <Button
                  type="primary"
                  htmlType="submit"
                  block
                  size="large"
                  style={{ marginBottom: 10 }}
                >
                  Verify
                </Button>

                <div
                  style={{ textAlign: 'center', fontSize: 14, color: '#666' }}
                >
                  {timer > 0 ? (
                    <span>Resend available in {formatTimer(timer)}</span>
                  ) : (
                    <Button
                      type="link"
                      onClick={handleResendOtp}
                      style={{ padding: 0 }}
                    >
                      Resend Code
                    </Button>
                  )}
                </div>
              </Form>
            )}
          </Modal>

          <Modal
            title="Edit Profile"
            open={editModalVisible}
            onCancel={() => setEditModalVisible(false)}
            footer={null}
          >
            <Form layout="vertical" form={form} onFinish={handleSaveEdit}>
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
              <Form.Item>
                <SaveEditedProfileButton
                  type="primary"
                  htmlType="submit"
                  block
                  onClick={form.submit}
                >
                  Save
                </SaveEditedProfileButton>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Add Child"
            open={addChildModalVisible}
            onCancel={() => {
              setAddChildModalVisible(false);
              childForm.resetFields();
            }}
            footer={null}
          >
            <Form layout="vertical" form={childForm} onFinish={handleAddChild}>
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
              <Form.Item>
                <SaveEditedProfileButton type="primary" htmlType="submit" block>
                  Add
                </SaveEditedProfileButton>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="Confirm Account Deletion"
            open={deleteModalVisible}
            onCancel={() => setDeleteModalVisible(false)}
            onOk={handleDeleteAccount}
            okText="Delete"
            okButtonProps={{ danger: true, loading: isDeleting }}
          >
            <p>Please enter your password to confirm deletion:</p>
            <Input.Password
              placeholder="Enter your password"
              value={deletePassword}
              onChange={(e) => setDeletePassword(e.target.value)}
            />
          </Modal>

          <Modal
            title="Edit Child"
            open={editChildModalVisible}
            onCancel={() => setEditChildModalVisible(false)}
            footer={null}
          >
            <Form
              layout="vertical"
              form={editChildForm}
              onFinish={handleSaveEditedChild}
            >
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
              <Form.Item>
                <SaveEditedProfileButton type="primary" htmlType="submit" block>
                  Save
                </SaveEditedProfileButton>
              </Form.Item>
            </Form>
          </Modal>
        </ProfileContent>
        <Foot />
      </Layout>
    </ProfileLayout>
  );
};

export default ProfilePage;
