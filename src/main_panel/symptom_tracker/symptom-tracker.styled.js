import styled from 'styled-components';
import { Button, Layout } from 'antd';
const { Header, Content } = Layout;
export const SymptomLayout = styled(Layout) `
  min-height: 100vh;
  background-color: #f5f5f5;
`;
export const SymptomHeaderBar = styled(Header) `
  background: #e2e3e0;
  padding: 0;
  height: 48px;
  display: flex;
  margin-left: 5px;
  align-items: center;
`;
export const SymptomContent = styled(Content) `
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 96px);
`;
export const SymptomHeader = styled.div `
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  justify-content: left;

  h2 {
    margin: 0;
    font-family: 'Jacques Francois', serif;
    font-weight: lighter;
    font-size: 32px;
    color: #591c00;
  }

  .anticon-info-circle {
    color: #9c9c9c;
    cursor: pointer;
  }
`;
export const CalendarCell = styled.div `
  width: 100%;
  height: 100%;
  margin-top: 7px;
  padding: 4px;
  cursor: pointer;
  border-radius: 6px;
  transition: background 0.2s ease;

  &:hover {
    background-color: #f0f0f0;
  }
`;
export const DisabledDate = styled.div `
  cursor: not-allowed;
  opacity: 0.3;
`;
export const SymptomAction = styled.div `
  display: flex;
  gap: 10px;
  margin-top: 8px;
`;
export const AddSymptomButton = styled(Button) `
  background-color: #426b1f;
  color: white !important;

  &:hover {
    background-color: #629432 !important;
    color: white !important;
  }
`;
export const ChildSymptom = styled.p `
  margin: 6px 0;
  color: #444;
`;
export const DrawerContainer = styled.div `
  padding-right: 10px;

  @media (max-width: 768px) {
    padding: 0;
  }
`;
export const SymptomDrawerTitle = styled.h4 `
  margin-bottom: 16px;
  font-family: 'Jacques Francois', serif;
  font-size: 20px;
  color: #4b244a;
`;
export const AddSymptomDrawerButton = styled(Button) `
  margin-top: 20px;
  background-color: #426b1f;
  color: white !important;
  font-family: 'Almendra', serif;
  font-size: 15px;
  padding: 6px 14px;
  border-radius: 6px;

  &:hover {
    background-color: #629432 !important;
  }
`;
