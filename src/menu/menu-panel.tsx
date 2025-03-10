import {
  CommentOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Button, Menu } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './menu_panel.scss';
import img from '../images/logo/main_logo.png';

type MenuItem = Required<MenuProps>['items'][number] & {
  path?: string;
};

const items: MenuItem[] = [
  {
    key: '1',
    icon: <DashboardOutlined />,
    label: 'Symptom Tracker',
    path: '/symptom-tracker',
  },
  {
    key: '2',
    icon: <CommentOutlined />,
    label: 'Discussion Forum',
    path: '/discussion-forum',
  },
  {
    key: '3',
    icon: <InfoCircleOutlined />,
    label: 'Information Hub',
    path: '/information-hub',
  },
  {
    key: '4',
    icon: <ShoppingOutlined />,
    label: 'Marketplace',
    path: '/marketplace',
  },
  {
    key: '5',
    icon: <QuestionCircleOutlined />,
    label: 'iKomek AI Assistant',
    path: '/ikomek-ai-assistant',
  },
];

interface MenuPanelProps {
  collapsed: boolean;
  toggleCollapsed: () => void;
}

const MenuPanel: React.FC<MenuPanelProps> = ({
  collapsed,
  toggleCollapsed,
}) => {
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    const selectedItem = items.find((item) => item.key === e.key);
    if (selectedItem?.path) {
      navigate(selectedItem.path);
    }
  };

  return (
    <div className={`menu-container ${collapsed ? 'collapsed' : ''}`}>
      <div className="menu-header">
        <img
          className="img"
          src={img}
          alt="Logo"
          style={{ display: collapsed ? 'none' : 'block' }}
        />
        <Button
          type="primary"
          onClick={toggleCollapsed}
          className="toggle-button"
        >
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </Button>
      </div>
      <Menu
        defaultSelectedKeys={['1']}
        mode="inline"
        theme="light"
        inlineCollapsed={collapsed}
        items={items}
        className="custom-menu"
        onClick={handleMenuClick}
      />
    </div>
  );
};

export default MenuPanel;
