import styled from 'styled-components'
import { Card } from 'antd'

export const WrapperCardStyled = styled(Card)`
    width:200px;
    & img {
      height: 200px;
      width: 200px;
      margin-top : 15px;
    }
    .ant-card-body {
    padding: 16px; 
   
`
export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size:14px;
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
export const OutOfStockOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255,255,255,0.7);
  color: red;
  font-weight: bold;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 16px;
  z-index: 2;
  border-radius: 6px;
`

export const ImageWrapper = styled.div`
  position: relative;
  width: 100%;
  height: auto;
`

