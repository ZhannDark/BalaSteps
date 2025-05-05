import styled from 'styled-components';
import { Button, Card, Layout, Input, Typography } from 'antd';
const { Title } = Typography;
const { Search } = Input;
const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  background-color: #f8f8f8;
  min-height: 100vh;
`;

export const ContentContainer = styled(Content)`
  width: 100%;
  margin: auto;
  padding: 40px;
`;

export const NameSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const SearchBar = styled(Search)`
  width: 300px;
`;

export const Section = styled.section`
  margin-bottom: 40px;
`;

export const SectionTitle = styled(Title)`
  && {
    color: #426b1f;
    margin-bottom: 10px;
  }
`;

export const ScrollContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const ScrollContent = styled.div`
  display: flex;
  overflow-x: auto;
  scroll-behavior: smooth;
  gap: 15px;
  padding: 10px 0;
  white-space: nowrap;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
`;

export const ScrollButton = styled(Button)`
  background-color: #426b1f;
  color: white;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  border: none;
  &:hover {
    background-color: #6b8e23 !important;
  }
`;

export const InfoCard = styled(Card)`
  width: 250px;
  text-align: center;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

export const CardImage = styled.img`
  width: 100%;
  height: 150px;
  margin-bottom: 10px;
  object-fit: cover;
  border-radius: 8px 8px 0 0;
`;
