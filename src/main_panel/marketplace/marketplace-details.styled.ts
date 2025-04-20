import styled from 'styled-components';
import { Button } from 'antd';

export const DetailsContainer = styled.div`
  padding: 24px;
  background: #f5f5f5;
  min-height: 100vh;
`;

export const BackButton = styled(Button)`
  margin-bottom: 20px;
`;

export const DetailsCard = styled.div`
  background: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
`;

export const CarouselWrapper = styled.div`
  width: 100%;
  max-width: 600px;
  margin: 0 auto 24px auto;

  .slick-slide img {
    width: 100%;
    height: 360px;
    object-fit: cover;
    border-radius: 12px;
  }
`;

export const ItemImage = styled.img`
  width: 100%;
  height: 360px;
  object-fit: cover;
  border-radius: 12px;
`;

export const ButtonGroup = styled.div`
  margin-top: 20px;
  display: flex;
  gap: 16px;
`;

export const InfoSection = styled.div`
  margin-top: 32px;
`;
