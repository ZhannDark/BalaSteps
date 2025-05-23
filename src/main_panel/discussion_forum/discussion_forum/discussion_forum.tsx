import React, { useEffect, useState } from 'react';
import {
  Layout,
  Modal,
  Form,
  List,
  Skeleton,
  Typography,
  Select,
  Input,
  notification,
} from 'antd';
import { SearchOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import axiosInstance from '../../axios-instance';

import {
  ForumLayout,
  ForumControls,
  ForumContent,
  SectionTitle,
  SearchBar,
  FilterDropdown,
  NewThreadButton,
  ThreadCard,
  ThreadTopic,
  ThreadMeta,
  ThreadContent as ThreadText,
} from './discussion-forum.styled';
import MenuPanel from '../../../menu/menu-panel';
import Main_header from '../../main_header/Main_header';
import TextArea from 'antd/lib/input/TextArea';
import Foot from '../../../main_page/main_content/footer/footer/footer';

const { Header } = Layout;
const { Title } = Typography;
const { Option } = FilterDropdown;

interface Thread {
  id: string;
  title: string;
  user: string;
  createdAt: string;
  content: string;
  category: string;
}

const DiscussionForum: React.FC = () => {
  const [threads, setThreads] = useState<Thread[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState<{ id: string; name: string }[]>(
    []
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await axiosInstance.get('/forum/categories/');
        setCategories(res.data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchThreads = async () => {
      try {
        const response = await axiosInstance.get('/forum/posts/');

        const formatted = response.data.map((post: Thread) => ({
          id: post.id,
          title: post.title,
          user: post.user,
          createdAt: dayjs(post.createdAt).format('MMMM D, YYYY'),
          content: post.content,
          category: post.category,
        }));

        setThreads(formatted);
      } catch {
        notification.error({
          message: 'Load Failed',
          description:
            'Failed to load discussion posts. Please try again later.',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchThreads();
  }, []);

  const handleCreateThread = async (values: {
    title: string;
    content: string;
    topic: string;
  }) => {
    try {
      const payload = {
        title: values.title,
        content: values.content,
        category: values.topic,
      };

      const response = await axiosInstance.post('/forum/posts/', payload);

      const newThread = {
        id: response.data.id,
        title: response.data.title,
        user: response.data.user,
        createdAt: dayjs(response.data.created_at).format('MMMM D, YYYY'),
        content: response.data.content,
        category: response.data.category,
      };

      setThreads((prev) => [newThread, ...prev]);
      setIsModalOpen(false);
      form.resetFields();
      notification.success({
        message: 'Thread Created',
        description: 'Your discussion thread has been successfully created.',
      });
    } catch {
      notification.error({
        message: 'Creation Failed',
        description: 'Unable to create the thread. Please try again.',
      });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const handleTopicFilter = (value: unknown) => {
    if (typeof value === 'string' || value === null) {
      setSelectedTopic(value);
    }
  };

  const filteredThreads = threads.filter(
    (thread) =>
      thread.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (!selectedTopic || thread.category === selectedTopic)
  );

  return (
    <ForumLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
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
        <ForumContent>
          <ForumControls>
            <SectionTitle>Discussion Forum</SectionTitle>
            <SearchBar
              placeholder="Search discussions..."
              prefix={<SearchOutlined />}
              value={searchTerm}
              onChange={handleSearch}
            />
            <FilterDropdown
              placeholder="Filter by topic"
              className="filter-dropdown"
              allowClear
              onChange={handleTopicFilter}
            >
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </FilterDropdown>
            <NewThreadButton
              icon={<PlusOutlined />}
              onClick={() => setIsModalOpen(true)}
            >
              New Thread
            </NewThreadButton>
          </ForumControls>

          {loading ? (
            <div style={{ padding: '20px' }}>
              {[1, 2, 3].map((n) => (
                <Skeleton key={n} active title paragraph={{ rows: 3 }} />
              ))}
            </div>
          ) : (
            <List
              itemLayout="vertical"
              dataSource={filteredThreads}
              renderItem={(thread) => (
                <ThreadCard
                  key={thread.id}
                  hoverable
                  onClick={() =>
                    navigate(`/discussion-forum/${thread.id}`, {
                      state: { thread },
                    })
                  }
                >
                  <ThreadTopic>{thread.category}</ThreadTopic>
                  <Title level={4}>{thread.title}</Title>
                  <ThreadMeta>
                    By {thread.user} - {thread.createdAt}
                  </ThreadMeta>
                  <ThreadText>{thread.content}</ThreadText>
                </ThreadCard>
              )}
            />
          )}
        </ForumContent>
        <Foot />
      </Layout>

      <Modal
        title="Create New Thread"
        open={isModalOpen}
        onCancel={() => {
          setIsModalOpen(false);
          form.resetFields();
        }}
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
              {categories.map((cat) => (
                <Option key={cat.id} value={cat.name}>
                  {cat.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="Content"
            name="content"
            rules={[
              {
                required: true,
                message: 'Please enter the discussion content',
              },
            ]}
          >
            <TextArea rows={4} placeholder="Enter your discussion..." />
          </Form.Item>
          <Form.Item>
            <NewThreadButton htmlType="submit">Create</NewThreadButton>
          </Form.Item>
        </Form>
      </Modal>
    </ForumLayout>
  );
};

export default DiscussionForum;
