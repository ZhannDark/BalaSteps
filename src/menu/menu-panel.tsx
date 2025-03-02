import { Layout, Menu, Typography } from 'antd';
import {
  CommentOutlined,
  HomeOutlined,
  InfoCircleOutlined,
  RobotOutlined,
  ShoppingOutlined,
  UserOutlined,
} from '@ant-design/icons';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const MenuPanel = () => {
  const navigate = useNavigate();
  const { Sider } = Layout;
  const [collapsed, setCollapsed] = useState(false);

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === '1') navigate('/symptom-tracker');
    if (key === '2') navigate('/discussion-forum');
    if (key === '3') navigate('/information-hub');
    if (key === '4') navigate('/marketplace');
    if (key === '5') navigate('/ikomek-ai-assistant');
    if (key === '6') navigate('/profile');
  };

  return (
    <Sider
      className="sidebar"
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div className="logo">Balasteps</div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="vertical"
        className="menu"
        onClick={handleMenuClick}
      >
        <Menu.Item key="1" icon={<HomeOutlined />}>
          Symptom Tracker
        </Menu.Item>
        <Menu.Item key="2" icon={<CommentOutlined />}>
          Discussion Forum
        </Menu.Item>
        <Menu.Item key="3" icon={<InfoCircleOutlined />}>
          Information Hub
        </Menu.Item>
        <Menu.Item key="4" icon={<ShoppingOutlined />}>
          Marketplace
        </Menu.Item>
        <Menu.Item key="5" icon={<RobotOutlined />}>
          iKomek AI Assistant
        </Menu.Item>
        <Menu.Item key="6" icon={<UserOutlined />}>
          Profile
        </Menu.Item>
      </Menu>
    </Sider>
  );
};

export default MenuPanel;
