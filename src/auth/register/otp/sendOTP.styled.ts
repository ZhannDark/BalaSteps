import styled from 'styled-components';
import { Button, Input, Typography } from 'antd';
const { Title, Text } = Typography;

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 710px;
  background-color: #f9f9f9;
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
    height: auto;
  }
`;

export const Box = styled.div`
  border: 1px solid #426b1f;
  max-width: 580px;
  width: 100%;
  padding: 30px;
  border-radius: 10px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const StyledTitle = styled(Title)`
  font-family: 'Inknut Antiqua', serif !important;
  color: #4b163b !important;
  text-align: center;
  margin-bottom: 10px !important;

  @media (max-width: 480px) {
    font-size: 22px !important;
  }
`;

export const StyledText = styled(Text)`
  font-family: 'Newsreader', serif;
  font-size: 17px;
  color: #426b1f;
  text-align: center;
  display: block;
  margin-bottom: 20px;
  max-width: 520px;
  margin-left: auto;
  margin-right: auto;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

export const OTPInput = styled(Input)`
  border: 1px solid #426b1f;
  border-radius: 5px;
  width: 100%;
  padding: 5px;
`;

export const RegisterButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 15px;
  }
`;

export const SubmitButton = styled(Button)`
  display: flex;
  align-items: center;
  background-color: #426b1f;
  color: #fff;
  font-size: 20px;
  border-radius: 10px;
  font-weight: lighter;
  font-family: 'Almendra', serif;
  margin-top: 20px;

  &:hover {
    background-color: #629432 !important;
  }
`;
