import React, { useState } from 'react';
import { Dropdown, Button, Layout, Avatar, message } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './main_header.scss';

const { Header } = Layout;

const Main_header = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (!refreshToken || !accessToken) {
      message.warning('You are already logged out.');
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
      message.success('Logged out successfully!');
      navigate('/login');
    } catch (error: any) {
      console.error(error);
      message.error(
        error.response?.data?.detail || 'Failed to log out. Try again.'
      );
    }
  };

  const handleMenuClick = ({ key }: any) => {
    if (key === 'profile') {
      setIsProfileVisible(true);
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
      <Header className="main-header">
        <div className="header-right">
          <Dropdown
            menu={{ items, onClick: handleMenuClick }}
            trigger={['click']}
          >
            <Button type="text" className="profile-dropdown">
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{
                  marginRight: 8,
                  color: '#591C00',
                  backgroundColor: '#E2E3E0',
                }}
              >
                ZZ
              </Avatar>
            </Button>
          </Dropdown>
        </div>
      </Header>
    </Layout>
  );
};

export default Main_header;
