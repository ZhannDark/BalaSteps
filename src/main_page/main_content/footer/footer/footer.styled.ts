import styled from 'styled-components';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { device } from '../../../../styles/media';

const { Footer } = Layout;

export const StyledFooter = styled(Footer)`
  background: #ffffff;
  padding: 30px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-top: 1px solid #e0e0e0;

  @media ${device.mobileL} {
    width: 100%;
  }
`;

export const FooterNav = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`;

export const FooterLink = styled(Link)`
  color: #85300c;
  font-size: 15px;
  text-decoration: none;

  &:hover {
    color: #c54a16;
    text-decoration: underline;
  }

  @media ${device.mobileL} {
    font-size: 12px;
    text-align: center;
  }
`;

export const FooterSocial = styled.div`
  display: flex;
  gap: 20px;
  margin-bottom: 20px;

  a {
    color: #426b1f;
    transition: color 0.2s;

    &:hover {
      color: #629432;
    }
  }
`;

export const CopyRight = styled.span`
  color: #777;
  font-size: 14px;
  text-align: center;

  @media ${device.mobileS} {
    font-size: 12px;
    text-align: center;
    line-height: 1.4;
  }

  @media ${device.mobileL} {
    font-size: 12px;
    text-align: center;
  }
`;
