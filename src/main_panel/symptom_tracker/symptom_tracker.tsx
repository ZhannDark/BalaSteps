import React, { useState } from 'react';
import {
  Calendar,
  Button,
  Modal,
  Form,
  Input,
  Select,
  Popconfirm,
  notification,
  Tooltip,
  Drawer,
  Divider,
  Layout,
} from 'antd';
import {
  EditOutlined,
  PlusOutlined,
  DeleteOutlined,
  InfoCircleOutlined,
  UserOutlined,
  SettingOutlined,
  ClockCircleOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosInstance from '../../main_panel/axios-instance';
import dayjs, { Dayjs } from 'dayjs';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import Foot from '../../main_page/main_content/footer/footer/footer';
import {
  SymptomLayout,
  SymptomHeaderBar,
  SymptomContent,
  SymptomHeader,
  CalendarCell,
  DisabledDate,
  ChildSymptom,
  SymptomAction,
  AddSymptomButton,
  AddSymptomDrawerButton,
  DrawerContainer,
  SymptomDrawerTitle,
  SymptomTitle,
} from './symptom-tracker.styled';
const { Option } = Select;

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

interface ExportPdfPayload {
  child_id: number;
  period: '3months' | '6months' | 'year' | 'custom';
  custom_start?: string;
  custom_end?: string;
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
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [drawerSymptoms, setDrawerSymptoms] = useState<Symptom[]>([]);
  const [aiModalOpen, setAiModalOpen] = useState(false);
  const [aiForm] = Form.useForm();
  const [pdfModalOpen, setPdfModalOpen] = useState(false);
  const [pdfForm] = Form.useForm();
  const [aiResult, setAiResult] = useState<string>('');
  const period = Form.useWatch('period', pdfForm);

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

  const fetchSymptoms = async (): Promise<Symptom[]> => {
    const res = await axiosInstance.get('/symptoms/entries/');
    return res.data;
  };

  const fetchChildren = async (): Promise<Child[]> => {
    const res = await axiosInstance.get('/auth/children/');
    return res.data;
  };

  const { data: symptoms = [] } = useQuery<Symptom[]>({
    queryKey: ['symptoms'],
    queryFn: fetchSymptoms,
  });

  const { data: children = [] } = useQuery<Child[]>({
    queryKey: ['children'],
    queryFn: fetchChildren,
  });

  children.forEach((child, index) => {
    if (!childColorMap.has(child.id)) {
      childColorMap.set(child.id, childColors[index % childColors.length]);
    }
  });

  const addSymptom = useMutation({
    mutationFn: (payload: SymptomPayload) =>
      axiosInstance.post('/symptoms/entries/', payload),
    onSuccess: () => {
      notification.success({
        message: 'Symptom Added',
        description: 'Symptom was successfully added.',
      });
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
    },
    onError: () => {
      notification.error({
        message: 'Adding Symptom Failed',
        description:
          'There was a problem while adding the symptom. Please try again later.',
      });
    },
  });

  const updateSymptom = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: SymptomPayload }) =>
      axiosInstance.patch(`/symptoms/entries/${id}/`, payload),
    onSuccess: () => {
      notification.success({
        message: 'Symptom Updated',
        description: 'Symptom was successfully updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
    },
    onError: () => {
      notification.error({
        message: 'Updating Symptom Failed',
        description:
          'There was a problem while updating the symptom. Please try again later.',
      });
    },
  });

  const deleteSymptom = useMutation({
    mutationFn: (id: string) =>
      axiosInstance.delete(`/symptoms/entries/${id}/`),
    onSuccess: () => {
      notification.success({
        message: 'Symptom Deleted',
        description: 'Symptom has been successfully deleted.',
      });
      setDrawerVisible(false);
      queryClient.invalidateQueries({ queryKey: ['symptoms'] });
    },
    onError: () => {
      notification.error({
        message: 'Deleting Symptom Failed',
        description:
          'There was a problem while deleting the symptom. Please try again later.',
      });
    },
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
    setFormModalOpen(true);
  };

  const openDrawer = (symptoms: Symptom[], date: Dayjs) => {
    setDrawerSymptoms(symptoms);
    setSelectedDate(date);
    setDrawerVisible(true);
  };

  const handleFormSubmit = (values: SymptomPayload) => {
    if (!selectedDate) return;

    const payload: SymptomPayload = {
      child: values.child,
      date: selectedDate.format('YYYY-MM-DD'),
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

  const handleAiAnalyze = async (values: {
    child_id: number;
    date_from: string;
    date_to: string;
  }) => {
    try {
      const res = await axiosInstance.post('/symptoms/ai-analyze/', values);
      setAiResult(res.data.result || JSON.stringify(res.data, null, 2));
    } catch {
      notification.error({
        message: 'AI Analysis Failed',
        description: 'Unable to analyze symptoms. Try again later.',
      });
    }
  };

  const handleDownloadPDF = async (values: ExportPdfPayload) => {
    try {
      const res = await axiosInstance.post('/symptoms/export-pdf/', values, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(
        new Blob([res.data], { type: 'application/pdf' })
      );
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'symptoms.pdf');
      document.body.appendChild(link);
      link.click();
    } catch {
      notification.error({
        message: 'Download Failed',
        description: 'Could not generate PDF. Check input and try again.',
      });
    }
  };

  const dateCellRender = (date: Dayjs) => {
    const isFuture = date.isAfter(dayjs(), 'day');
    if (isFuture) return <DisabledDate />;

    const currentDaySymptoms = symptoms.filter(
      (s) => dayjs(s.date).format('YYYY-MM-DD') === date.format('YYYY-MM-DD')
    );

    const limitedSymptoms = currentDaySymptoms.slice(0, 2);
    const overflow = currentDaySymptoms.length - 2;

    return (
      <CalendarCell onClick={() => openDrawer(currentDaySymptoms, date)}>
        {limitedSymptoms.map((s) => (
          <div
            key={s.id}
            style={{
              color: '#000',
              fontSize: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <span
              style={{
                backgroundColor: childColorMap.get(s.child),
                width: 8,
                height: 8,
                borderRadius: '50%',
                display: 'inline-block',
              }}
            ></span>
            {s.symptom_name}
          </div>
        ))}
        {overflow > 0 && <div style={{ fontSize: 12 }}>+{overflow} more</div>}
      </CalendarCell>
    );
  };

  return (
    <SymptomLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 100 : 250,
          transition: 'margin-left 0.2s ease',
        }}
      >
        <SymptomHeaderBar>
          <Main_header />
        </SymptomHeaderBar>
        <SymptomContent>
          <SymptomHeader>
            <SymptomTitle>Symptom Tracker</SymptomTitle>
            <Tooltip title="Click a day to view or add symptoms">
              <InfoCircleOutlined style={{ marginLeft: 10, color: '#999' }} />
            </Tooltip>
            <AddSymptomButton
              style={{ marginRight: 10, marginLeft: 'auto' }}
              type="primary"
              onClick={() => setAiModalOpen(true)}
            >
              Analyze with AI
            </AddSymptomButton>
            <AddSymptomButton
              icon={<DownloadOutlined />}
              onClick={() => setPdfModalOpen(true)}
            >
              Export PDF
            </AddSymptomButton>
          </SymptomHeader>

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
            style={{ top: 50 }}
            styles={{ body: { maxHeight: '70vh', overflowY: 'auto' } }}
          >
            <Form layout="vertical" form={form} onFinish={handleFormSubmit}>
              <Divider orientation="left">Main Info</Divider>
              <Form.Item
                name="child"
                label="Child"
                rules={[{ required: true }]}
                extra="Select the child this symptom is related to."
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
                <Input.TextArea />
              </Form.Item>
              <Divider orientation="left">Details</Divider>
              <Form.Item
                name="action_taken"
                label="Actions / Therapies"
                extra="Describe any action or therapy taken."
              >
                <Input.TextArea />
              </Form.Item>
              <Form.Item>
                <AddSymptomButton type="primary" htmlType="submit">
                  {isEditMode ? 'Save Changes' : 'Add Symptom'}
                </AddSymptomButton>
              </Form.Item>
            </Form>
          </Modal>

          <Modal
            title="AI Symptom Analysis"
            open={aiModalOpen}
            onCancel={() => setAiModalOpen(false)}
            onOk={() => aiForm.submit()}
            okText={aiResult ? 'Close' : 'Analyze'}
            okButtonProps={{
              style: { backgroundColor: '#426b1f', borderColor: 'white' },
            }}
            style={{ top: 100 }}
          >
            <Form layout="vertical" form={aiForm} onFinish={handleAiAnalyze}>
              <Form.Item
                name="child_id"
                label="Select Child"
                rules={[{ required: true }]}
              >
                <Select placeholder="Choose child">
                  {children.map((child) => (
                    <Option key={child.id} value={child.id}>
                      {child.full_name}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="date_from"
                label="Start Date"
                rules={[{ required: true }]}
              >
                <Input type="date" />
              </Form.Item>
              <Form.Item
                name="date_to"
                label="End Date"
                rules={[{ required: true }]}
              >
                <Input type="date" />
              </Form.Item>
            </Form>
            {aiResult && (
              <div
                style={{
                  marginTop: 16,
                  padding: 10,
                  border: '1px solid #ccc',
                  borderRadius: 6,
                }}
              >
                <strong>AI Result:</strong>
                <pre style={{ whiteSpace: 'pre-wrap' }}>{aiResult}</pre>
              </div>
            )}
          </Modal>

          <Modal
            title="Export Symptoms to PDF"
            open={pdfModalOpen}
            onCancel={() => setPdfModalOpen(false)}
            onOk={() => pdfForm.submit()}
            okText="Download PDF"
            okButtonProps={{
              style: { backgroundColor: '#426b1f', borderColor: 'white' },
            }}
            style={{ top: 100 }}
          >
            <Form layout="vertical" form={pdfForm} onFinish={handleDownloadPDF}>
              <Form.Item
                name="child_id"
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
                name="period"
                label="Period"
                rules={[{ required: true }]}
              >
                <Select placeholder="Select a time period">
                  <Option value="3_months">Last 3 months</Option>
                  <Option value="6_months">Last 6 months</Option>
                  <Option value="1_year">Last 1 year</Option>
                  <Option value="custom">Custom</Option>
                </Select>
              </Form.Item>
              {period === 'custom' && (
                <>
                  <Form.Item
                    name="custom_start"
                    label="Custom Start Date"
                    rules={[
                      {
                        required: true,
                        message: 'Start date required for custom range',
                      },
                    ]}
                  >
                    <Input type="date" />
                  </Form.Item>
                  <Form.Item
                    name="custom_end"
                    label="Custom End Date"
                    rules={[
                      {
                        required: true,
                        message: 'End date required for custom range',
                      },
                    ]}
                  >
                    <Input type="date" />
                  </Form.Item>
                </>
              )}
            </Form>
          </Modal>

          <Drawer
            title={`Symptoms - ${selectedDate?.format('MMMM D, YYYY')}`}
            placement="right"
            onClose={() => setDrawerVisible(false)}
            open={drawerVisible}
            width={360}
          >
            <DrawerContainer>
              {drawerSymptoms.map((symptom) => (
                <div key={symptom.id} style={{ marginBottom: 16 }}>
                  <SymptomDrawerTitle>
                    <UserOutlined /> {symptom.symptom_name}
                  </SymptomDrawerTitle>
                  <ChildSymptom>
                    <SettingOutlined /> Child: {symptom.child_name}
                  </ChildSymptom>
                  <ChildSymptom>
                    <ClockCircleOutlined /> Created:{' '}
                    {dayjs(symptom.created_at).format('YYYY-MM-DD HH:mm')}
                  </ChildSymptom>
                  <ChildSymptom style={{ fontSize: '12px', color: '#888' }}>
                    Updated:{' '}
                    {dayjs(symptom.updated_at).format('YYYY-MM-DD HH:mm')}
                  </ChildSymptom>
                  <ChildSymptom>
                    ⚙️ Actions: {symptom.action_taken || '—'}
                  </ChildSymptom>
                  <SymptomAction>
                    <Button
                      icon={<EditOutlined />}
                      size="small"
                      onClick={() => {
                        openFormModal(symptom);
                        setDrawerVisible(false);
                      }}
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
                  </SymptomAction>
                </div>
              ))}
              <AddSymptomDrawerButton
                icon={<PlusOutlined />}
                onClick={() => {
                  setDrawerVisible(false);
                  openFormModal(undefined, selectedDate || dayjs());
                }}
              >
                Add Symptom
              </AddSymptomDrawerButton>
            </DrawerContainer>
          </Drawer>
        </SymptomContent>
        <Foot />
      </Layout>
    </SymptomLayout>
  );
};

export default SymptomTracker;
