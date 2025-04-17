import styled from 'styled-components';
import { Layout, Button, Card } from 'antd';
import { device } from '../../../styles/media';

const { Header, Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f6f8f5;
`;

export const StyledHeader = styled(Header)`
  background: #e2e3e0;
  padding: 0 20px;
  display: flex;
  align-items: center;
`;

export const StyledContent = styled(Content)`
  padding: 24px;
  width: 95%;
  margin: 0 auto;

  @media ${device.tablet} {
    width: 100%;
    padding: 16px;
  }
`;

export const BackButton = styled(Button)`
  margin-bottom: 20px;
  font-size: 16px;
  color: #426b1f;
`;

export const DiscussionCard = styled(Card)`
  background: #fff;
  padding: 15px;
  border: 1px solid #c5d1bc;
  border-radius: 10px;
  margin-bottom: 24px;
`;

export const DiscussionMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const AuthorName = styled.h5`
  font-weight: 600;
  color: #426b1f;
  margin: 0;
`;

export const CategoryLabel = styled.div`
  background-color: #edf5e1;
  color: #426b1f;
  font-size: 13px;
  padding: 4px 10px;
  border-radius: 15px;
`;

export const DiscussionText = styled.p`
  font-size: 16px;
  color: #333;
  margin-top: 15px;
`;

export const CommentCount = styled.div`
  margin-top: 20px;
  font-size: 14px;
  color: #777;
  display: flex;
  align-items: center;
`;

export const AddCommentSection = styled.div`
  margin: 30px 0;
`;

export const AddCommentButton = styled(Button)`
  margin-top: 10px;
  background-color: #426b1f;
  border-color: #426b1f;

  &:hover {
    background-color: #5d8828 !important;
    border-color: #5d8828 !important;
  }
`;

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
