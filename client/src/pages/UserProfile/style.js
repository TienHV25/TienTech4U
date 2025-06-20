import { Upload } from "antd";
import styled from "styled-components";


export const WrapperHeader = styled.h1`
  color: #000;
  font-size: 18px;
  margin: 10px 0;
`

export const WrapperContentProfile = styled.div`
  display:flex;
  flex-direction: column;
  border:1px solid #ccc;
  width: 500px;
  margin: 0 auto;
  padding:20px;
  border-radius:10px;
  gap:20px;
`

export const WrapperLabel = styled.label`
  color: #000;
  font-size: 12px;
  line-height: 30px;
  font-weight: 600;
  width: 60px;
`

export const WrapperInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;

`

export const WrapperButton = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
`

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
`

