import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
`;

export const Header = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  padding: 5px 0;
`;

export const MainContent = styled.div`
  display: flex;
  gap: 80px;
  align-items: flex-start;
`;

export const ProductSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

export const ProductRow = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background: white;
  padding: 10px;
  border-radius: 8px;

  &:last-child {
    margin-bottom: 0;
  }
`;

export const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  background: #f5f5f5;
  border-radius: 8px;
  overflow: hidden;
  flex-shrink: 0;
  margin-right: 15px;
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;
`;

export const ProductName = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
  flex: 1;
  margin-right: 15px;
`;

export const ProductPrice = styled.div`
  font-size: 13px;
  color: #4a90e2;
`;

export const ColumnHeader = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 500;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: white;
`;

export const QuantityButton = styled.button`
  background: white;
  border: none;
  width: 28px;
  height: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: #666;
  font-size: 14px;
  
  &:hover {
    background: #f5f5f5;
  }
  
  &:active {
    background: #e0e0e0;
  }
`;

export const QuantityInput = styled.input`
  border: none;
  width: 35px;
  height: 28px;
  text-align: center;
  font-size: 13px;
  outline: none;
  border-left: 1px solid #e0e0e0;
  border-right: 1px solid #e0e0e0;
  background: white;
  
  /* Remove spinner arrows */
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }
`;

export const ProductTotal = styled.div`
  font-size: 14px;
  color: #ff4757;
  font-weight: 500;
`;

export const DeleteIcon = styled.button`
  background: none;
  border: none;
  font-size: 16px;
  cursor: pointer;
  color: #ccc;
  padding: 5px;
  width: 30px;
  
  &:hover {
    color: #ff4757;
  }
`;

export const SummarySection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width:30%
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

export const SummaryLabel = styled.div`
  font-size: 14px;
  color: #666;
`;

export const SummaryValue = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;
`;

export const TotalSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;
`;

export const TotalLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;
`;

export const TotalAmount = styled.div`
  font-size: 20px;
  color: #ff4757;
  font-weight: 600;
  margin-bottom: 5px;
`;

export const TaxNote = styled.div`
  font-size: 11px;
  color: #999;
  margin-bottom: 20px;
`;

export const CheckoutButton = styled.button`
  background: #ff4757;
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background: #ff3838;
  }
  
  &:active {
    background: #e63946;
  }
`;