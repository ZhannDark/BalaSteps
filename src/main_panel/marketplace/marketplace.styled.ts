import styled from 'styled-components';
import { Layout, Button, Card, Progress } from 'antd';
import { motion } from 'framer-motion';

export const MarketplaceLayout = styled(Layout)`
  min-height: 100vh;
  background: #f0f2f5;
`;

export const MarketplaceContent = styled(Layout.Content)`
  margin: 10px;
  padding: 15px;
  background-color: #fff;
  border-radius: 10px;
  min-height: calc(100vh - 96px);
`;

export const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

export const MarketplaceTitle = styled.h1`
  font-family: 'Jacques Francois', serif;
  font-weight: lighter;
  font-size: 36px;
  color: #591c00;
  margin-bottom: 20px;
`;

export const AddItemButton = styled(Button)`
  background-color: #426b1f;
  color: #ffffff;
  border: none;
  border-radius: 8px;
  width: auto;
  height: 35px;
  padding: 0 20px;
  font-weight: 600;
  display: flex;
  align-items: center;
  transition: all 0.3s ease;

  &:hover {
    background-color: #6b8e23 !important;
    color: #ffffff !important;
  }
`;

export const ItemsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(240px, 1fr));
  gap: 24px;
`;

export const ItemCard = styled(Card)`
  cursor: pointer;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;

  &:hover {
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
    transform: translateY(-4px);
  }

  .ant-card-body {
    padding: 12px 16px;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-top-left-radius: 12px;
  border-top-right-radius: 12px;
`;

export const DonationCardContainer = styled(motion.div)<{
  bordercolor: string;
}>`
  border: 2px solid ${(props) => props.bordercolor};
  border-radius: 12px;
  overflow: hidden;
`;

export const DonationContent = styled.div`
  padding: 10px;
  text-align: center;

  h3 {
    margin-bottom: 6px;
    font-size: 18px;
    font-weight: 600;
  }

  p {
    margin: 4px 0;
    font-size: 14px;
  }
`;

export const DonationProgress = styled(Progress)`
  margin-top: 4px;

  .ant-progress-bg {
    background-color: #426b1f;
  }
`;

export const ItemInfo = styled.div`
  padding: 10px;
  text-align: center;
`;

export const ItemTitle = styled.h3`
  margin-bottom: 8px;
  font-size: 16px;
  font-weight: 600;
`;

export const ItemPrice = styled.p`
  font-weight: bold;
  color: #333;
`;
