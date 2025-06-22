import React, { useEffect, useState } from 'react';
import {
  Layout,
  Typography,
  Spin,
  Empty,
  Button,
  Drawer,
  Tooltip,
  Input,
} from 'antd';
import {
  SendOutlined,
  PlusOutlined,
  DeleteOutlined,
  HistoryOutlined,
} from '@ant-design/icons';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axiosBase from 'axios';
import MenuPanel from '../../menu/menu-panel';
import Main_header from '../main_header/Main_header';
import Foot from '../../main_page/main_content/footer/footer/footer';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import dayjs from 'dayjs';
import groupBy from 'lodash.groupby';
import {
  AssistantLayout,
  AssistantHeader,
  AssistantContent,
  ChatHistoryList,
  ChatMainContent,
  MessageCard,
  MessageInputArea,
  MessageInput,
  SendButton,
  HistoryItem,
  HistoryItemWrapper,
  DeleteIcon,
  IconRow,
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
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleCount, setVisibleCount] = useState(10);
  const queryClient = useQueryClient();
  const { Search } = Input;

  const { data: sessionsData = [], isLoading: sessionsLoading } = useQuery<
    Session[]
  >({
    queryKey: ['sessions'],
    queryFn: async () => (await axios.get('/komekai/sessions/')).data,
  });

  const filteredSessions = sessionsData.filter((session) =>
    (session.title || 'New Chat')
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  const visibleSessions = filteredSessions.slice(0, visibleCount);

  const groupedSessions: Record<string, Session[]> = groupBy(
    visibleSessions,
    (s) => dayjs(s.created_at).format('YYYY-MM-DD')
  );

  const createSession = useMutation({
    mutationFn: () => axios.post('/komekai/sessions/', {}),
    onSuccess: (res) => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setActiveSessionId(res.data.id);
      setMessages([]);
    },
  });

  useEffect(() => {
    if (sessionsData.length > 0 && !activeSessionId) {
      createSession.mutate();
    }
  }, [sessionsData]);

  const deleteSession = useMutation({
    mutationFn: (sessionId: string) =>
      axios.delete(`/komekai/sessions/${sessionId}/delete/`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['sessions'] });
      setActiveSessionId(null);
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
      setIsTyping(true);
      const res = await axios.post(`/komekai/sessions/${sessionId}/message/`, {
        message,
      });
      return res.data;
    },
    onSuccess: (res) => {
      setMessages((prev) => [...prev, { text: res.reply, sender: 'bot' }]);
      setIsTyping(false);
    },
    onError: () => {
      setIsTyping(false);
    },
  });

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, sender: 'user' as const };

    if (!activeSessionId) {
      const res = await createSession.mutateAsync();
      const sessionId = res.data.id;
      setActiveSessionId(sessionId);
      setMessages([userMessage]);
      sendMessage.mutate({ sessionId, message: input });
      setInput('');
      return;
    }

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
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
    setDrawerOpen(false);
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

        <AssistantContent>
          <IconRow>
            <Tooltip title="New Chat">
              <Button
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => createSession.mutate()}
              />
            </Tooltip>
            <Tooltip title="Chat History">
              <Button
                shape="circle"
                icon={<HistoryOutlined />}
                onClick={() => setDrawerOpen(true)}
              />
            </Tooltip>
          </IconRow>

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
              {isTyping && (
                <MessageCard sender="bot">
                  <i>Typing...</i>
                </MessageCard>
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

      <Drawer
        title="Chat History"
        placement="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        width={320}
      >
        <Search
          placeholder="Search chats"
          allowClear
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setVisibleCount(20);
          }}
          style={{ marginBottom: 12 }}
        />

        {sessionsLoading ? (
          <Spin />
        ) : (
          <div style={{ maxHeight: '70vh', overflowY: 'auto' }}>
            <ChatHistoryList>
              {Object.entries(groupedSessions).map(([date, sessions]) => (
                <div key={date}>
                  <div style={{ margin: '8px 0', fontWeight: 500 }}>
                    {dayjs(date).format('MMMM D, YYYY')}
                  </div>
                  {sessions.map((session) => (
                    <HistoryItemWrapper key={session.id}>
                      <HistoryItem
                        isActive={session.id === activeSessionId}
                        onClick={() => handleSelectChat(session.id)}
                      >
                        {session.title || 'New Chat'}
                      </HistoryItem>
                      <DeleteIcon
                        icon={<DeleteOutlined />}
                        type="text"
                        size="small"
                        onClick={() => deleteSession.mutate(session.id)}
                      />
                    </HistoryItemWrapper>
                  ))}
                </div>
              ))}
            </ChatHistoryList>

            {visibleCount < filteredSessions.length && (
              <Button
                type="link"
                onClick={() => setVisibleCount((prev) => prev + 10)}
                style={{ marginTop: 10 }}
                block
              >
                Load More
              </Button>
            )}
          </div>
        )}
      </Drawer>
    </AssistantLayout>
  );
};

export default IkomekAssistant;
