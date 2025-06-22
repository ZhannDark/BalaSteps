import React, { useState } from 'react';
import { Dropdown, Layout, Avatar, notification, Button, Modal } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  StyledHeader,
  HeaderRight,
  ProfileDropdownButton,
} from './main-header.styled';
import { useQueryClient } from '@tanstack/react-query';
import { useAuth } from '../../hooks/useAuth';

const Main_header: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const token = localStorage.getItem('accessToken');
  const isAuthenticated = useAuth();

  const [showLoginModal, setShowLoginModal] = useState(false);

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken || !token) {
      notification.warning({
        message: 'Already Logged Out',
        description: 'You are already logged out.',
      });
      return;
    }

    try {
      await axios.post(
        'https://project-back-81mh.onrender.com/auth/logout/',
        { refresh: refreshToken },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      queryClient.clear();

      notification.success({
        message: 'Logged Out',
        description: 'You have been logged out successfully.',
      });
      navigate('/');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        notification.error({
          message: 'Logout Failed',
          description:
            error.response?.data?.detail ||
            'Failed to log out. Please try again.',
        });
      } else {
        notification.error({
          message: 'Unexpected Error',
          description: 'Something went wrong. Please try again.',
        });
      }
    }
  };

  const handleMenuClick = ({ key }: { key: string }) => {
    if (key === 'profile') {
      if (!isAuthenticated) {
        setShowLoginModal(true);
      } else {
        navigate('/profile');
      }
    } else if (key === 'logout') {
      handleLogout();
    }
  };

  const items = isAuthenticated
    ? [
        { key: 'profile', icon: <ProfileOutlined />, label: 'Profile' },
        { key: 'logout', icon: <LogoutOutlined />, label: 'Log Out' },
      ]
    : [];

  return (
    <Layout style={{ backgroundColor: '#E2E3E0' }}>
      <StyledHeader>
        <HeaderRight>
          {isAuthenticated && (
            <Dropdown
              menu={{ items, onClick: handleMenuClick }}
              trigger={['click']}
            >
              <ProfileDropdownButton type="text">
                <Avatar
                  size="default"
                  icon={<UserOutlined />}
                  style={{
                    color: '#591C00',
                    backgroundColor: '#E2E3E0',
                  }}
                />
              </ProfileDropdownButton>
            </Dropdown>
          )}
        </HeaderRight>
      </StyledHeader>

      <Modal
        title="Login Required"
        open={showLoginModal}
        onCancel={() => setShowLoginModal(false)}
        footer={[
          <Button key="cancel" onClick={() => setShowLoginModal(false)}>
            Cancel
          </Button>,
          <Button
            key="login"
            type="primary"
            onClick={() => {
              navigate('/login?next=/profile');
              setShowLoginModal(false);
            }}
          >
            Go to Login
          </Button>,
        ]}
      >
        <p>You must be logged in to access your profile.</p>
      </Modal>
    </Layout>
  );
};

export default Main_header;
