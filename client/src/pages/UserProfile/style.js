import { Upload } from "antd";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 10px 0;
  text-align: center;

  @media (max-width: 1023px) and (min-width: 768px) {
    font-size: 16px;
  }

  @media (max-width: 767px) {
    font-size: 15px;
  }
`;

export const WrapperContentProfile = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #ccc;
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
  gap: 20px;

  @media (max-width: 1023px) and (min-width: 768px) {
    width: 80%;
    padding: 15px;
  }

  @media (max-width: 767px) {
    width: 95%;
    padding: 10px;
  }
`;

export const WrapperLabel = styled.label`
  color: #000;
  font-size: 12px;
  line-height: 30px;
  font-weight: 600;
  width: 60px;

  @media (max-width: 767px) {
    width: 100%;
    font-size: 11px;
  }
`;

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 5px;
  }
`;

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;

  @media (max-width: 767px) {
    flex-direction: column;
    width: 100%;
    gap: 8px;
  }
`;

export const WrapperUploadFile = styled(Upload)`
  & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }

  & .ant-upload-list-item-name {
    display: none;
  }

  & .ant-upload-list-item-actions {
    display: none;
  }

  & .ant-upload-icon {
    display: none;
  }

  @media (max-width: 767px) {
    & .ant-upload.ant-upload-select.ant-upload-select-picture-card {
      width: 50px;
      height: 50px;
    }
  }
`;

export const WrapperContainer = styled.div`
  width: 1270px;
  margin: 0 auto;
  height: 500px;

  @media (max-width: 1023px) and (min-width: 768px) {
    width: 100%;
    padding: 0 20px;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 0 10px;
    height: auto;
  }
`;

export const WrapperInputBox = styled.div`
  width: 300px;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const AvatarImage = styled.img`
  height: 60px;
  width: 60px;
  border-radius: 50%;
  object-fit: cover;
  margin-top: 12px;

  @media (max-width: 767px) {
    height: 50px;
    width: 50px;
  }
`;

export const MessageSuccess = styled.div`
  color: green;
  margin-top: 10px;
  font-size: 10px;
  text-align: center;
`;

export const MessageError = styled.span`
  color: rgb(255, 66, 78);
  margin-top: 10px;
  text-align: center;
  font-size: 10px;
`;
