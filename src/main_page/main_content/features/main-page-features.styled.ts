import styled from 'styled-components';
import { Typography } from 'antd';
import { device } from '../../../styles/media';

const { Title } = Typography;

export const ButtonContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  margin: 140px 0;
`;

export const ButtonBlock = styled.div<{ $isReversed: boolean }>`
  background: #ffffff;
  border-radius: 20px;
  box-shadow: 0 6px 6px rgba(0, 0, 0, 0.1);
  width: 1178px;
  height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 100px;
  flex-direction: ${({ $isReversed }) => ($isReversed ? 'row-reverse' : 'row')};

  @media ${device.tablet} {
    flex-direction: column !important;
    height: auto;
    padding: 20px;
  }
`;

export const ButtonContent = styled.div<{ $isReversed: boolean }>`
  display: flex;
  align-items: center;
  gap: 180px;
  flex-direction: ${({ $isReversed }) => ($isReversed ? 'row-reverse' : 'row')};

  @media ${device.tablet} {
    flex-direction: column;
    text-align: center;
  }
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

    @media ${device.tablet} {
      align-items: center;
      p {
        margin: 10px auto;
      }
    }
  }
`;

export const ButtonTitle = styled(Title)`
  font-family: 'Inknut Antiqua', serif !important;
  font-size: 30px !important;
  font-weight: bold !important;
  color: #4b163b !important;
  margin-bottom: 5px !important;

  @media ${device.tablet} {
    font-size: 24px !important;
  }

  @media ${device.mobileL} {
    font-size: 20px !important;
  }
`;

export const ButtonImage = styled.img`
  width: auto;
  height: auto;
  border-radius: 10px;
  padding-left: 30px;

  @media ${device.tablet} {
    padding: 0;
    margin-top: 20px;
    width: 100%;
    max-width: 300px;
  }
`;
