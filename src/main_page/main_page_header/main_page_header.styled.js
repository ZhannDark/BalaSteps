import styled from 'styled-components';
import { Button, Layout } from 'antd';
import { Link } from 'react-router-dom';
import { device } from '../../styles/media';
const { Header } = Layout;
export const StyledHeader = styled(Header) `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  background: #e2e3e0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px dotted #4b163b;
  height: 60px;

  @media ${device.tablet} {
    flex-wrap: wrap;
    padding: 10px 20px;
    height: auto;
  }
`;
export const LogoContainer = styled.div `
  display: flex;
  align-items: center;
`;
export const Logo = styled.img `
  height: 40px;
`;
export const RightSection = styled.div `
  display: flex;
  align-items: center;
  gap: 10px;

  @media ${device.tablet} {
    flex-direction: column;
    width: 100%;
    display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
    gap: 12px;
    margin-top: 10px;
  }
`;
export const NavLinks = styled.nav `
  display: flex;
  gap: 60px;
  margin-right: 30px;

  @media ${device.tablet} {
    flex-direction: column;
    gap: 15px;
    margin: 0;
    align-items: center;
  }
`;
export const NavLink = styled(Link) `
  text-decoration: none;
  color: #85300c;
  font-size: 20px;
  font-weight: 600;
  font-family: 'Acme', serif !important;
  line-height: 130%;

  &:hover {
    text-decoration: dotted;
    color: #c54a16;
  }
`;
export const ButtonGroup = styled.div `
  display: flex;
  gap: 10px;

  @media ${device.tablet} {
    flex-direction: column;
    width: 100%;
    align-items: center;
    gap: 8px;
  }
`;
export const StyledButton = styled(Button) `
  background-color: #426b1f;
  color: white !important;
  border-radius: 8px;
  font-weight: bold;
  padding: 4px 16px;

  &:hover {
    background-color: #629432 !important;
  }

  @media ${device.mobileL} {
    font-size: 14px;
    padding: 4px 12px;
    height: auto;
  }
`;
export const Burger = styled.div `
  display: none;

  @media ${device.tablet} {
    display: block;
    cursor: pointer;
    font-size: 26px;
    margin-left: auto;
  }
`;
