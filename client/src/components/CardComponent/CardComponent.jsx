import React from 'react'
import { StyleNameProduct, WrapperCardStyled, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled} from '@ant-design/icons';
import ProductImage from '../../assets/images/product.webp'

const CardComponent = (props) => {
  const {countInStock,description,image,name,price,rating,type,selled,discount} = props
  return (
  <WrapperCardStyled
    hoverable
    style={{ width: 200}}
    cover={<img alt="example" src={ProductImage} />}
    >
    <StyleNameProduct>{name}</StyleNameProduct>
    <WrapperReportText> 
      <span style={{marginRight:'4px'}}><span>{rating}</span><StarFilled style={{fontSize:'12px',color:'yellow',fontWeight:'bold'}}/></span>
      <span>| Đã bán {selled || 1000} +</span>
    </WrapperReportText>
    <WrapperPriceText>
      {price}đ
      <WrapperDiscountText>
        {discount || 5}%
      </WrapperDiscountText>
    </WrapperPriceText>

  </WrapperCardStyled>
  )
}

export default CardComponent
