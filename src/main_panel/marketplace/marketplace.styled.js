import styled from 'styled-components';
import { Layout, Button, Card } from 'antd';
export const MarketplaceLayout = styled(Layout) `
  min-height: 100vh;
  background: #f5f5f5;
`;
export const MarketplaceContent = styled(Layout.Content) `
  padding: 24px;
  background: #f5f5f5;
`;
export const TopBar = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;
export const MarketplaceTitle = styled.h1 `
  font-size: 28px;
  font-weight: bold;
  color: #4b163b;
  margin: 0;
`;
export const AddItemButton = styled(Button) `
  background-color: #426b1f;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  height: 40px;
  font-weight: bold;
  display: flex;
  align-items: center;

  &:hover {
    background-color: #6b8e23;
    color: #ffffff;
  }
`;
export const ItemsGrid = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;
export const ItemCard = styled(Card) `
  cursor: pointer;
  border-radius: 10px;
  overflow: hidden;
  transition: all 0.3s;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.15);
    transform: translateY(-4px);
  }

  .ant-card-body {
    padding: 0;
  }
`;
export const ItemImage = styled.img `
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;
