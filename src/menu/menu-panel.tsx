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
import React, { useEffect, useState } from 'react';
import {
  MenuContainer,
  StyledMenu,
  MenuHeader,
  ToggleButton,
  Logo,
} from './menu-panel.styled';
import img from '../assets/images/logo/main_logo.png';
import { Button, Modal } from 'antd';

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
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('accessToken')
  );

  const protectedRoutes = [
    '/symptom-tracker',
    '/discussion-forum',
    '/marketplace',
    '/ikomek_assistant',
    '/profile',
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setIsAuthenticated(!!localStorage.getItem('accessToken'));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const handleMenuClick = (e: { key: string }) => {
    if (!isAuthenticated && protectedRoutes.includes(e.key)) {
      setShowAuthModal(true);
      return;
    }
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

      <Modal
        title="Login Required"
        open={showAuthModal}
        onCancel={() => setShowAuthModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowAuthModal(false)}>
            Cancel
          </Button>,
          <Button
            key="login"
            type="primary"
            onClick={() => {
              navigate(`/login`);
              setShowAuthModal(false);
            }}
          >
            Go to Login
          </Button>,
        ]}
      >
        <p>You need to be logged in to access this section.</p>
      </Modal>
    </MenuContainer>
  );
};

export default MenuPanel;
