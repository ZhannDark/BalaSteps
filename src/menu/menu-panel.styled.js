import styled from 'styled-components';
import { Button, Menu } from 'antd';
export const MenuContainer = styled.div `
  position: fixed;
  width: ${({ collapsed }) => (collapsed ? '100px' : '250px')};
  transition: width 0.3s;
  background-color: #e2e3e0;
  padding: 10px;
  height: 100%;
`;
export const MenuHeader = styled.div `
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 10px;
  margin-bottom: 20px;
`;
export const Logo = styled.img `
  height: 50px;
  margin-left: 15px;
`;
export const ToggleButton = styled(Button) `
  background-color: #426b1f;
  color: #ffffff !important;
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 8px;
  margin-left: 15px;
  margin-top: 10px;
  &:hover {
    background-color: #6b8e23 !important;
    color: white !important;
  }
`;
export const StyledMenu = styled(Menu) `
  display: grid;
  background-color: #e2e3e0;
  border: none;
  font-family: 'Jacques Francois', serif;
  font-weight: lighter;
  font-size: 18px;
  margin-top: 20px;
  gap: 8px;

  .ant-menu-item {
    margin-bottom: 10px;
    background-color: #ffffff;
    color: #4b163b;
    transition: all 0.3s;
  }

  .ant-menu-item-selected {
    background-color: #f0f8e8 !important;
    border: 2px solid #426b1f;
    border-radius: 10px;
  }

  .ant-menu-item:hover {
    background-color: #f6f6f6 !important;
  }

  .ant-menu-item .anticon {
    font-size: 20px;
    color: #4b163b;
  }

  .ant-menu-item-selected .anticon {
    color: #426b1f;
  }

  @media (max-width: 768px) {
    font-size: 16px;
  }
`;
