import { Upload } from 'antd'
import styled from 'styled-components'

export const WrapperHeader = styled.h1`
    color: #000;
    font-size: 14px;
    
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

  & .ant-upload-list-item-container {
    display: none;
  }
`