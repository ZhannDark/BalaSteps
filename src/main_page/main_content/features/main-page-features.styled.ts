import styled from 'styled-components';
import { Typography } from 'antd';

const { Title } = Typography;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 50px;
  margin: 140px 0;
`;

export const ButtonBlock = styled.div<{ isReversed: boolean }>`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  width: 1178px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;
`;

export const ButtonContent = styled.div<{ isReversed: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  flex-direction: ${({ isReversed }) => (isReversed ? 'row-reverse' : 'row')};
`;

export const ButtonText = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  max-width: 300px;

  p {
    font-family: 'Adamina', serif;
    font-size: 20px;
    font-weight: 400;
    color: #000000;
    width: 230px;
    margin: 0 40px;
    height: 77px;
    line-height: 1.4;
  }
`;

export const ButtonTitle = styled(Title)`
  font-family: 'Inknut Antiqua', serif !important;
  font-size: 28px !important;
  font-weight: bold !important;
  color: #4b163b !important;
  margin-bottom: 5px !important;
`;

export const ButtonImage = styled.img`
  width: auto;
  height: auto;
  border-radius: 10px;
  padding-left: 30px;
`;
