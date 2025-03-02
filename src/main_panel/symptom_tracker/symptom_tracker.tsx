import React, { useState } from 'react';
import { Layout, Menu, Button, Card, Typography, Popover } from 'antd';
import {
  PlusOutlined,
  UserOutlined,
  BellOutlined,
} from '@ant-design/icons';
import './symptom_tracker.scss';
import MenuPanel from '../../menu/menu-panel';
import UserProfile from '../profile/profile';

const { Header, Content } = Layout;
const { Title, Text } = Typography;

const SymptomTracker: React.FC = () => {
  const [symptoms, setSymptoms] = useState([
    { id: 1, name: 'Symptom 1', actions: 'Actions/therapies for the symptom 1' },
    { id: 2, name: 'Symptom 1', actions: 'Actions/therapies for the symptom 1' },
  ]);

  const addSymptom = () => {
    const newSymptom = { id: symptoms.length + 1, name: 'New Symptom', actions: 'Description here' };
    setSymptoms([...symptoms, newSymptom]);
  };

  return (
    <Layout className="symptom-tracker">
      {/*<MenuPanel />*/}
      <Layout className="main-layout">
        <Header className="header">
          <Title level={3} className="header-title">Symptom Tracker</Title>
          <div className="header-icons">
            <Button icon={<BellOutlined />} type="text" />
            <UserProfile />
          </div>
        </Header>
        <Content className="content">
          <Button type="primary" icon={<PlusOutlined />} onClick={addSymptom} className="add-button">
            Add Symptom
          </Button>
          {symptoms.map((symptom) => (
            <Card key={symptom.id} className="symptom-card">
              <Title level={4}>{symptom.name}</Title>
              <Text>{symptom.actions}</Text>
            </Card>
          ))}
        </Content>
      </Layout>
    </Layout>
  );
};

export default SymptomTracker;
