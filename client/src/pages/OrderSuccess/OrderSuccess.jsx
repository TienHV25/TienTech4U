import React, { useState , useEffect } from 'react'
import {removeOrderProductAll} from '../../redux/slides/orderSlide'
import { useDispatch } from 'react-redux'
import {
  Container,
  Header,
  MainContent,
  ProductSection,
  SectionBox,
  SectionTitle,
  OptionBox,
  OptionLabel,
  OptionText,
  ProductRow,
  ProductImage,
  ProductInfo,
  ProductName,
  QuantityControls,
  ProductTotal,
  SectionTotal

} from './style';
import { useLocation } from 'react-router-dom';
const OrderSuccess = () => {
  const location = useLocation()
  const {delivery,payment,selectedItems,totalPrice} = location.state || {}
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(selectedItems.length)
    dispatch(removeOrderProductAll({ selectedItems }))
  }, [])

  return (
    <Container>
      <Header><i className="fas fa-clipboard-check" style={{marginRight:"10px"}}></i>Đơn hàng đã đặt thành công</Header>
      
      <MainContent>
        <ProductSection style={{ width: '100%' }}>
           <SectionBox>
            <SectionTitle>Phương thức giao hàng</SectionTitle>

            <OptionBox type="fast">
              <OptionLabel type="fast">{delivery}</OptionLabel>
              <OptionText>Giao hàng tiết kiệm</OptionText>
            </OptionBox>
          </SectionBox>

          <SectionBox>
            <SectionTitle>Phương thức thanh toán</SectionTitle>
            <OptionBox>
              <OptionText>{payment}</OptionText>
            </OptionBox>
          </SectionBox>
             {selectedItems && selectedItems?.map((item, index) => (
                <ProductRow key={index}>
                <ProductImage>
                    <img 
                    src={item?.image || "/api/placeholder/80/80"} 
                    alt="Product" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
                    />
                </ProductImage>
                
                <ProductInfo>
                    <ProductName>{item?.name}</ProductName>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                   
                    <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
                        <QuantityControls>
                        <div style={{fontSize:'14px'}}>Số Lượng:</div>
                        <div style={{fontSize:'14px'}}>
                           <span>{item?.amount}</span>
                       </div>
                        </QuantityControls>
                    </div>
                    
                    <div style={{fontSize:'14px'}}>Thành Tiền:</div>
                    <ProductTotal style={{ minWidth: '100px', textAlign: 'center' }}>
                        {(item?.amount * item?.price)?.toLocaleString('vi-VN')} đ
                    </ProductTotal>
    
                    </div>
                </ProductInfo>
                </ProductRow>
                    ))}
          <SectionTotal>
             <span style={{fontSize:'16px',color:'#d32f2f',fontWeight:'600'}}>Tổng tiền: {totalPrice.toLocaleString('vi-VN')} đ</span>
          </SectionTotal>
          <div style={{
            marginTop: '16px',
            padding: '16px',
            backgroundColor: '#e8f5e9',
            borderRadius: '8px',
            border: '1px solid #c8e6c9',
            fontSize: '14px',
            lineHeight: '1.6',
            color: '#2e7d32'
            }}>
            Đơn hàng sẽ được giao đến cho quý khách trong khoảng từ <strong>2–3 ngày</strong> kể từ ngày đặt hàng. <br />
            Xin chân thành cảm ơn quý khách vì đã tin tưởng và lựa chọn sản phẩm của chúng tôi!
          </div>
        </ProductSection>

      </MainContent>
    </Container>
  );
};

export default OrderSuccess;