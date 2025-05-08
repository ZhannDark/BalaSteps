import styled from 'styled-components';
import { Layout, Button, Input, Rate } from 'antd';

const { Content } = Layout;
const { TextArea } = Input;

export const StyledLayout = styled(Layout)`
  display: flex;
  background: #f9f9f9;
`;

export const StyledHeader = styled(Layout.Header)`
  background-color: #e2e3e0;
  height: 48px;
  padding: 0;
`;

export const StyledContent = styled(Content)`
  padding: 24px;
  background-color: #fefefe;
`;

export const BackButton = styled(Button)`
  margin-bottom: 16px;
`;

export const InfoCard = styled.div`
  background: #fff;
  border-radius: 12px;
  padding: 24px;
  margin-bottom: 32px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const CenterImage = styled.img`
  width: 100%;
  max-width: 300px;
  max-height: 300px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 16px;
`;

export const CommentForm = styled.div`
  background: #dcdcdc;
  padding: 24px;
  border: 1px solid #ddd;
  border-radius: 12px;
  margin-bottom: 40px;
`;

export const StyledTextarea = styled(TextArea)`
  margin-bottom: 12px;
`;

export const CommentListContainer = styled.div`
  margin-bottom: 32px;
`;

export const ReplyBox = styled.div`
  margin-top: 12px;
  padding-left: 24px;
  border-left: 2px solid #ccc;
`;

export const CommentMeta = styled.div`
  margin-bottom: 8px;
  font-size: 12px;
  color: #777;
`;

export const ReplyMeta = styled.div`
  font-size: 12px;
  color: #999;
`;

export const SubmitButton = styled(Button)`
  margin-top: 12px;
`;

export const StyledRate = styled(Rate)`
  margin-left: 8px;
`;
