import styled from 'styled-components';
import { Layout, Button, Input } from 'antd';

const { Content } = Layout;

export const AssistantLayout = styled(Layout)`
  height: 100vh;
  background-color: #f6f8f5;
`;

export const AssistantContent = styled(Content)`
  display: flex;
  height: calc(100vh - 48px); /* Убираем шапку */
`;

export const Sidebar = styled.div`
  width: 280px;
  background-color: #edf5e1;
  border-right: 1px solid #c5d1bc;
  padding: 16px;
  overflow-y: auto;
`;

export const HistoryTitle = styled.h4`
  margin-bottom: 16px;
  font-family: 'Newsreader', serif;
  color: #4b244a;
`;

export const NewChatButton = styled(Button)`
  width: 100%;
  margin-bottom: 20px;
  background-color: #426b1f;
  border-color: #426b1f;
  color: white;
  font-family: 'Newsreader', serif;

  &:hover {
    background-color: #629432 !important;
    border-color: #629432 !important;
    color: white !important;
  }
`;

export const ChatHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HistoryItem = styled.div<{ isActive: boolean }>`
  padding: 10px 14px;
  background-color: ${({ isActive }) => (isActive ? '#d6e9c6' : '#ffffff')};
  border: 1px solid #c5d1bc;
  border-radius: 8px;
  font-family: 'Newsreader', serif;
  font-size: 15px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    background-color: #d6e9c6;
  }
`;

export const ChatMainContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 24px;
  overflow-y: auto;

  .chat-area {
    flex: 1;
    margin-bottom: 20px;
    overflow-y: auto;
    padding-right: 8px;
  }
`;

export const AssistantHeader = styled.div`
  text-align: center;
  margin-bottom: 30px;
`;

export const MessageCard = styled.div<{ sender: 'user' | 'bot' }>`
  background-color: ${({ sender }) =>
    sender === 'user' ? '#e2f0cb' : '#ffffff'};
  align-self: ${({ sender }) =>
    sender === 'user' ? 'flex-end' : 'flex-start'};
  padding: 12px 16px;
  margin-bottom: 10px;
  border-radius: 12px;
  max-width: 75%;
  word-break: break-word;
  font-family: 'Newsreader', serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const MessageInputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const MessageInput = styled(Input.TextArea)`
  flex: 1;
  resize: none;
  border-radius: 8px;
  font-family: 'Newsreader', serif;
`;

export const SendButton = styled(Button)`
  background-color: #426b1f;
  border-color: #426b1f;
  font-family: 'Newsreader', serif;

  &:hover {
    background-color: #629432 !important;
    border-color: #629432 !important;
  }
`;
