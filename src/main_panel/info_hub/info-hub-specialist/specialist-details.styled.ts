import styled from 'styled-components';
import { Layout, Button } from 'antd';
import TextArea from 'antd/lib/input/TextArea';

const { Header, Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f9f9f9;
`;

export const StyledHeader = styled(Header)`
  padding: 0;
  background-color: #e2e3e0;
  display: flex;
  align-items: center;
  height: 48px;
  justify-content: space-between;
`;

export const StyledContent = styled(Content)`
  padding: 24px;
  background-color: #fefefe;
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const BackButton = styled(Button)`
  margin-bottom: 16px;
`;

export const SpecialistCard = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 10px;
  box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.05);
  margin-bottom: 24px;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const InfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  text-align: left;

  @media (max-width: 768px) {
    align-items: center;
    text-align: center;
  }
`;

export const StyledImage = styled.img`
  max-width: 300px;
  height: auto;
  object-fit: cover;
  border-radius: 12px;
  border: 1px solid #ccc;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    max-width: 90%;
  }
`;

export const TagList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;

  span {
    background-color: #f0f5ff;
    color: #2f54eb;
    padding: 4px 10px;
    border-radius: 16px;
    font-size: 13px;
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const CommentCard = styled.div`
  background: #fff8f0;
  border: 1px solid #e1d6cc;
  border-radius: 10px;
  padding: 16px;
  margin-bottom: 16px;
`;

export const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  @media (max-width: 500px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }
`;

export const CommentText = styled.p`
  margin: 8px 0;
  font-size: 15px;
`;

export const CommentDate = styled.span`
  font-size: 12px;
  color: #888;
`;

export const CommentActions = styled.div`
  margin-top: 6px;
  display: flex;
  gap: 10px;
`;

export const ReplyCard = styled.div`
  background-color: #f4f9f3;
  border-left: 3px solid #426b1f;
  margin-top: 10px;
  padding: 10px 14px;
  border-radius: 6px;
`;

export const ReplyInput = styled(TextArea)`
  margin-top: 8px;
`;
