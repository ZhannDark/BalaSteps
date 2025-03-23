import React, { useState } from 'react';
import {
  Layout,
  Typography,
  Input,
  Button,
  Card,
  List,
  Modal,
  Form,
  Select,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom'; // ✅ Import navigation
import './discussion_forum.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import dayjs from 'dayjs';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;

interface Thread {
  id: number;
  title: string;
  author: string;
  createdAt: string;
  content: string;
  topic: string;
}

const topics = [
  "Child's Condition & Diagnosis",
  'Therapy & Treatment',
  'Education & Learning Support',
  'Parenting & Daily Life',
  'Community & Socialization',
  'Legal & Financial Assistance',
  'Technology & Accessibility',
];

const initialThreads: Thread[] = [
  {
    id: 1,
    title: 'How to find the best therapy centers?',
    author: 'John Doe',
    createdAt: 'March 18, 2025',
    content: 'Looking for recommendations on therapy centers for my child in Almaty. Any suggestions?',
    topic: 'Therapy & Treatment',
  },
  {
    id: 2,
    title: 'Best speech therapy exercises at home',
    author: 'Jane Smith',
    createdAt: 'March 17, 2025',
    content: 'Has anyone tried speech therapy exercises at home? Looking for effective techniques!',
    topic: 'Education & Learning Support',
  },
];

const DiscussionForum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>(initialThreads);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate(); // ✅ Use navigation

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTopicFilter = (value: string | null) => {
    setSelectedTopic(value);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  const handleCreateThread = (values: { title: string; content: string; topic: string }) => {
    const newThread: Thread = {
      id: threads.length + 1,
      title: values.title,
      author: 'Current User',
      createdAt: dayjs().format('MMMM D, YYYY'),
      content: values.content,
      topic: values.topic,
    };
    setThreads([newThread, ...threads]);
    setIsModalOpen(false);
    form.resetFields();
  };

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedTopic || thread.topic === selectedTopic)
  );

  return (
    <Layout className="forum-layout">
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed}  selectedPage={'/discussion-forum'}/>
      <Layout style={{ marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s ease' }}>
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
        <Content className="forum-content">
          <div className="forum-controls">
            <h1 className="section-title">Discussion Forum</h1>
            <Input
              placeholder="Search discussions..."
              prefix={<SearchOutlined />}
              className="search-bar"
              value={searchTerm}
              onChange={handleSearch}
            />
            <Select
              placeholder="Filter by topic"
              className="filter-dropdown"
              allowClear
              onChange={handleTopicFilter}
            >
              {topics.map((topic) => (
                <Option key={topic} value={topic}>
                  {topic}
                </Option>
              ))}
            </Select>
            <Button type="default" icon={<PlusOutlined />} onClick={showModal}>
              New Thread
            </Button>
          </div>
          <List
            itemLayout="vertical"
            dataSource={filteredThreads}
            renderItem={(thread) => (
              <Card
                key={thread.id}
                className="thread-card"
                hoverable
                onClick={() => navigate(`/discussion-forum/${thread.id}`, { state: { thread } })} // ✅ Navigate on click
              >
                <div className="thread-topic">{thread.topic}</div>
                <Title level={4}>{thread.title}</Title>
                <p className="thread-meta">By {thread.author} - {thread.createdAt}</p>
                <p className="thread-content">{thread.content}</p>
              </Card>
            )}
          />
        </Content>
      </Layout>

      {/* Modal for Creating New Discussion */}
      <Modal
        title="Create New Thread"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={null}
      >
        <Form form={form} layout="vertical" onFinish={handleCreateThread}>
          <Form.Item
            label="Thread Title"
            name="title"
            rules={[{ required: true, message: 'Please enter a thread title' }]}
          >
            <Input placeholder="Enter title..." />
          </Form.Item>
          <Form.Item
            label="Topic"
            name="topic"
            rules={[{ required: true, message: 'Please select a topic' }]}
          >
            <Select placeholder="Select a topic">
              {topics.map((topic) => (
                <Option key={topic} value={topic}>
                  {topic}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[{ required: true, message: 'Please enter the discussion content' }]}
          >
            <Input.TextArea rows={4} placeholder="Enter your discussion..." />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default DiscussionForum;
