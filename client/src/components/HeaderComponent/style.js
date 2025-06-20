import { Row } from "antd";
import styled from 'styled-components'

export const WrapperHeader = styled(Row) `
   padding: 10px 120px;
   background-color: rgb(26, 148, 255);
   align-items:center;
   flex-wrap: nowrap;
`

export const WrapperTextHeader = styled.span `
   font-size:23px;
   color:#fff;
   font-weight:bold;
   text-align:center;
   margin-left:50px;
  
`
export const WrapperAccountHeader = styled.div `
   display:flex;
   align-items:center;
   color:#fff;
   gap: 10px;
   margin-left:30px;
`
export const WrapperIconText = styled.div`
   display: flex;
   align-items: center;
   cursor: pointer;
`

export const WrapperTextHeaderSmall = styled.span `
   font-size:14px;
   color:#fff;
   margin-left:10px;
   line-height: 1.5;
`

export const WrapperTextHeaderSmallLogin = styled.span `
   font-size:14px;
   color:#fff;
   margin-left:10px;
   line-height: 1.5;
`

export const WrapperContentPopUp = styled.p`
   cursor: pointer;
   text-align: center;
   &:hover {
      color: rgb(26, 148,255);
   }
`

