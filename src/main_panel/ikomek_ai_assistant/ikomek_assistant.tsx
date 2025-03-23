import React, { useState } from 'react';
import { Layout, Typography, Input, Button, List, Card } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import './ikomek_assistant.scss';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';

const { Title, Text } = Typography;
const { Header, Content } = Layout;
const { TextArea } = Input;

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

const IkomekAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [collapsed, setCollapsed] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage: Message = { text: input, sender: 'user' };

    setMessages([...messages, userMessage]);
    setInput('');

    // Simulating AI response (replace this with actual API call)
    setTimeout(() => {
      const botMessage: Message = {
        text: `I'm here to help! You asked: "${input}".`,
        sender: 'bot',
      };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 1000);
  };

  return (
    <Layout className="ikomek-layout">
      <MenuPanel collapsed={collapsed} toggleCollapsed={() => setCollapsed(!collapsed)}  selectedPage={'/ikomek_assistant'}/>
      <Layout style={{ marginLeft: collapsed ? 100 : 250, transition: 'margin-left 0.3s' }}>
        <Header
          style={{
            padding: 0,
            marginLeft: '5px',
            background: '#E2E3E0',
            height: '48px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Main_header />
        </Header>
        <Content className="ikomek-content">
          <Title className="ikomek-title">iKomek AI Assistant</Title>
          <Text className="ikomek-subtitle">Hi! How can I assist you today?</Text>

          {/* Chat Window */}
          <div className="chat-container">
            <List
              dataSource={messages}
              renderItem={(msg, index) => (
                <Card className={`chat-message ${msg.sender}`} key={index}>
                  <Text>{msg.text}</Text>
                </Card>
              )}
            />
          </div>

          {/* Message Input */}
          <div className="message-input-container">
            <TextArea
              className="message-input"
              placeholder="Message to iKomek"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onPressEnter={handleSendMessage}
            />
            <Button
              type="primary"
              icon={<SendOutlined />}
              className="send-button"
              onClick={handleSendMessage}
            />
          </div>
        </Content>
      </Layout>
    </Layout>
  );
};

export default IkomekAssistant;
