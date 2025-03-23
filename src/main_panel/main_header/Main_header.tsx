import React, { useState } from 'react';
import { Dropdown, Button, Layout, Avatar } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import ProfilePage from '../profile/profile';
import './main_header.scss';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Main_header = () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: any) => {
    if (key === 'profile') {
      setIsProfileVisible(true);
      navigate('/profile')
    } else if (key === 'logout') {
      setIsProfileVisible(false);
      navigate('/');
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
      {isProfileVisible && <ProfilePage />}
    </Layout>
  );
};

export default Main_header;
