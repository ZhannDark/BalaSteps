import React from 'react';
import { Dropdown, Layout, Avatar, notification } from 'antd';
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

const Main_header: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (!refreshToken || !accessToken) {
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
            Authorization: `Bearer ${accessToken}`,
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
      navigate('/login');
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
      navigate('/profile');
    } else if (key === 'logout') {
      handleLogout();
    }
  };

  const items = [
    {
      key: 'profile',
      icon: <ProfileOutlined />,
      label: 'Profile',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: 'Log Out',
    },
  ];

  return (
    <Layout style={{ backgroundColor: '#E2E3E0' }}>
      <StyledHeader>
        <HeaderRight>
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
        </HeaderRight>
      </StyledHeader>
    </Layout>
  );
};

export default Main_header;
