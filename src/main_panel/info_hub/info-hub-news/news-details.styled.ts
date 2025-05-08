import styled from 'styled-components';
import { Layout, Button, Card, Input, List } from 'antd';

const { Content, Header } = Layout;
const { TextArea } = Input;
const { Item } = List;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
`;

export const StyledHeader = styled(Header)`
  padding: 0;
  margin-left: 5px;
  background: #e2e3e0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const StyledContent = styled(Content)`
  padding: 24px;
  background: #f5f5f5;
`;

export const BackButton = styled(Button)`
  margin-bottom: 20px;
`;

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

export const CommentSection = styled.div`
  margin-top: 40px;
`;

export const CommentArea = styled(TextArea)`
  margin-bottom: 12px;
`;

export const RatingRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 24px;
`;

export const StyledListItem = styled(Item)`
  background: #fff;
  padding: 16px;
  border-radius: 8px;
  margin-bottom: 16px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
`;

export const EditArea = styled(TextArea)`
  margin-top: 12px;
  margin-bottom: 8px;
`;

export const CommentMeta = styled(List.Item.Meta)`
  margin-bottom: 8px;
`;
