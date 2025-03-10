import React, { useState } from 'react';
import {
  Button,
  Input,
  Form,
  Modal,
  message,
  Upload,
  DatePicker,
  Radio,
  Card,
} from 'antd';
import {
  EditOutlined,
  UploadOutlined,
  UserAddOutlined,
} from '@ant-design/icons';
import moment from 'moment';
import './profile.scss';
import img from '../../images/fav.jpg';
import { Link } from 'react-router-dom';
import TextArea from 'antd/lib/input/TextArea';

interface ChildInfo {
  fullName: string;
  birthday: string;
  diagnose: string;
  gender: string;
}

const ProfilePage: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditChildModalVisible, setIsEditChildModalVisible] = useState(false);
  const [isAddChildModalVisible, setIsAddChildModalVisible] = useState(false);
  const [children, setChildren] = useState<ChildInfo[]>([]);
  const [form] = Form.useForm();
  const [addChildForm] = Form.useForm();
  const [editChildForm] = Form.useForm();
  const [currentChildIndex, setCurrentChildIndex] = useState<number | null>(
    null
  );

  const handleEditClick = () => {
    setIsModalVisible(true);
  };

  const handleAddChildClick = () => {
    setIsAddChildModalVisible(true);
  };

  const handleEditChildClick = (index: number) => {
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
      const newChild: ChildInfo = {
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
        updatedChildren[currentChildIndex] = {
          ...updatedChildren[currentChildIndex],
          fullName: values.fullName,
          birthday: values.birthday.format('YYYY-MM-DD'),
          diagnose: values.diagnose,
          gender: values.gender,
        };
        setChildren(updatedChildren);
        message.success('Child info updated successfully!');
        setIsEditChildModalVisible(false);
        editChildForm.resetFields();
      }
    });
  };

  return (
    <div className="page-container">
      <div className="content-wrap">
        <h1 className="profile-title">Profile</h1>

        <div className="profile-left-section">
          <div className="profile-picture">
            <img src={img} alt="Profile" className="profile-image" />
          </div>
          <div>
            <h2 className="profile-name">Palensheeva Palenshe</h2>
            <Link to={'/change number'} className="button-change-number">
              Change phone number
            </Link>
            <Link to={'/change pass'} className="button-change-password">
              Change password
            </Link>
            <div className="parent-buttons">
              <Button
                className="button-add-child"
                icon={<UserAddOutlined />}
                type="default"
                onClick={handleAddChildClick}
              >
                +Add child
              </Button>
              <Button
                className="button-edit"
                icon={<EditOutlined />}
                type="default"
                onClick={handleEditClick}
                style={{ marginBottom: '20px' }}
              >
                Edit
              </Button>
            </div>
          </div>
          <div className="info-city-container">
            <div className="add-info">
              <label className="label-info-city">Additional Info:</label>
              <TextArea placeholder="Enter additional information..............."></TextArea>
            </div>
            <div className="add-info">
              <label className="label-info-city">City:</label>
              <Input placeholder="Enter your city"></Input>
            </div>
          </div>
        </div>
        {children.map((child, index) => (
          <Card
            key={index}
            title={child.fullName}
            extra={
              <Button
                type="text"
                icon={<EditOutlined />}
                onClick={() => handleEditChildClick(index)}
              />
            }
            bordered={true}
            className="child-card"
          >
            <p>
              <strong>Birthday:</strong> {child.birthday}
            </p>
            <p>
              <strong>Diagnose:</strong> {child.diagnose}
            </p>
            <p>
              <strong>Gender:</strong> {child.gender}
            </p>
          </Card>
        ))}
      </div>

      {/* Edit Parent Info Modal */}
      <Modal
        title="Edit Parent Info"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          <Button key="cancel" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleSave}
            style={{ backgroundColor: '#556B2F' }}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" form={form}>
          <Form.Item label="Full Name:" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Phone number:" name="phoneNumber">
            <Input />
          </Form.Item>
          <Form.Item label="City:" name="city">
            <Input />
          </Form.Item>
          <Form.Item label="Additional Info:" name="additionalInfo">
            <Input.TextArea rows={4} />
          </Form.Item>
          <Form.Item label="Change photo:" name="profileImage">
            <Upload listType="text">
              <Button icon={<UploadOutlined />}>Upload</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>

      {/* Add Child Modal */}
      <Modal
        title="Add Child"
        visible={isAddChildModalVisible}
        onCancel={handleAddChildCancel}
        footer={[
          <Button
            key="save"
            type="primary"
            onClick={handleAddChildSave}
            style={{ backgroundColor: '#556B2F' }}
          >
            +Add
          </Button>,
          <Button key="cancel" onClick={handleAddChildCancel}>
            Cancel
          </Button>,
        ]}
      >
        <Form layout="vertical" form={addChildForm}>
          <Form.Item label="Full Name:" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Birthday:" name="birthday">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Diagnose:" name="diagnose">
            <Input />
          </Form.Item>
          <Form.Item label="Gender:" name="gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>

      {/* Edit Child Info Modal */}
      <Modal
        title="Edit Child Info"
        visible={isEditChildModalVisible}
        onCancel={handleEditChildCancel}
        footer={[
          <Button key="cancel" onClick={handleEditChildCancel}>
            Cancel
          </Button>,
          <Button
            key="save"
            type="primary"
            onClick={handleEditChildSave}
            style={{ backgroundColor: '#556B2F' }}
          >
            Save
          </Button>,
        ]}
      >
        <Form layout="vertical" form={editChildForm}>
          <Form.Item label="Full Name:" name="fullName">
            <Input />
          </Form.Item>
          <Form.Item label="Birthday:" name="birthday">
            <DatePicker style={{ width: '100%' }} />
          </Form.Item>
          <Form.Item label="Diagnose:" name="diagnose">
            <Input />
          </Form.Item>
          <Form.Item label="Gender:" name="gender">
            <Radio.Group>
              <Radio value="male">Male</Radio>
              <Radio value="female">Female</Radio>
            </Radio.Group>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default ProfilePage;
