import React from 'react'
import { StyleNameProduct, WrapperCardStyled, WrapperDiscountText, 
  WrapperPriceText, WrapperReportText,OutOfStockOverlay,ImageWrapper } from './style'
import { StarFilled } from '@ant-design/icons'
import { useNavigate } from 'react-router-dom'

const CardComponent = (props) => {
  const { image, name, price, rating, selled, discount, id, countInStock } = props
  const navigate = useNavigate()
  const isOutOfStock = countInStock === 0

  const handelDetailProduct = (id) => {
    if (!isOutOfStock && id) {
      navigate(`/product-details/${id}`)
    }
  }

  return (
    <WrapperCardStyled
      hoverable={!isOutOfStock}
      style={{
        width: 210,
        opacity: isOutOfStock ? 0.5 : 1,
        pointerEvents: isOutOfStock ? 'none' : 'auto',
        position: 'relative'
      }}
      onClick={() => handelDetailProduct(id)}
      cover={
        <ImageWrapper>
          {isOutOfStock && <OutOfStockOverlay>Hết hàng</OutOfStockOverlay>}
          <img alt="product" src={image} />
        </ImageWrapper>
      }
    >
      <StyleNameProduct>{name}</StyleNameProduct>
      <WrapperReportText>
        <span style={{ marginRight: '4px', fontSize: '12px' }}>
          <span>{rating}</span>
          <StarFilled style={{ fontSize: '12px', color: '#FFC107', fontWeight: 'bold' }} />
        </span>
        <span style={{ fontWeight: '600', fontSize: '12px' }}>| Đã bán {selled || 1000} +</span>
      </WrapperReportText>
      <WrapperPriceText>
        {price?.toLocaleString('vi-VN')}đ
        <WrapperDiscountText>
          {discount ? `-${discount}%` : ''}
        </WrapperDiscountText>
      </WrapperPriceText>
    </WrapperCardStyled>
  )
}

export default CardComponent
