import styled from 'styled-components';
import { Layout, Button, Card, Input } from 'antd';

const { Header, Content } = Layout;
const { TextArea } = Input;

// Layout
export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f6f8f5;
`;

export const StyledHeader = styled(Header)`
  padding: 0;
  margin-left: 5px;
  background-color: #e2e3e0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledContent = styled(Content)`
  padding: 10px;
  width: 95%;
  margin: 0 auto;
`;

export const BackButton = styled(Button)`
  margin-bottom: 20px;
  font-size: 16px;
  color: #426b1f;
`;

// Post details
export const DetailsCard = styled(Card)`
  margin-bottom: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`;

export const DetailsImage = styled.img`
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
  margin-bottom: 20px;
`;

// Comments section
export const CommentSection = styled.div`
  margin-top: 40px;
`;

export const CommentArea = styled(TextArea)`
  margin-bottom: 12px;
`;

// Button for adding comment
export const AddCommentButton = styled(Button)`
  margin-top: 10px;
  background-color: #426b1f;
  border-color: #426b1f;

  &:hover {
    background-color: #5d8828 !important;
    border-color: #5d8828 !important;
  }
`;

// Comment / reply cards
export const CommentCard = styled(Card)`
  background: #ffffff;
  padding: 15px;
  border: 1px solid #c5d1bc;
  border-radius: 8px;
  margin-bottom: 16px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const CommentAuthor = styled.h5`
  margin: 0;
  font-weight: 600;
  color: #591c00;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #888;
`;

export const CommentText = styled.p`
  margin-top: 8px;
  font-size: 14px;
  color: #444;
`;

export const CommentActions = styled.div`
  margin-top: 8px;
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const RepliesContainer = styled.div`
  margin-top: 12px;
  margin-left: 30px;
  padding: 10px 15px;
  background: #f9f9f9;
  border-left: 3px solid #c5d1bc;
  border-radius: 8px;
`;

export const ReplyCard = styled(Card)`
  background: #fcfcfc;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 10px;
  margin-top: 10px;
`;

export const ShowRepliesButton = styled(Button)`
  margin-top: 10px;
  font-size: 14px;
  color: #426b1f;
  background: none;
  border: none;
  height: auto;
  padding: 0;

  &:hover {
    text-decoration: underline;
    background: none;
  }
`;

export const CommentInputWrapper = styled.div`
  position: relative;
  width: 100%;
  margin-bottom: 30px;
`;

export const InlineButton = styled(Button)`
  position: absolute;
  background-color: #426b1f;
  color: white;
  right: 8px;
  bottom: 8px;
  z-index: 1;
`;
