import React, { useState } from 'react';
import {
  UserOutlined,
  DashboardOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  CommentOutlined,
  InfoCircleOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { MenuProps, Typography } from 'antd';
import { Button, Menu } from 'antd';
import './menu_panel.scss';
import logo from '../images/logo/panel_logo.png';

const { Title } = Typography;

type MenuItem = Required<MenuProps>['items'][number];

const items: MenuItem[] = [
  { key: '1', icon: <DashboardOutlined />, label: 'Symptom Tracker' },
  { key: '2', icon: <CommentOutlined />, label: 'Discussion Forum' },
  { key: '3', icon: <InfoCircleOutlined />, label: 'Information Hub' },
  { key: '4', icon: <ShoppingOutlined />, label: 'Marketplace' },
  { key: '5', icon: <QuestionCircleOutlined />, label: 'iKomek AI Assistant' },
  { key: '6', icon: <UserOutlined />, label: 'Profile' },
];

const App: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`menu_container ${collapsed ? 'collapsed' : ''}`}>
      <div className="logo-section">
        <img src={logo} alt="Balasteps" className="menu-logo" />
        {!collapsed && <Title level={3} className="menu-title">Balasteps</Title>}
      </div>
      <div className="menu_panel">
        <Menu
          defaultSelectedKeys={['1']}
          mode="inline"
          theme="light"
          inlineCollapsed={collapsed}
          items={items}
          className={`custom-menu ${collapsed ? 'collapsed-menu' : ''}`}
        />

        <Button
          type="primary"
          onClick={toggleCollapsed}
          className="toggle-button"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
    </div>
  );
};

export default App;
