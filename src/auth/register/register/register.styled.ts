import styled from 'styled-components';
import { Button, Input } from 'antd';
import { Link } from 'react-router-dom';

export const RegisterContainer = styled.div`
  display: flex;
  margin-top: 70px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px 20px;

  @media (max-width: 768px) {
    padding: 20px 10px;
    margin-top: 50px;
  }
`;

export const RegisterFormContainer = styled.div`
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 600px;
  border: 1px solid #426b1f;
  text-align: center;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

export const RegisterTitle = styled.h2`
  font-family: 'Newsreader', serif;
  font-size: 32px;
  font-weight: bold;
  color: #4b244a;
  margin-bottom: 20px;

  @media (max-width: 480px) {
    font-size: 24px;
  }
`;

export const RegisterInput = styled(Input)`
  width: 100%;
  padding: 10px;
  border: 1px solid #426b1f;
  border-radius: 5px;
`;

export const RegisterPassword = styled(Input.Password)`
  width: 100%;
  padding: 10px;
  border: 1px solid #426b1f;
  border-radius: 5px;
`;

export const RegisterButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 100px;
  width: 100%;
  margin-top: 10px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
    justify-content: center;
  }
`;

export const RegisterButton = styled(Button)`
  background-color: #426b1f !important;
  color: white !important;
  padding: 6px 20px;
  font-size: 20px;
  border-radius: 10px;
  font-weight: lighter;
  font-family: 'Almendra', serif;
  text-align: center;
  margin-left: 50px;
  margin-bottom: 10px;

  @media (max-width: 768px) {
    margin-left: 0;
    width: 100%;
  }
`;

export const LoginLink = styled(Link)`
  font-size: 17px;
  font-family: 'Alegreya Sans', serif;
  color: #426b1f;

  &:hover {
    color: #7ec040;
  }

  @media (max-width: 768px) {
    text-align: center;
  }
`;
