import { useQuery } from '@tanstack/react-query'
import React, { useEffect, useState } from 'react'
import * as OrderService from '../../services/OrderService'
import { useSelector } from 'react-redux'
import { Button, Modal } from "antd"
import { toast, Toaster } from 'react-hot-toast'
import { useQueryClient } from '@tanstack/react-query'
import {
  Wrapper,
  OrderCard,
  OrderStatus,
  OrderItem,
  OrderImage,
  OrderTitle,
  OrderPrice,
  OrderTotal,
  ButtonGroup,
  ActionButton,
} from './style'
import { useNavigate } from 'react-router-dom'

const UserOrder = () => {
  const user = useSelector((state) => state.user)
  const navigate = useNavigate()
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState({})
  const queryClient = useQueryClient()

  const fetchMyOrder = async () => {
    const res = await OrderService.getOrderDetails(user?.access_token, user?.id)
    return res.data;
  }

  const { data } = useQuery({
    queryKey: ['orders', user?.id],
    queryFn: fetchMyOrder,
    enabled: !!user?.access_token && !!user?.id,
  })
 
  const handleDeleteProduct = async () => {
    if (!selectedOrder?._id) {
      toast.error('Không tìm thấy đơn hàng để hủy')
      return
    }

    try {
      const res = await OrderService.cancelOrder(user?.access_token,selectedOrder)
      if (res.status === 'OK') {
        toast.success('Hủy đơn hàng thành công')
        setIsDeleteModalOpen(false) 
        queryClient.invalidateQueries(['orders', user?.id])
      } else {
         toast.error('Hủy đơn hàng thất bại')
      }
    } catch (error) {
      toast.error('Có lỗi xảy ra khi hủy đơn hàng')
      console.error(error)
    }  
  }

  return (
    <Wrapper>
       <Toaster position="bottom-right" reverseOrder={false} toastOptions={{
          style: {
          fontSize: '16px',
          padding: '12px 16px',
        },
        }}/>
      <h1 style={{textAlign:'center'}}>Đơn hàng của tôi</h1>
      {data?.length === 0 ? (
      <p style={{ textAlign: 'center', marginTop: '20px', fontStyle: 'italic',fontSize:'16px' }}>
        Bạn chưa có đơn hàng nào. Hãy mua sắm ngay để trải nghiệm dịch vụ của chúng tôi!
      </p>
       ) : 
      (
      data?.map((order, idx) => (
        <OrderCard key={idx}>
          <OrderStatus>
             <div style={{fontWeight: 'bold',marginBottom:'10px'}} >Trạng thái</div>
             <div style={{display:'flex',gap:'12px',marginBottom:'10px'}}>
              <span style={{fontWeight: 'bold',marginBottom:'2px'}}>Giao hàng:</span>
              <span style={{color:'red'}}>{order?.isDelivered === false ? 'Chưa giao hàng' : 'Đã giao hàng'}</span>
             </div>
             <div style={{display:'flex',gap:'5px',marginBottom:'10px'}}>
              <span style={{fontWeight: 'bold',marginBottom:'10px'}}>Thanh toán:</span>
              <span style={{color:'red'}}>{order?.isPaid === false ? 'Chưa thanh toán' : 'Đã thanh toán'}</span>
            </div>
          </OrderStatus>

          {order?.orderItems?.map((product, idx) => (
            <OrderItem key={idx}>
              <OrderImage src={product.image} alt={product.name} />
              <OrderTitle>{product.name}</OrderTitle>
              <OrderPrice>{product.price.toLocaleString()} VND</OrderPrice>
            </OrderItem>
          ))}

          <OrderTotal>
            Tổng tiền: <span>{order.totalPrice.toLocaleString()} VND</span>
          </OrderTotal>

          <ButtonGroup>
            <ActionButton type="cancel" onClick={() => {
              setIsDeleteModalOpen(true) 
              setSelectedOrder(order)  
            }}>
              Hủy đơn hàng
            </ActionButton>
            <ActionButton onClick={() => navigate(`/order-detail/${order._id}`)}>Xem chi tiết</ActionButton>
          </ButtonGroup>
        </OrderCard>
      ))
      )}
      <Modal title="Xác nhận xóa" open={isDeleteModalOpen} onCancel={() => setIsDeleteModalOpen(false)}
          footer={[
            <Button key="cancel" onClick={() => setIsDeleteModalOpen(false)}>Không</Button>,
            <Button key="delete" type="primary" danger onClick={handleDeleteProduct}>Có</Button>,
          ]}>
          <p>Bạn có chắc chắn muốn hủy đơn hàng này không?</p>
      </Modal>
    </Wrapper>
  )
}

export default UserOrder
