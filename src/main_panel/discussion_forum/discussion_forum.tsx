import React, { useState } from 'react';
import { Layout, Menu, Table, Input, Button, Typography } from 'antd';
import {
  HomeOutlined,
  CommentOutlined,
  InfoCircleOutlined,
  ShoppingOutlined,
  RobotOutlined,
  UserOutlined,
  BellOutlined,
  LogoutOutlined,
  PlusOutlined,
  SearchOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import './discussion_forum.scss';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const DiscussionForum: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = (key: string) => {
    if (key === '1') navigate('/symptom-tracker');
    if (key === '2') navigate('/discussion-forum');
    if (key === '3') navigate('/information-hub');
    if (key === '4') navigate('/marketplace');
    if (key === '5') navigate('/ikomek-ai-assistant');
    if (key === '6') navigate('/profile');
  };

  const columns = [
    {
      title: 'User',
      dataIndex: 'user',
      key: 'user',
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Content',
      dataIndex: 'content',
      key: 'content',
    },
    {
      title: 'Created Date',
      dataIndex: 'date',
      key: 'date',
    },
  ];

  const data = [
    { key: 1, user: 'User1', title: 'Title1', content: 'Content1', date: '23.02.2025' },
    { key: 2, user: 'User2', title: 'Title2', content: 'Content2', date: '22.02.2025' },
    { key: 3, user: 'User3', title: 'Title3', content: 'Content3', date: '21.02.2025' },
    { key: 4, user: 'User4', title: 'Title4', content: 'Content4', date: '20.02.2025' },
    { key: 5, user: 'User5', title: 'Title5', content: 'Content5', date: '19.02.2025' },
  ];

  return (
    <Layout className="discussion-forum">
      <Sider className="sidebar" collapsible collapsed={collapsed} onCollapse={setCollapsed} theme="light">
        <div className="logo">Balasteps</div>
        <Menu defaultSelectedKeys={['2']} mode="vertical" className="menu" onClick={(e) => handleMenuClick(e.key)}>
          <Menu.Item key="1" icon={<HomeOutlined />}>Symptom Tracker</Menu.Item>
          <Menu.Item key="2" icon={<CommentOutlined />}>Discussion Forum</Menu.Item>
          <Menu.Item key="3" icon={<InfoCircleOutlined />}>Information Hub</Menu.Item>
          <Menu.Item key="4" icon={<ShoppingOutlined />}>Marketplace</Menu.Item>
          <Menu.Item key="5" icon={<RobotOutlined />}>iKomek AI Assistant</Menu.Item>
          <Menu.Item key="6" icon={<UserOutlined />}>Profile</Menu.Item>
        </Menu>
      </Sider>
      <Layout className="main-layout">
        <Header className="header">
          <Title level={3} className="header-title">Discussion Forum</Title>
          <div className="header-actions">
            <Input placeholder="Search for topics, keywords" prefix={<SearchOutlined />} className="search-bar" />
            <Button type="primary" icon={<PlusOutlined />} className="create-button">Create</Button>
            <Button icon={<BellOutlined />} type="text" />
            <Button icon={<UserOutlined />} type="text" />
            <Button icon={<LogoutOutlined />} type="text" className="logout-button">Log out</Button>
          </div>
        </Header>
        <Content className="content">
          <Table columns={columns} dataSource={data} pagination={false} className="discussion-table" />
        </Content>
      </Layout>
    </Layout>
  );
};

export default DiscussionForum;