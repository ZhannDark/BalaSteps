import React, { useState } from 'react';
import { Menu, Dropdown, Button, Layout, Avatar } from 'antd';
import {
  UserOutlined,
  LogoutOutlined,
  ProfileOutlined,
} from '@ant-design/icons';
import ProfilePage from '../profile/profile';
import './main_header.scss';
import { useNavigate } from 'react-router-dom';

const { Header } = Layout;

const Main_header= () => {
  const [isProfileVisible, setIsProfileVisible] = useState(false);
  const navigate = useNavigate();

  const handleMenuClick = ({ key }: any) => {
    if (key === 'profile') {
      setIsProfileVisible(true);
    } else if (key === 'logout') {
      setIsProfileVisible(false);
      console.log('Logged out');
    }
  };

  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="profile" icon={<ProfileOutlined />}>
        Profile
      </Menu.Item>
      <Menu.Item
        key="logout"
        icon={<LogoutOutlined />}
        onClick={() => navigate('/')}
      >
        Log Out
      </Menu.Item>
    </Menu>
  );

  return (
    <Layout style={{ backgroundColor: '#E2E3E0' }}>
      <Header className="main-header">
        <div className="header-right">
          <Dropdown overlay={menu} trigger={['click']}>
            <Button type="text" className="profile-dropdown">
              <Avatar
                size="default"
                icon={<UserOutlined />}
                style={{
                  marginRight: 8,
                  color: '#591C00',
                  backgroundColor: '#E2E3E0',
                }}
              />
            </Button>
          </Dropdown>
        </div>
      </Header>
      {isProfileVisible && <ProfilePage />}
    </Layout>
  );
};

export default Main_header;