import React, { useEffect, useState } from 'react';
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
  message,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './discussion_forum.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import dayjs from 'dayjs';
import axios from 'axios';
import { Skeleton } from 'antd';

const { Title } = Typography;
const { Header, Content } = Layout;
const { Option } = Select;

interface Thread {
  id: string;
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

const DiscussionForum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axios.get(
          'https://project-back-81mh.onrender.com/forum/posts/',
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const formatted = response.data.map((post: any) => ({
          id: post.id,
          title: post.title,
          author: post.user || 'Unknown',
          createdAt: dayjs(post.created_at).format('MMMM D, YYYY'),
          content: post.content,
          topic: post.categories[0]?.name || 'General',
        }));

        setThreads(formatted);
      } catch (error) {
        console.error('Failed to fetch threads:', error);
        message.error('Failed to load discussion posts.');
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  // POST new thread
  const handleCreateThread = async (values: { title: string; content: string; topic: string }) => {
    try {
      const payload = {
        title: values.title,
        content: values.content,
        categories: [{ name: values.topic }],
      };

      const response = await axios.post(
        'https://project-back-81mh.onrender.com/forum/posts/',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const newThread = {
        id: response.data.id,
        title: response.data.title,
        author: response.data.user || 'You',
        createdAt: dayjs(response.data.created_at).format('MMMM D, YYYY'),
        content: response.data.content,
        topic: response.data.categories[0]?.name || 'General',
      };

      setThreads((prev) => [newThread, ...prev]);
      setIsModalOpen(false);
      form.resetFields();
      message.success('Thread created successfully!');
    } catch (error) {
      console.error('Failed to create thread:', error);
      message.error('Failed to create thread.');
    }
  };

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
      <MenuPanel collapsed={collapsed} toggleCollapsed={toggleCollapsed} selectedPage="/discussion-forum" />
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
            <Button className="new-thread" type="default" icon={<PlusOutlined />} onClick={showModal}>
              New Thread
            </Button>
          </div>
          {loading ? (
            <div style={{ padding: '20px' }}>
              {[1, 2, 3].map((n) => (
                <Card key={n} style={{ marginBottom: 16 }}>
                  <Skeleton active title paragraph={{ rows: 3 }} />
                </Card>
              ))}
            </div>
          ) : (
            <List
              itemLayout="vertical"
              dataSource={filteredThreads}
              renderItem={(thread) => (
                <Card
                  key={thread.id}
                  className="thread-card"
                  hoverable
                  onClick={() => navigate(`/discussion-forum/${thread.id}`, { state: { thread } })}
                >
                  <div className="thread-topic">{thread.topic}</div>
                  <Title level={4}>{thread.title}</Title>
                  <p className="thread-meta">By {thread.author} - {thread.createdAt}</p>
                  <p className="thread-content">{thread.content}</p>
                </Card>
              )}
            />
          )}

        </Content>
      </Layout>

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
            <Button className="new-thread" htmlType="submit">
              Create
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default DiscussionForum;
