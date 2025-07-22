import React, { useState } from 'react';
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
  const [quantity, setQuantity] = useState(1);
  const [selectAll, setSelectAll] = useState(true);
  const unitPrice = 211;
  const total = quantity * unitPrice;

  const handleQuantityChange = (value) => {
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
  };

  return (
    <Container>
      <Header>Giỏ hàng</Header>
      
      <MainContent>
        <ProductSection>
          <div style={{ display:'flex',background:'white',borderRadius:'8px',marginBottom:'20px',padding:'10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '15px', fontSize: '14px', color: '#666' }}>
              <input 
                type="checkbox" 
                checked={selectAll} 
                onChange={handleSelectAll}
                style={{ width: '16px', height: '16px' }}
              />
              Tất cả (1 sản phẩm)
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginLeft: 'auto' }}>
              <ColumnHeader style={{ minWidth: '80px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Đơn giá
              </ColumnHeader>
              <ColumnHeader style={{ minWidth: '100px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Số lượng
              </ColumnHeader>
              <ColumnHeader style={{ minWidth: '80px', textAlign: 'center', color: '#666', fontSize: '12px' }}>
                Thành tiền
              </ColumnHeader>
              <div style={{ width: '30px' }}></div>
            </div>
          </div>
          <ProductRow>
            <ProductImage>
              <img 
                src="/api/placeholder/80/80" 
                alt="Product" 
                style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '8px' }}
              />
            </ProductImage>
            
            <ProductInfo>
              <ProductName>name sản phẩm</ProductName>
              <div style={{ display: 'flex', alignItems: 'center', gap: '30px', marginLeft: 'auto' }}>
                <div style={{ minWidth: '80px', textAlign: 'center', fontSize: '14px' }}>
                  211
                </div>
                
                <div style={{ minWidth: '100px', display: 'flex', justifyContent: 'center' }}>
                  <QuantityControls>
                    <QuantityButton onClick={decreaseQuantity}>-</QuantityButton>
                    <QuantityInput 
                      type="number" 
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
                    />
                    <QuantityButton onClick={increaseQuantity}>+</QuantityButton>
                  </QuantityControls>
                </div>

                <ProductTotal style={{ minWidth: '80px', textAlign: 'center' }}>
                  {total}
                </ProductTotal>

                <DeleteIcon>🗑</DeleteIcon>
              </div>
            </ProductInfo>
          </ProductRow>
        </ProductSection>

        <SummarySection>
          <SummaryRow>
            <SummaryLabel>Tạm tính</SummaryLabel>
            <SummaryValue>0</SummaryValue>
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
            <TotalAmount>0213</TotalAmount>
            <TaxNote>(đã bao gồm VAT nếu có)</TaxNote>
            <CheckoutButton>Mua hàng</CheckoutButton>
          </TotalSection>
        </SummarySection>
      </MainContent>
    </Container>
  );
};

export default OrderPage;