import styled from 'styled-components';
import { Layout, Input, Select, Button, Card } from 'antd';
const { Content } = Layout;
export const ForumLayout = styled(Layout) `
  min-height: 100vh;
  background: #f5f5f5;
`;
export const ForumHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #e2e3e0;
`;
export const ForumControls = styled.div `
  display: flex;
  align-items: center;
  gap: 10px;
`;
export const SearchBar = styled(Input) `
  width: 200px;
  margin-left: 210px;
  border-radius: 8px;
  border: 1px solid #6d3c2c;
`;
export const FilterDropdown = styled(Select) `
  width: 300px;
  border-radius: 8px;
  border: 1px solid #6d3c2c;
`;
export const NewThreadButton = styled(Button) `
  background-color: #6d3c2c;
  color: white;
  border: none;

  &:hover {
    background-color: #8a5133 !important;
    color: white !important;
    border: none;
  }
`;
export const ForumContent = styled(Content) `
  padding: 24px;
  background: #fff;
  border-radius: 8px;
`;
export const SectionTitle = styled.h1 `
  font-family: 'Jacques Francois', serif;
  font-weight: lighter;
  font-size: 36px;
  color: #591c00;
  margin-bottom: 20px;
`;
export const ThreadCard = styled(Card) `
  background: white;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  margin-bottom: 15px;
  position: relative;
`;
export const ThreadTopic = styled.div `
  background: #556b2f;
  color: white;
  font-size: 12px;
  padding: 4px 10px;
  border-radius: 4px;
  display: inline-block;
  margin-bottom: 10px;
`;
export const ThreadMeta = styled.p `
  font-size: 12px;
  color: #666;
`;
export const ThreadContent = styled.p `
  font-size: 14px;
  color: #333;
`;
