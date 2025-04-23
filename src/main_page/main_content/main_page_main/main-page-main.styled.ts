import styled from 'styled-components';
import { Typography, Button as AntButton } from 'antd';

const { Title } = Typography;

export const MainWrapper = styled.div`
  display: flex;
  padding-top: 80px;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-top: 50px;
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
    stroke: none;
  }
`;

export const ImagesContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 100px;
  margin-top: 20px;
`;

export const ContentImage = styled.img`
  width: auto;
  height: 393px;
  border-radius: 5px;
  box-shadow: 0 0 0 rgba(0, 0, 0, 0.1);
`;
