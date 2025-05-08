import styled from 'styled-components';
import { Typography, Button as AntButton } from 'antd';
import { device } from '../../../styles/media';

const { Title } = Typography;

export const MainWrapper = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
  padding-bottom: 100px;

  @media ${device.tablet} {
    padding-bottom: 80px;
  }

  @media ${device.mobileL} {
    padding: 60px 10px 40px;
    margin-top: 0;
  }
`;

export const MainTitle = styled(Title)`
  font-family: 'Newsreader', serif !important;
  font-size: 64px !important;
  font-weight: 400 !important;
  text-align: center;
  line-height: 120%;
  width: 790px;
  height: 154px;
  margin-bottom: 20px;

  @media ${device.tablet} {
    font-size: 40px !important;
    width: 90%;
    height: auto;
    padding: 0 10px;
  }

  @media ${device.mobileL} {
    width: 100%;
    font-size: 28px !important;
  }

  @media ${device.mobileS} {
    width: 100%;
    font-size: 22px !important;
  }
`;

export const GetStartedButton = styled(AntButton)`
  background-color: #426b1f;
  color: white !important;
  width: 227px;
  height: 60px;
  font-size: 20px;
  font-family: 'Inter', sans-serif;
  padding: 19px 57px;
  border-radius: 8px;
  margin-bottom: 79px;
  margin-top: 50px;

  &:hover {
    background-color: #629432 !important;
  }

  @media ${device.tablet} {
    width: 180px;
    font-size: 16px;
    padding: 14px 32px;
  }

  @media ${device.mobileL} {
    width: 160px;
    font-size: 14px;
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 100px;
  margin-top: 20px;

  @media ${device.mobileL} {
    flex-direction: column;
    align-items: center;
    gap: 20px;
  }
`;

export const ContentImage = styled.img`
  width: auto;
  height: 393px;
  border-radius: 5px;

  @media ${device.tablet} {
    height: 250px;
    width: 80%;
  }

  @media ${device.mobileS} {
    height: 150px;
    width: 100%;
  }

  @media ${device.mobileL} {
    width: 85%;
    max-width: 280px;
    height: auto;
    object-fit: cover;
  }
`;
