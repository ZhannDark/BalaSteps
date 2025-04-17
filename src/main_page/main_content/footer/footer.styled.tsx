import styled from 'styled-components';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';
import { device } from '../../../styles/media';

const { Footer } = Layout;

export const StyledFooter = styled(Footer)<{ collapsed?: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e2e3e0;
  padding: 20px 40px;
  height: 60px;
  transition: margin 0.3s ease;

  margin-left: ${({ collapsed }) =>
    collapsed === false ? '0' : collapsed ? '100px' : '300px'};

  @media ${device.tablet} {
    flex-direction: column;
    margin-left: 0;
    padding: 10px;
    height: auto;
  }
`;

export const FooterLink = styled(Link)`
  margin: 0 120px;
  text-decoration: none;
  color: #426b1f;
  font-family: 'Acme', sans-serif;
  font-size: 18px;

  &:hover {
    color: #4b163b;
  }

  @media ${device.tablet} {
    margin: 10px 0;
  }
`;

export const CopyRight = styled.span`
  margin: 0 120px;
  color: #426b1f;
  font-family: 'Acme', sans-serif;
  font-size: 18px;

  @media ${device.tablet} {
    margin: 10px 0;
  }
`;
