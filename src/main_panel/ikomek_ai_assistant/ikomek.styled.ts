import styled from 'styled-components';
import { Layout, Button, Input } from 'antd';

const { Content } = Layout;

export const AssistantLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const AssistantContent = styled(Content)`
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 96px);
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
    display: flex;
    flex-direction: column;
    gap: 12px;
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
  border-radius: 12px;
  max-width: 75%;
  word-break: break-word;
  font-family: 'Newsreader', serif;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-in-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
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

export const ChatHistoryList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const HistoryItemWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 0;

  &:hover button {
    visibility: visible;
  }
`;

export const HistoryItem = styled.div<{ isActive: boolean }>`
  flex: 1;
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

export const DeleteIcon = styled(Button)`
  visibility: hidden;
  margin-left: 8px;
`;

export const IconRow = styled.div`
  position: absolute;
  top: 72px;
  right: 20px;
  display: flex;
  gap: 12px;
  z-index: 100;
`;
