import styled from 'styled-components';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';
export const LoginContainer = styled.div `
  display: flex;
  align-items: center;
  justify-content: center;
  height: 750px;
  background-color: #f8f8f8;
`;
export const LoginFormContainer = styled.div `
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 585px;
  height: 410px;
  text-align: center;
  border: 1px solid #426b1f;
`;
export const LoginTitle = styled.h2 `
  font-family: 'Newsreader', serif;
  font-size: 32px;
  font-weight: bold;
  color: #4b244a;
  margin-bottom: 20px;
`;
export const StyledInput = styled(Input) `
  width: 100%;
  padding: 10px;
  border: 1px solid #426b1f;
  border-radius: 5px;
`;
export const StyledPasswordInput = styled(Input.Password) `
  width: 100%;
  padding: 10px;
  border: 1px solid #426b1f;
  border-radius: 5px;
`;
export const StyledButton = styled(Button) `
  background-color: #426b1f;
  color: white;
  width: 150px;
  padding: 5px 50px;
  font-family: 'Almendra', serif;
  font-size: 20px;
  margin-top: 20px;
  border-radius: 10px;

  &:hover {
    background-color: #629432 !important;
  }
`;
export const LoginLinks = styled.div `
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
  font-size: 16px;
`;
export const StyledLink = styled(Link) `
  color: #426b1f;
  text-decoration: none;
  font-family: 'Alegreya Sans', serif;

  &:hover {
    text-decoration: underline;
  }
`;
