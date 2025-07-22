import React from 'react'
import { StyleNameProduct, WrapperCardStyled, WrapperDiscountText, WrapperPriceText, WrapperReportText } from './style'
import {StarFilled} from '@ant-design/icons';
import ProductImage from '../../assets/images/product.webp'
import { useNavigate } from 'react-router-dom'

const CardComponent = (props) => {
  const {countInStock,description,image,name,price,rating,type,selled,discount,id} = props
  const navigate = useNavigate()
  const handelDetailProduct = (id) => {
    if(id)
    {
      navigate(`/product-details/${id}`)
    }
  }
  
  const calcDiscount = (countInStock) => {
    if (countInStock > 1000) return 30;
    if (countInStock > 500) return 20;
    if (countInStock > 100) return 10;
    if (countInStock > 10) return 5;
    return 0;
  }
  
  return (
  <WrapperCardStyled
    hoverable
    style={{ width: 210}}
    onClick={() => handelDetailProduct(id)}
    cover={<img alt="example" src={image} 
    />}
    >
    <StyleNameProduct>{name}</StyleNameProduct>
    <WrapperReportText> 
      <span style={{marginRight:'4px',fontSize:'12px'}}><span >{rating}</span>
      <StarFilled style={{fontSize:'12px',color:'#FFC107',fontWeight:'bold'}}/></span>
      <span style={{fontWeight:'600',fontSize:"12px"}}>| Đã bán {selled || 1000} +</span>
    </WrapperReportText>
    <WrapperPriceText>
      {price?.toLocaleString('vi-VN')}đ
      <WrapperDiscountText>
       -{discount || calcDiscount(countInStock)}%
      </WrapperDiscountText>
    </WrapperPriceText>

  </WrapperCardStyled>
  )
}

export default CardComponent
