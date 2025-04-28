import styled from 'styled-components';
import { Layout, Descriptions, Button } from 'antd';

const { Content } = Layout;

export const ProfileLayout = styled(Layout)`
  display: flex;
  flex: 1;
  background-color: #f9f9f9;
`;

export const ProfileContent = styled(Content)`
  margin: 10px;
  padding: 15px;
  background-color: #fefefe;
  border-radius: 10px;
  min-height: 100vh;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

export const ProfileTitle = styled.h1`
  font-family: 'Jacques Francois', serif;
  font-size: 34px;
  color: #591c00;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 26px;
    text-align: center;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  gap: 20px;
  align-items: flex-start;
  padding: 10px;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
    gap: 20px;
  }
`;

export const ParentInfoBlock = styled.div`
  display: inline-block;
  width: 100%;
`;

export const ProfileLeft = styled.div`
  display: flex;
  flex-direction: row;
  gap: 40px;
`;

export const ProfileImage = styled.img`
  width: 100%;
  max-width: 150px !important;
  height: 200px;
  border-radius: 10px;
  border: 1px solid #ccc;
  object-fit: cover;
`;

export const ProfileDropdownTrigger = styled.div`
  display: flex;

  .ant-btn {
    border: none;
    font-size: medium;
    font-weight: bold;
    background: transparent;
    box-shadow: none;

    &:hover {
      background: #eee;
    }
  }
`;

export const DescriptionBlock = styled(Descriptions)`
  background-color: #ffffff;
  padding: 0;
  margin-top: 8px;
  font-size: 14px;
  color: #444;

  .ant-descriptions-item-label {
    font-weight: 600;
    color: #591c00;
  }

  .ant-descriptions-item-content {
    color: #333;
  }
`;

export const ChildrenSection = styled.div`
  flex: auto;
  width: 520px;
  background-color: #ffffff;
  padding: 15px;
  border-radius: 10px;
  border: 1px solid #ddd;
  display: flex;
  flex-direction: column;
  gap: 20px;

  h3 {
    font-size: 22px;
    font-weight: 600;
    color: #591c00;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    button {
      font-size: 14px;
      font-weight: 500;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;

export const ProfileRight = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 20px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

export const HeaderSection = styled.div`
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 20px;

  h1 {
    margin: 0;
    font-size: 28px;
    font-family: 'Jacques Francois', serif;
    color: #591c00;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
`;

export const ChildrenHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 22px;
    color: #591c00;
  }

  button {
    font-size: 14px;
    font-weight: 500;
    border: 1px solid #591c00;
    color: #591c00;

    &:hover {
      background-color: #a93804;
      color: white;
    }
  }
`;

export const AddChildButton = styled(Button)`
  border: 1px solid #426b1f !important;
  background-color: #426b1f;
  color: white !important;
  width: auto;

  &:hover {
    background-color: #629432 !important;
    color: white !important;
  }
`;

export const SaveEditedProfileButton = styled(Button)`
  display: inline-block;
  text-align: center;
  border: 1px solid #426b1f !important;
  background-color: #426b1f;
  color: white !important;
  width: 30%;

  &:hover {
    background-color: #629432 !important;
    color: white !important;
  }
`;

export const ChildCard = styled.div`
  border: 1px solid #9bb77d;
  border-radius: 10px;
  padding: 20px;
  background-color: #fafafa;
  position: relative;

  h3 {
    margin-bottom: 12px;
    font-size: 24px;
    font-family: 'Jacques Francois', serif;
    color: #591c00;
  }

  p {
    margin: 6px 0;
    font-size: 14px;
    color: #444;
  }

  .ant-btn-link {
    position: absolute;
    top: 10px;
    right: 20px;
    color: #591c00;
    font-weight: 500;
    border: 1px solid #591c00;
    border-radius: 5px;
    padding: 2px 7px;

    &:hover {
      color: #a93804 !important;
      border-color: #a93804;
    }
  }

  @media (max-width: 768px) {
    padding: 16px;
  }
`;
