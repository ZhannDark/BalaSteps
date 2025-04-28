import styled from 'styled-components';
import { Button, Form, Steps } from 'antd';
export const ResetPasswordWrapper = styled.div `
  display: flex;
  justify-content: center;
  padding-top: 55px;
  background-color: #f6f6f6;
  min-height: 50vh;
  margin-top: 100px;
  margin-bottom: 192px;

  @media (max-width: 768px) {
    padding-top: 30px;
    margin: 60px 10px;
  }
`;
export const ResetCard = styled.div `
  width: 100%;
  max-width: 620px;
  padding: 30px;
  background-color: #ffffff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  border: 1px solid #426b1f;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;
export const ResetTitle = styled.h2 `
  font-family: 'Inknut Antiqua', serif;
  font-size: 26px;
  text-align: center;
  color: #4b163b;
  margin-bottom: 30px;

  @media (max-width: 480px) {
    font-size: 22px;
  }
`;
export const CustomSteps = styled(Steps) `
  margin-bottom: 30px;
  width: 500px;

  .ant-steps-item-tail::after {
    background-color: rgba(49, 80, 22, 0.8) !important;
  }

  .ant-steps-item-process .ant-steps-item-icon {
    background-color: #426b1f;
    border-color: #426b1f;
    color: #fff;
  }

  .ant-steps-item-finish .ant-steps-item-icon {
    background-color: #6b8e23;
    border-color: #6b8e23;
    color: #fff;
  }

  .ant-steps-item-title {
    font-family: 'Inknut Antiqua', serif;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;
export const ResetForm = styled(Form) `
  .ant-form-item-label > label {
    color: #4b163b;
    font-weight: 500;
  }

  .ant-input,
  .ant-input-password {
    border-radius: 8px;
  }
`;
export const StepButton = styled(Button) `
  background-color: #426b1f;
  border-color: #426b1f;
  color: white;
  font-weight: 500;
  font-family: 'Almendra', serif;
  font-size: 20px;
  width: 30%;
  height: 38px;
  border-radius: 8px;
  margin-top: 15px;
  margin-left: 170px;
  cursor: pointer;

  &:hover {
    background-color: #6b8e23 !important;
    border-color: #6b8e23 !important;
    color: white !important;
  }

  @media (max-width: 768px) {
    width: 100%;
    margin-left: 0;
  }
`;
