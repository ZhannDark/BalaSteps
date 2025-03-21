import React, { useState } from 'react';
import {
  Button,
  Layout,
  Typography,
  Card,
  Modal,
  Form,
  Input,
  DatePicker,
  Space,
  theme,
} from 'antd';
import dayjs from 'dayjs';
import './symptom_tracker.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';

const { Text } = Typography;
const { Header, Content } = Layout;

interface Symptom {
  id: number;
  name: string;
  actions: string;
  date: string;
}

const SymptomTracker = () => {
  const [symptoms, setSymptoms] = useState<Symptom[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false); // Добавляем состояние для сворачивания
  const [form] = Form.useForm();

  const {
    token: { borderRadiusLG },
  } = theme.useToken();

  const showAddSymptomModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleAddSymptom = (values: any) => {
    const newSymptom: Symptom = {
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

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuPanel collapsed={collapsed} toggleCollapsed={handleToggleMenu}  selectedPage={'/symptom_tracker'}/>{' '}
      <Layout
        style={{
          marginLeft: collapsed ? 100 : 250,
          transition: 'margin-left 0.3s',
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
        <Content
          style={{
            margin: '10px 8px',
            padding: 24,
            minHeight: 280,
            background: '#F6F6F6',
            borderRadius: borderRadiusLG,
          }}
        >
          <h1 className="title">Symptom Tracker</h1>
          <Button
            type="primary"
            onClick={showAddSymptomModal}
            className="add-button"
          >
            + Add Symptom
          </Button>
          <Space direction="vertical" style={{ width: '100%' }}>
            {symptoms.map((symptom) => (
              <Card key={symptom.id} className="symptom-card">
                <div className="symptom-header">
                  <Text strong>{symptom.name}</Text>
                  <Text>Date: {symptom.date}</Text>
                </div>
                <Text>{symptom.actions}</Text>
              </Card>
            ))}
          </Space>
          <Modal
            title="Add New Symptom"
            open={isModalOpen}
            onCancel={handleCancel}
            footer={null}
          >
            <Form form={form} layout="vertical" onFinish={handleAddSymptom}>
              <Form.Item
                label="Symptom Name"
                name="name"
                rules={[
                  { required: true, message: 'Please enter the symptom name' },
                ]}
              >
                <Input placeholder="Enter symptom name" />
              </Form.Item>
              <Form.Item
                label="Actions/Therapies"
                name="actions"
                rules={[
                  {
                    required: true,
                    message: 'Please enter actions or therapies',
                  },
                ]}
              >
                <Input.TextArea placeholder="Enter actions/therapies" />
              </Form.Item>
              <Form.Item
                label="Date"
                name="date"
                rules={[{ required: true, message: 'Please select a date' }]}
              >
                <DatePicker style={{ width: '100%' }} />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: '10%',
                    backgroundColor: '#426B1F',
                    marginRight: '10px',
                    marginLeft: '337px',
                  }}
                >
                  Add
                </Button>
                <Button key="cancel" onClick={handleCancel}>
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Modal>
        </Content>
      </Layout>
    </Layout>
  );
};

export default SymptomTracker;