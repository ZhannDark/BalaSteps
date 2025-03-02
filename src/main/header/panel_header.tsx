import { Button, Popover } from 'antd';
import { BellOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './panel_header.scss';
import { Layout } from 'antd';

const { Header } = Layout;

const UserProfile = () => {
  const navigate = useNavigate();

  const content = (
    <div className="header_">
      <Button
        type="text"
        className="user_name"
        onClick={() => navigate('/profile')}
      >
        Palensheeva Palenshe
      </Button>
      <Button
        icon={<LogoutOutlined />}
        type="text"
        className="logout-button"
        onClick={() => {
          localStorage.removeItem('token');
          navigate('/');
        }}
      >
        Log out
      </Button>
    </div>
  );

  return (
    <Header className="header">
      <div className="logo-container">
        <BellOutlined className="notification" />
        <Popover content={content} trigger="click" placement="bottomRight">
          <Button icon={<UserOutlined />} type="text" />
        </Popover>
      </div>
    </Header>
  );
};

export default UserProfile;
