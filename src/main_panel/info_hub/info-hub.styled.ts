import styled from 'styled-components';
import { Button, Card, Layout, Input, Typography } from 'antd';
const { Title } = Typography;
const { Search } = Input;
const { Content } = Layout;

export const StyledLayout = styled(Layout)`
  min-height: 100vh;
  background-color: #f5f5f5;
`;

export const ContentContainer = styled(Content)`
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 96px);
`;

export const NameSearch = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
`;

export const HubTitle = styled.h1`
  font-family: 'Jacques Francois', serif;
  font-weight: lighter;
  font-size: 36px;
  color: #591c00;
  margin-bottom: 20px;
`;

export const SearchBar = styled(Search)`
  width: 300px;

  .ant-input {
    border: 1px solid #6d3c2c;
    border-radius: 8px;
    color: #6d3c2c;

    &:focus,
    &:hover {
      border-color: #6d3c2c;
      box-shadow: 0 0 0 2px rgba(109, 60, 44, 0.2);
    }
  }

  .ant-btn {
    background-color: #6d3c2c;
    border-color: #6d3c2c;
    color: #fff;

    &:hover {
      background-color: #8a4c3a;
      border-color: #8a4c3a;
    }
  }
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

export const TagDropdownContainer = styled.div`
  max-height: 300px;
  overflow-y: auto;
  padding: 10px 20px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
`;
