import styled from 'styled-components';
import { Typography } from 'antd';
import { device } from '../../../styles/media';
import { motion } from 'framer-motion';

const { Title } = Typography;

export const NewsSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 100px;

  @media ${device.tablet} {
    padding: 0 20px;
    margin-top: 80px;
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

export const TabsContainer = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  margin: 40px 0 20px;

  @media ${device.mobileL} {
    gap: 24px;
    flex-wrap: wrap;
  }
`;

export const TabButton = styled.button<{ isActive: boolean }>`
  position: relative;
  background: none;
  border: none;
  font-size: 20px;
  font-family: 'Sansita', sans-serif;
  color: ${({ isActive }) => (isActive ? '#426B1F' : '#888')};
  font-weight: ${({ isActive }) => (isActive ? '600' : '400')};
  padding-bottom: 4px;
  cursor: pointer;
  transition: color 0.3s;

  &:hover {
    color: #426b1f;
  }

  @media ${device.mobileL} {
    font-size: 16px;
  }
`;

export const ActiveDot = styled(motion.div)`
  position: absolute;
  left: 50%;
  bottom: -8px;
  transform: translateX(-50%);
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #426b1f;
`;

export const NewsContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 45px;
  margin-top: 30px;

  @media ${device.tablet} {
    flex-direction: column;
    align-items: center;
    gap: 30px;
  }
`;

export const NewsItem = styled.div`
  text-align: center;
  width: 220px;

  @media ${device.mobileL} {
    width: 90%;
  }
`;

export const NewsImage = styled.img`
  width: 100%;
  height: 130px;
  border-radius: 3px;
  object-fit: cover;

  @media ${device.mobileL} {
    height: 100px;
  }
`;

export const NewsText = styled.p`
  width: 100%;
  height: auto;
  font-family: 'Sansita', serif;
  font-weight: 400;
  font-size: 14px;
  color: #4b163b;
  margin-top: 16px;
  line-height: 1.6;

  @media ${device.mobileL} {
    font-size: 13px;
    width: 90%;
  }
`;

export const ShowMoreButton = styled.button`
  margin-top: 30px;
  font-size: 16px;
  font-weight: 500;
  margin-left: 45%;
  color: #426b1f;
  border: none;
  background: none;
  cursor: pointer;
  font-family: 'Sansita', sans-serif;
  transition: all 0.3s;

  &:hover {
    text-decoration: underline;
  }

  @media ${device.mobileL} {
    font-size: 14px;
    margin-top: 24px;
  }
`;

export const NewsMeta = styled.div`
  font-size: 13px;
  font-family: 'Sansita', serif;
  color: #555;
  margin-top: 4px;
  line-height: 1.4;

  @media ${device.mobileL} {
    font-size: 12px;
  }
`;
