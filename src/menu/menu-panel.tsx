import {
  CommentOutlined,
  DashboardOutlined,
  InfoCircleOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  QuestionCircleOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';
import React from 'react';
import {
  MenuContainer,
  StyledMenu,
  MenuHeader,
  ToggleButton,
  Logo,
} from './menu-panel.styled';
import img from '../assets/images/logo/main_logo.png';

const items = [
  {
    key: '/symptom-tracker',
    icon: <DashboardOutlined />,
    label: 'Symptom Tracker',
  },
  {
    key: '/discussion-forum',
    icon: <CommentOutlined />,
    label: 'Discussion Forum',
  },
  {
    key: '/info_hub',
    icon: <InfoCircleOutlined />,
    label: 'Information Hub',
  },
  {
    key: '/marketplace',
    icon: <ShoppingOutlined />,
    label: 'Marketplace',
  },
  {
    key: '/ikomek_assistant',
    icon: <QuestionCircleOutlined />,
    label: 'iKomek AI Assistant',
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
  const location = useLocation();
  const navigate = useNavigate();

  const handleMenuClick = (e: { key: string }) => {
    navigate(e.key);
  };

  return (
    <MenuContainer $collapsed={collapsed}>
      <MenuHeader>
        {!collapsed && (
          <Logo src={img} alt="Logo" onClick={() => navigate('/')} />
        )}
        <ToggleButton onClick={toggleCollapsed}>
          {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        </ToggleButton>
      </MenuHeader>
      <StyledMenu
        mode="inline"
        theme="light"
        selectedKeys={[location.pathname]}
        inlineCollapsed={collapsed}
        items={items}
        onClick={handleMenuClick}
      />
    </MenuContainer>
  );
};

export default MenuPanel;
