import React, { useState , useEffect } from 'react';
import { useSelector , useDispatch } from 'react-redux'
import {updateOrderAmount,removeOrderProduct,removeOrderProductAll} from '../../redux/slides/orderSlide'
import {
  Container,
  Header,
  MainContent,
  ProductSection,
  ProductRow,
  ProductImage,
  ProductInfo,
  ProductName,
  QuantityControls,
  QuantityButton,
  QuantityInput,
  ProductTotal,
  DeleteIcon,
  SummarySection,
  SummaryRow,
  SummaryLabel,
  SummaryValue,
  TotalSection,
  TotalLabel,
  TotalAmount,
  TaxNote,
  CheckoutButton,
  ColumnHeader
} from './style';

const OrderPage = () => {
  const [selectedItems, setSelectedItems] = useState([])
  const order = useSelector((state) => state.order)
  const [countProduct,setCountProduct] = useState(0)
  const dispatch = useDispatch()

  useEffect(() => {
    if (order && order.orderItems) {
      setCountProduct(order.orderItems.length)
    }
  }, [order])

  useEffect(() => {
    if (order && order.orderItems) {
      setSelectedItems(order.orderItems.map(item => item.product))
    }
  }, [])

  const handleQuantityChange = (productId, value) => {
    if (value >= 1) {
      dispatch(updateOrderAmount({ productId, amount: value }))
    }
  }

  const decreaseQuantity = (productId, currentAmount) => {
    if (currentAmount > 1) {
        dispatch(updateOrderAmount({ productId, amount: currentAmount - 1 }))
      }
    }

  const increaseQuantity = (productId, currentAmount) => {
    dispatch(updateOrderAmount({ productId, amount: currentAmount + 1 }))
  }

  const handleDeleteProductOrder = (productId) => {
    dispatch(removeOrderProduct({productId}))
    setSelectedItems(selectedItems.filter(id => id !== productId))
  }

  const handleDeleteProductOrderAll = (selectedItems) => {
    dispatch(removeOrderProductAll({selectedItems}))
  }

  const handleSelectAll = () => {
    if (selectedItems.length === order.orderItems.length) {
      setSelectedItems([])
    } else {
      setSelectedItems(order.orderItems.map(item => item.product))
    }
  }

  const handleSelectItem = (productId) => {
    if (selectedItems.includes(productId)) {
      setSelectedItems(selectedItems.filter(id => id !== productId))
    } else {
      setSelectedItems([...selectedItems, productId])
    }
  }

  const totalPrice = order?.orderItems
  ?.filter(item => selectedItems.includes(item.product))
  ?.reduce((sum, item) => sum + item.amount * item.price, 0)

  return (
    <Container>
      <Header>Giỏ hàng</Header>
      
      <MainContent>
        <ProductSection>
          <div style={{ display:'flex',background:'white',borderRadius:'8px',marginBottom:'20px',
            padding:'10px',alignItems: 'center', fontSize: '14px', color: '#666'  }}>
            <div style={{ width: '200px', display: 'flex', alignItems: 'center' }}>
              <input 
                type="checkbox" 
                checked={selectedItems.length === order.orderItems.length}
                onChange={handleSelectAll}
                style={{ width: '16px', height: '16px', marginRight: '8px' }}
              />
              Tất cả ({countProduct} sản phẩm)
            </div>
            <div style={{ flex: 1, marginRight: '15px' }}></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Đơn giá
              </ColumnHeader>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Số lượng
              </ColumnHeader>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Thành tiền
              </ColumnHeader>
              <div style={{ width: '30px' }}><DeleteIcon onClick={() => handleDeleteProductOrderAll(selectedItems)}><i className="fas fa-trash"></i></DeleteIcon></div>
            </div>
          </div>
          {order && order?.orderItems.map((item, index) => (
            <ProductRow key={index}>
               <input 
                type="checkbox" 
                checked={selectedItems.includes(item?.product)} 
                onChange={() => handleSelectItem(item?.product)}
                style={{ width: '16px', height: '16px', marginRight: '8px' }}
              />
              <ProductImage>
                <img 
                  src={item?.image || "/api/placeholder/80/80"} 
                  alt="Product" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                />
              </ProductImage>
              
              <ProductInfo>
                <ProductName>{item?.name}</ProductName>
                <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
                  <div style={{ minWidth: '100px', textAlign: 'center', fontSize: '14px', color: '#333' }}>
                    {item?.price?.toLocaleString('vi-VN')} đ
                  </div>
                  
                  <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
                    <QuantityControls>
                      <QuantityButton onClick={() => decreaseQuantity(item?.product, item?.amount)}>-</QuantityButton>
                      <QuantityInput 
                        type="number" 
                        value={item?.amount}
                        onChange={(e) => handleQuantityChange(item?.product, parseInt(e.target.value) || 1)}
                      />
                      <QuantityButton onClick={() => increaseQuantity(item?.product, item?.amount)}>+</QuantityButton>
                    </QuantityControls>
                  </div>

                  <ProductTotal style={{ minWidth: '100px', textAlign: 'center' }}>
                     {(item?.amount * item?.price)?.toLocaleString('vi-VN')} đ
                  </ProductTotal>

                  <DeleteIcon onClick={() => handleDeleteProductOrder(item?.product)}><i className="fas fa-trash"></i></DeleteIcon>
                </div>
              </ProductInfo>
            </ProductRow>
          ))}
        </ProductSection>


        <SummarySection>
          <SummaryRow>
            <SummaryLabel>Tạm tính</SummaryLabel>
            <SummaryValue>{totalPrice.toLocaleString('vi-VN')} đ</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Giảm giá</SummaryLabel>
            <SummaryValue>0</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Thuế</SummaryLabel>
            <SummaryValue>0</SummaryValue>
          </SummaryRow>
          <SummaryRow>
            <SummaryLabel>Phí giao hàng</SummaryLabel>
            <SummaryValue>0</SummaryValue>
          </SummaryRow>
          
          <TotalSection>
            <TotalLabel>Tổng tiền</TotalLabel>
            <TotalAmount>{totalPrice.toLocaleString('vi-VN')} đ</TotalAmount>
            <TaxNote>(đã bao gồm VAT nếu có)</TaxNote>
            <CheckoutButton>Mua hàng</CheckoutButton>
          </TotalSection>
        </SummarySection>
      </MainContent>
    </Container>
  );
};

export default OrderPage;