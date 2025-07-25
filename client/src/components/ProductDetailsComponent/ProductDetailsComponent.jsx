import { Col, Image, Row } from 'antd'
import React, { useState } from 'react'
import {
  WrapperAddresTittleProduct,
  WrapperAdressProduct,
  WrapperButton,
  WrapperChangeAdress,
  WrapperInforProduct,
  WrapperInforProductSmall,
  WrapperNumberOfProduct,
  WrapperNumButton,
  WrapperPriceProduct,
  WrapperPriceTextProduct,
  WrapperStyleColImage,
  WrapperStyledNameProduct,
  WrapperStyledTextProduct,
  WrapperStyleImageSmall
} from './style'
import checkLogo from '../../assets/images/checked.png'
import { StarFilled } from '@ant-design/icons'
import ButtonComponent from '../ButtonComponent/ButtonComponent'
import * as ProductService from '../../services/ProductService'
import { useQuery } from '@tanstack/react-query'

const ProductDetailsComponent = ({ idProduct }) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState()
  const [quantity, setQuantity] = useState(1)

  const {
    data: detaiProduct,
    isLoading,
    isError,
    error
  } = useQuery({
    queryKey: ['productDetail', idProduct],
    queryFn: () => ProductService.getDetailProduct(idProduct).then(res => res.data),
    enabled: !!idProduct,
    staleTime: 1000 * 60 * 5,
    retry: 1,
    refetchOnWindowFocus: false
  })

  if (isLoading) return <div style={{ padding: 20 }}>Đang tải thông tin sản phẩm...</div>
  if (isError) return <div style={{ padding: 20 }}>Lỗi khi tải sản phẩm: {error?.message}</div>

  const images = [
    detaiProduct.image,
    detaiProduct.image,
    detaiProduct.image,
    detaiProduct.image,
    detaiProduct.image,
    detaiProduct.image
  ]

  const increaseQuantity = () => {
    setQuantity(prev => prev + 1)
  }

  const decreaseQuantity = () => {
    setQuantity(prev => (prev > 1 ? prev - 1 : 1))
  }

  const handleClick = index => {
    setSelectedImageIndex(index)
  }

  return (
    <Row>
      <Col span={10} style={{ padding: '16px', backgroundColor: '#fff' }}>
        <Image
          src={detaiProduct?.image}
          alt="Image Product Details"
          preview={false}
          style={{ border: '1px solid rgba(0, 0, 0, 0.1)', borderRadius: '5px' }}
        />

        <Row style={{ paddingTop: '10px', justifyContent: 'space-between', backgroundColor: '#fff' }}>
          {images.map((src, index) => (
            <WrapperStyleColImage key={index} span={4}>
              <WrapperStyleImageSmall
                src={src}
                alt="Image Product Details Small"
                preview={true}
                $isSelected={selectedImageIndex === index}
                onClick={() => handleClick(index)}
                style={{ width: '80px' }}
              />
            </WrapperStyleColImage>
          ))}
          <div style={{ padding: '10px' }}>
            <WrapperInforProduct>Đặc điểm nổi bật</WrapperInforProduct>
            <div style={{ marginTop: '10px' }}>
              <Image src={checkLogo} alt="check logo" preview={false} style={{ height: '16px' }} />
              <WrapperInforProductSmall style={{ marginLeft: '5px' }}>
                {detaiProduct?.description}
              </WrapperInforProductSmall>
            </div>
          </div>
        </Row>
      </Col>

      <Col span={14} style={{ padding: '16px', backgroundColor: '#fff' }}>
        <WrapperStyledNameProduct>{detaiProduct?.name}</WrapperStyledNameProduct>
        <div>
          <WrapperStyledTextProduct>{detaiProduct?.rating}</WrapperStyledTextProduct>
          {[...Array(Math.round(detaiProduct?.rating || 0))].map((_, index) => (
            <StarFilled
              key={index}
              style={{ fontSize: '12px', color: 'rgb(253,216,54)', marginLeft: '5px' }}
            />
          ))}
          <WrapperStyledTextProduct>({detaiProduct?.countInStock})</WrapperStyledTextProduct>
          <WrapperStyledTextProduct>| Đã bán 1000+</WrapperStyledTextProduct>
        </div>
        <WrapperPriceProduct>
          <WrapperPriceTextProduct>
            {(detaiProduct?.price * quantity)?.toLocaleString('vi-VN')}
            <span
              style={{
                fontSize: '80%',
                lineHeight: '0.6',
                position: 'relative',
                verticalAlign: 'baseline'
              }}
            >
              ₫
            </span>
          </WrapperPriceTextProduct>
        </WrapperPriceProduct>
        <div>
          <WrapperAddresTittleProduct>Thông tin vận chuyển</WrapperAddresTittleProduct>
        </div>
        <div>
          <Row>
            <Col span={20}>
              <WrapperAdressProduct> Giao đến Q. 1, P. Bến Nghé, Hồ Chí Minh</WrapperAdressProduct>
            </Col>
            <Col span={4}>
              <WrapperChangeAdress>Đổi địa chỉ</WrapperChangeAdress>
            </Col>
          </Row>
        </div>
        <WrapperNumberOfProduct>Số Lượng</WrapperNumberOfProduct>
        <div>
          <WrapperButton onClick={decreaseQuantity}>-</WrapperButton>
          <WrapperNumButton>{quantity}</WrapperNumButton>
          <WrapperButton onClick={increaseQuantity}>+</WrapperButton>
        </div>
        <div style={{ marginTop: '20px', display: 'flex' }}>
          <ButtonComponent
            size={40}
            styleButton={{
              background: 'rgb(255, 66, 78)',
              borderRadius: '4px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500',
              color: 'rgb(255, 255, 255)',
              height: '40px',
              width: '300px',
              fontSize: '16px'
            }}
            textButton={'Chọn Mua'}
          ></ButtonComponent>

          <ButtonComponent
            size={40}
            styleButton={{
              background: 'rgb(255, 255, 255)',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: '500',
              color: 'rgb(10, 104, 255)',
              height: '40px',
              width: '300px',
              fontSize: '16px',
              border: '1px solid',
              marginLeft: '20px'
            }}
            textButton={'Mua Trước Trả Sau'}
          ></ButtonComponent>
        </div>
      </Col>
    </Row>
  )
}

export default ProductDetailsComponent
