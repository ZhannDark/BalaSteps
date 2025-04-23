import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

export const NewsSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 166px;
`;

export const NewsTitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
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
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const NewsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 45px !important;
`;

export const NewsItem = styled.div`
  text-align: center;
  width: auto;
`;

export const NewsImage = styled.img`
  width: auto;
  height: 130px;
  border-radius: 3px;
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
`;
