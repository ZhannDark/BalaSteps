import styled from 'styled-components';
import { Typography } from 'antd';
import { device } from '../../../styles/media';

const { Title } = Typography;

export const NewsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 166px;

  @media ${device.tablet} {
    padding: 0 20px;
    margin-top: 100px;
  }
`;

export const NewsTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  margin-bottom: 20px;
`;

export const NewsTitleLine = styled.div`
  width: 100%;
  height: 1px;
  background-color: black;
`;

export const NewsTitle = styled(Title)`
  font-family: 'Merriweather', serif !important;
  font-size: 96px !important;
  font-weight: bold !important;
  color: #426b1f !important;
  line-height: 160% !important;
  letter-spacing: 2px;
  margin: 0 !important;
  display: flex;
  flex-direction: column;
  align-items: center;

  @media ${device.tablet} {
    font-size: 48px !important;
  }

  @media ${device.mobileL} {
    font-size: 36px !important;
  }
`;

export const NewsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px !important;
  margin-top: 40px;

  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 30px !important;
  }
`;

export const NewsItem = styled.div`
  text-align: center;
`;

export const NewsImage = styled.img`
  width: auto;
  height: 130px;
  border-radius: 3px;

  @media ${device.mobileL} {
    height: 100px;
  }
`;

export const NewsText = styled.p`
  width: 205px;
  height: 73px;
  font-family: 'Sansita', serif;
  font-weight: 400;
  font-size: 14px;
  color: #4b163b;
  margin-top: 24px;
  line-height: 1.6;

  @media ${device.mobileL} {
    font-size: 13px;
    width: 90%;
  }
`;
