// SymptomTracker.tsx
import React, { useState, useMemo } from 'react';
import {
  Layout,
  Calendar,
  Button,
  Typography,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  message,
  Tooltip,
  Popover,
  Divider,
  Space,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import dayjs, { Dayjs } from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import './symptom_tracker.scss';

const { Header, Content } = Layout;
const { Title, Text } = Typography;
const { Option } = Select;

const accessToken = localStorage.getItem('accessToken');

interface Symptom {
  id: string;
  child: string;
  child_name: string;
  date: string;
  symptom_name: string;
  action_taken: string;
  created_at: string;
  updated_at: string;
}

interface Child {
  id: string;
  full_name: string;
}

interface SymptomPayload {
  child: string;
  date: string;
  symptom_name: string;
  action_taken: string;
}

const SymptomTracker = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedDate, setSelectedDate] = useState<Dayjs | null>(null);
  const [formModalOpen, setFormModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [popoverVisible, setPopoverVisible] = useState<string | null>(null);
  const [selectedMonth, setSelectedMonth] = useState<number | undefined>();
  const [selectedYear, setSelectedYear] = useState<number | undefined>();
  const [selectedChildId, setSelectedChildId] = useState<string>('');

  const queryClient = useQueryClient();
  const childColors = [
    '#1890ff',
    '#52c41a',
    '#faad14',
    '#eb2f96',
    '#722ed1',
    '#13c2c2',
  ];
  const childColorMap = new Map<string, string>();

  const fetchSymptoms = async (): Promise<Symptom[]> =>
    (
      await axios.get(
        'https://project-back-81mh.onrender.com/symptoms/entries/',
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      )
    ).data;

  const fetchChildren = async (): Promise<Child[]> =>
    (
      await axios.get('https://project-back-81mh.onrender.com/auth/children/', {
        headers: { Authorization: `Bearer ${accessToken}` },
      })
    ).data;

  const { data: symptoms = [] } = useQuery<Symptom[]>({
    queryKey: ['symptoms'],
    queryFn: fetchSymptoms,
  });

  const { data: children = [] } = useQuery<Child[]>({
    queryKey: ['children'],
    queryFn: fetchChildren,
  });

  children?.forEach((child, index) => {
    if (!childColorMap.has(child.id)) {
      childColorMap.set(child.id, childColors[index % childColors.length]);
    }
  });

  const addSymptom = useMutation({
    mutationFn: (payload: SymptomPayload) =>
      axios.post(
        'https://project-back-81mh.onrender.com/symptoms/entries/',
        payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ),
    onSuccess: () => {
      message.success('Symptom added');
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
    },
    onError: () => message.error('Failed to add symptom'),
  });

  const updateSymptom = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SymptomPayload }) =>
      axios.patch(
        `https://project-back-81mh.onrender.com/symptoms/entries/${id}/`,
        payload,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ),
    onSuccess: () => {
      message.success('Symptom updated');
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
    },
    onError: () => message.error('Failed to update symptom'),
  });

  const deleteSymptom = useMutation({
    mutationFn: (id: string) =>
      axios.delete(
        `https://project-back-81mh.onrender.com/symptoms/entries/${id}/`,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        }
      ),
    onSuccess: () => {
      message.success('Symptom deleted');
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
    },
    onError: () => message.error('Failed to delete symptom'),
  });

  const openFormModal = (symptom?: Symptom, date?: Dayjs) => {
    if (symptom) {
      setIsEditMode(true);
      setEditingId(symptom.id);
      setSelectedDate(dayjs(symptom.date));
      form.setFieldsValue({
        child: children.find((c) => c.full_name === symptom.child_name)?.id,
        symptom_name: symptom.symptom_name,
        action_taken: symptom.action_taken,
      });
    } else {
      setIsEditMode(false);
      form.resetFields();
      if (date) setSelectedDate(date);
    }
    setPopoverVisible(null);
    setFormModalOpen(true);
  };

  const handleFormSubmit = (values: SymptomPayload) => {
    if (!selectedDate) return; // чтобы убрать ошибку undefined

    const payload: SymptomPayload = {
      child: values.child,
      date: selectedDate.format('YYYY-MM-DD'), // теперь точно string
      symptom_name: values.symptom_name,
      action_taken: values.action_taken || '',
    };

    if (isEditMode && editingId) {
      updateSymptom.mutate({ id: editingId, payload });
    } else {
      addSymptom.mutate(payload);
    }

    setFormModalOpen(false);
    setEditingId(null);
  };

  const filteredSymptoms = useMemo(() => {
    return symptoms.filter((s) => {
      const date = dayjs(s.date);
      const matchMonth =
        selectedMonth !== undefined ? date.month() === selectedMonth : true;
      const matchYear =
        selectedYear !== undefined ? date.year() === selectedYear : true;
      const matchChild = selectedChildId ? s.child === selectedChildId : true;
      return matchMonth && matchYear && matchChild;
    });
  }, [symptoms, selectedMonth, selectedYear, selectedChildId]);

  const dateCellRender = (date: Dayjs) => {
    const currentDaySymptoms = filteredSymptoms.filter(
      (s) => dayjs(s.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );

    return (
      <Popover
        content={
          <div style={{ minWidth: 250 }}>
            {currentDaySymptoms.length ? (
              <div>
                {currentDaySymptoms.map((symptom) => (
                  <div key={symptom.id} style={{ marginBottom: 12 }}>
                    <Text
                      strong
                      style={{ color: childColorMap.get(symptom.child) }}
                    >
                      {symptom.symptom_name}
                    </Text>
                    <br />
                    <Text>
                      <strong>Child:</strong> {symptom.child_name}
                    </Text>
                    <br />
                    <Text>
                      <strong>Actions:</strong> {symptom.action_taken || '—'}
                    </Text>
                    <br />
                    <Text type="secondary">
                      Created:{' '}
                      {dayjs(symptom.created_at).format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <br />
                    <Text type="secondary">
                      Updated:{' '}
                      {dayjs(symptom.updated_at).format('YYYY-MM-DD HH:mm')}
                    </Text>
                    <div style={{ marginTop: 8 }}>
                      <Button
                        icon={<EditOutlined />}
                        size="small"
                        onClick={() => openFormModal(symptom)}
                        style={{ marginRight: 8 }}
                      >
                        Edit
                      </Button>
                      <Popconfirm
                        title="Are you sure to delete this symptom?"
                        onConfirm={() => deleteSymptom.mutate(symptom.id)}
                        okText="Yes"
                        cancelText="No"
                      >
                        <Button icon={<DeleteOutlined />} size="small" danger>
                          Delete
                        </Button>
                      </Popconfirm>
                    </div>
                    <Divider />
                  </div>
                ))}
                <Button
                  type="primary"
                  icon={<PlusOutlined />}
                  onClick={() => openFormModal(undefined, date)}
                  block
                >
                  Add Symptom
                </Button>
              </div>
            ) : (
              <Button
                type="link"
                onClick={() => openFormModal(undefined, date)}
              >
                Add Symptom
              </Button>
            )}
          </div>
        }
        trigger="click"
        open={popoverVisible === date.format('YYYY-MM-DD')}
        onOpenChange={(open: boolean) =>
          setPopoverVisible(open ? date.format('YYYY-MM-DD') : null)
        }
      >
        <div className="calendar-cell">
          {currentDaySymptoms.map((s, i) => (
            <div
              key={i}
              style={{ color: childColorMap.get(s.child), fontSize: 12 }}
            >
              {s.symptom_name}
            </div>
          ))}
        </div>
      </Popover>
    );
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
        selectedPage="/symptom-tracker"
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
        <Content
          style={{ padding: '20px', background: '#fff', minHeight: '100%' }}
        >
          <div className="symptom-header">
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Title level={3} style={{ color: '#591C00', marginBottom: 0 }}>
                Symptom Tracker
              </Title>
              <Tooltip title="Click a day to view or add symptoms">
                <InfoCircleOutlined style={{ marginLeft: 10, color: '#999' }} />
              </Tooltip>
            </div>
            <Space>
              <Select
                placeholder="Month"
                style={{ width: 120 }}
                onChange={(v) => setSelectedMonth(v)}
                allowClear
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <Option key={i} value={i}>
                    {dayjs().month(i).format('MMMM')}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Year"
                style={{ width: 100 }}
                onChange={(v) => setSelectedYear(v)}
                allowClear
              >
                {[2023, 2024, 2025].map((y) => (
                  <Option key={y} value={y}>
                    {y}
                  </Option>
                ))}
              </Select>
              <Select
                placeholder="Child"
                style={{ width: 180 }}
                onChange={(v) => setSelectedChildId(v)}
                allowClear
              >
                {children.map((c) => (
                  <Option key={c.id} value={c.id}>
                    {c.full_name}
                  </Option>
                ))}
              </Select>
            </Space>
          </div>

          <Calendar
            cellRender={dateCellRender}
            disabledDate={(current) =>
              current && current > dayjs().endOf('day')
            }
          />

          <Modal
            title={
              isEditMode
                ? 'Edit Symptom'
                : `Add Symptom - ${selectedDate?.format('MMMM D, YYYY')}`
            }
            open={formModalOpen}
            onCancel={() => setFormModalOpen(false)}
            footer={null}
          >
            <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
              <Form.Item
                name="child"
                label="Child"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select a child">
                  {children.map((child) => (
                    <Option key={child.id} value={child.id}>
                      {child.full_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="symptom_name"
                label="Symptom"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="action_taken" label="Actions / Therapies">
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: '#426B1F' }}
                >
                  {isEditMode ? 'Save Changes' : 'Add Symptom'}
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
