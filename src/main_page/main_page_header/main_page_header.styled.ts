import styled from 'styled-components';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 47px;
  background: #e2e3e0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 20px;
  border-bottom: 1px dotted #4b163b;
`;

export const LogoContainer = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  margin-right: auto;
`;

export const Logo = styled.img`
  height: 40px;
`;

export const RightSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  flex-grow: 1;
`;

export const NavLinks = styled.nav`
  display: flex;
  gap: 60px;
  margin-right: 30px;
`;

export const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-size: 20px;
  font-family: 'Acme', sans-serif !important;
  line-height: 130%;

  &:hover {
    text-decoration: dotted;
    color: #426b1f;
  }
`;

export const StyledButton = styled(Button)`
  background-color: #426b1f;
  color: white !important;
  border-radius: 8px;
  font-weight: bold;
  margin-right: 10px;

  &:hover {
    background-color: #629432 !important;
  }
`;
