import React, { useState } from 'react';
import { Layout, Typography, Spin, Empty } from 'antd';
import { SendOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosBase from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import Foot from '../../main_page/main_content/footer/footer/footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
  AssistantLayout,
  AssistantHeader,
  AssistantContent,
  Sidebar,
  ChatHistoryList,
  ChatMainContent,
  MessageCard,
  MessageInputArea,
  MessageInput,
  NewChatButton,
  SendButton,
  HistoryItem,
  HistoryTitle,
} from './ikomek.styled';

const { Header } = Layout;
const { Title, Text } = Typography;

const axios = axiosBase.create({
  baseURL: 'https://project-back-81mh.onrender.com',
  headers: {
    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
  },
});

axios.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('accessToken')}`;
  return config;
});

interface Message {
  text: string;
  sender: 'user' | 'bot';
}

interface Session {
  id: string;
  title: string;
  created_at: string;
  messages: {
    id: number;
    sender: 'user' | 'assistant';
    content: string;
    timestamp: string;
  }[];
}

const IkomekAssistant = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);
  const queryClient = useQueryClient();

  const { data: sessionsData = [], isLoading: sessionsLoading } = useQuery<
    Session[]
  >({
    queryKey: ['sessions'],
    queryFn: async () => (await axios.get('/api/komekai/sessions/')).data,
  });

  const createSession = useMutation({
    mutationFn: () => axios.post('/api/komekai/sessions/', {}),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setActiveSessionId(res.data.id);
      setMessages([]);
    },
  });

  const sendMessage = useMutation({
    mutationFn: async ({
      sessionId,
      message,
    }: {
      sessionId: string;
      message: string;
    }) => {
      const res = await axios.post(
        `/api/komekai/sessions/${sessionId}/message/`,
        { message }
      );
      return res.data;
    },
    onSuccess: (res) => {
      setMessages((prev) => [
        ...prev,
        { text: input, sender: 'user' },
        { text: res.reply, sender: 'bot' },
      ]);
      setInput('');
    },
  });

  const handleSendMessage = () => {
    if (!input.trim() || !activeSessionId) return;
    sendMessage.mutate({ sessionId: activeSessionId, message: input });
  };

  const handleSelectChat = (sessionId: string) => {
    const selectedSession = sessionsData.find((s) => s.id === sessionId);
    setActiveSessionId(sessionId);
    const parsedMessages: Message[] =
      selectedSession?.messages.map((m) => ({
        text: m.content,
        sender: m.sender === 'assistant' ? 'bot' : 'user',
      })) || [];
    setMessages(parsedMessages);
  };

  return (
    <AssistantLayout>
      <MenuPanel
        collapsed={collapsed}
        toggleCollapsed={() => setCollapsed(!collapsed)}
      />
      <Layout
        style={{
          marginLeft: collapsed ? 100 : 250,
          transition: 'margin-left 0.3s',
        }}
      >
        <Header style={{ padding: 0, background: '#E2E3E0', height: '48px' }}>
          <Main_header />
        </Header>

        <AssistantContent>
          <Sidebar>
            <HistoryTitle>Chats</HistoryTitle>
            <NewChatButton
              icon={<PlusOutlined />}
              onClick={() => createSession.mutate()}
            >
              New Chat
            </NewChatButton>
            {sessionsLoading ? (
              <Spin style={{ marginTop: 20 }} />
            ) : (
              <ChatHistoryList>
                {sessionsData.length === 0 ? (
                  <Empty description="No chats yet" />
                ) : (
                  sessionsData.map((session) => (
                    <HistoryItem
                      key={session.id}
                      isActive={session.id === activeSessionId}
                      onClick={() => handleSelectChat(session.id)}
                    >
                      {session.title || 'New Chat'}
                    </HistoryItem>
                  ))
                )}
              </ChatHistoryList>
            )}
          </Sidebar>

          <ChatMainContent>
            <AssistantHeader>
              <Title
                level={3}
                style={{ color: '#591C00', fontFamily: 'Newsreader, serif' }}
              >
                iKomek AI Assistant
              </Title>
              <Text style={{ color: '#555', fontFamily: 'Newsreader, serif' }}>
                Hi! How can I assist you today?
              </Text>
            </AssistantHeader>

            <div className="chat-area">
              {messages.length === 0 ? (
                <Empty description="Start a new chat to begin" />
              ) : (
                messages.map((msg, idx) => (
                  <MessageCard key={idx} sender={msg.sender}>
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>
                      {msg.text}
                    </ReactMarkdown>
                  </MessageCard>
                ))
              )}
            </div>

            <MessageInputArea>
              <MessageInput
                placeholder="Message to iKomek"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                disabled={!activeSessionId}
                onPressEnter={(e) => {
                  e.preventDefault();
                  handleSendMessage();
                }}
              />
              <SendButton
                type="primary"
                icon={<SendOutlined />}
                onClick={handleSendMessage}
                disabled={!activeSessionId || input.trim() === ''}
              >
                Send
              </SendButton>
            </MessageInputArea>
          </ChatMainContent>
        </AssistantContent>
        <Foot />
      </Layout>
    </AssistantLayout>
  );
};

export default IkomekAssistant;
