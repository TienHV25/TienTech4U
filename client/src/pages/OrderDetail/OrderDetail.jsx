import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import { useSelector } from 'react-redux'
import * as OrderService from '../../services/OrderService'
import {
  DetailWrapper,
  InfoGrid,
  InfoBox,
  SectionTitle,
  ProductTable,
  ProductRow,
  ProductImage,
  ProductName,
  ProductCell,
} from './style'
import {getDetailProduct} from '../../services/ProductService'

const OrderDetail = () => {
  const { id } = useParams()
  const user = useSelector(state => state.user)
  const [discount,setDiscount] = useState({})
  
  const fetchOrderById = async () => {
    const res = await OrderService.getOrderById(user?.access_token, id)
    return res.data;
  }

  const { data: order, isLoading } = useQuery({
    queryKey: ['orderDetail', id],
    queryFn: fetchOrderById,
    enabled: !!user?.access_token && !!id
  })

useEffect(() => {
  const fetchDiscounts = async () => {
    if (!order?.orderItems) return

    let discounts = {}
    const filteredItems = order.orderItems.filter(item => item?.product)

    for (const item of filteredItems) {
      const productDetail = await getDetailProduct(item.product);
      if (productDetail && productDetail.data) {
        const discountAmount = (item.price * productDetail.data.discount) / 100 || 0
        discounts[item._id] = discountAmount * item.amount
      }
    }

    setDiscount(discounts)
  }

  fetchDiscounts()
  }, [order])


  if (isLoading || !order) return <p>Đang tải chi tiết đơn hàng...</p>

  const { shippingAddress, paymentMethod, isPaid, orderItems, shippingPrice,totalPrice} = order

  return (
    <DetailWrapper>
      <h2>Chi tiết đơn hàng</h2>
      <InfoGrid>
        <InfoBox>
          <SectionTitle>Địa chỉ người nhận</SectionTitle>
          <p><b>{shippingAddress.fullName}</b></p>
          <p>{shippingAddress.address}</p>
          <p>Điện thoại: {shippingAddress.phone}</p>
        </InfoBox>

        <InfoBox>
          <SectionTitle>Hình thức giao hàng</SectionTitle>
          <p><b style={{ color: 'orange' }}>FAST</b> Giao hàng tiết kiệm</p>
          <p>Phí giao hàng: {shippingPrice.toLocaleString()} VND</p>
        </InfoBox>

        <InfoBox>
          <SectionTitle>Hình thức thanh toán</SectionTitle>
          <p>{paymentMethod}</p>
          <p style={{ color: isPaid ? 'green' : 'orange' }}>
            {isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
          </p>
        </InfoBox>
      </InfoGrid>

      <ProductTable>
        <thead>
          <tr>
            <th>Sản phẩm</th>
            <th>Giá</th>
            <th>Số lượng</th>
            <th>Giảm giá</th>
            <th>Tạm tính</th>
          </tr>
        </thead>
        <tbody>
          {orderItems.map((item, index) => (
            <ProductRow key={index}>
              <ProductCell>
                <ProductImage src={item.image} />
                <ProductName>{item.name}</ProductName>
              </ProductCell>
              <td>{item.price.toLocaleString()} đ</td>
              <td>{item.amount}</td>
              <td>{discount[item._id]?.toLocaleString()} đ</td>
              <td>{((item.price * item.amount) - discount[item._id])?.toLocaleString()} đ</td>
            </ProductRow>
          ))}
        </tbody>
      </ProductTable>
    </DetailWrapper>
  )
}

export default OrderDetail
