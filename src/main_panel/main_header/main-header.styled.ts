import styled from 'styled-components';
import { Button, Layout } from 'antd';
import { device } from '../../styles/media';

const { Header } = Layout;

export const StyledHeader = styled(Header)`
  background-color: #e2e3e0;
  max-height: 45px;
  padding: 10px 5px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  border-bottom: 1px dotted #426b1f;

  @media ${device.tablet} {
    padding: 8px 4px;
  }

  @media ${device.mobileL} {
    padding: 6px 2px;
  }
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
`;

export const ProfileDropdownButton = styled(Button)`
  display: flex;
  align-items: center;
  color: #4b163b;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;

  &:hover {
    color: #365517;
  }
`;
