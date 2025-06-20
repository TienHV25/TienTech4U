import styled from 'styled-components'
import { Card } from 'antd'

export const WrapperCardStyled = styled(Card)`
    width:200px;
    & img {
      height: 200px;
      width: 200px;
    }
    .ant-card-body {
    padding: 16px; 
   
`
export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size:12px;
    line-height:3px;
    color: rgb(56,56,61);
    padding:0;
`

export const WrapperReportText = styled.div`
    font-size:10px;
    color: rgb(128,128,137);
    display:flex;
    line-height:3px;
    align-items:center;
    margin-top:12px;
`

export const WrapperPriceText = styled.div`
    font-size:16px;
    color: rgb(255,66,78);
    font-weight: 500;
    margin-top:6px;
`

export const WrapperDiscountText = styled.span`
    font-size:12px;
    color: rgb(255,66,78);
    font-weight: 500;
    margin-left:3px;
`
