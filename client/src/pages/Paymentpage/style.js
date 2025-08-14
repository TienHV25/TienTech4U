import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;

  @media (max-width: 1023px) {
    padding: 15px;
  }

  @media (max-width: 767px) {
    padding: 10px;
  }
`;

export const Header = styled.h1`
  font-size: 18px;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
  padding: 5px 0;

  @media (max-width: 767px) {
    font-size: 16px;
    margin-bottom: 15px;
  }
`;

export const MainContent = styled.div`
  display: flex;
  gap: 80px;
  align-items: flex-start;

  @media (max-width: 1023px) {
    gap: 40px;
  }

  @media (max-width: 767px) {
    flex-direction: column;
    gap: 20px;
  }
`;

export const ProductSection = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  flex: 1;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

export const SectionBox = styled.div`
  background: white;
  border-radius: 6px;
  padding: 15px;
  border: 1px solid #ddd;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    padding: 12px;
    margin-bottom: 15px;
  }
`;

export const SectionTitle = styled.h4`
  font-size: 14px;
  margin-bottom: 10px;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const OptionBox = styled.div`
  border: 1px solid ${props => props.type === 'fast' ? '#d6e4ff' : props.type === 'gojek' ? '#ffd6e7' : '#d9d9d9'};
  background-color: ${props => props.type === 'fast' ? '#f0f5ff' : props.type === 'gojek' ? '#fff0f6' : '#f5f5f5'};
  border-radius: 6px;
  padding: 12px;
  margin-bottom: ${(props) => (props.$last ? '0' : '10px')};
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    padding: 10px;
  }
`;

export const Radio = styled.input`
  margin-right: 8px;
`;

export const OptionLabel = styled.span`
  font-weight: 600;
  margin-right: 6px;
  color: ${props => props.type === 'fast' ? '#1890ff' : props.type === 'gojek' ? '#fa541c' : '#333'};

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const OptionText = styled.span`
  font-weight: 400;
  color: #333;

  @media (max-width: 767px) {
    font-size: 13px;
  }
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

  @media (max-width: 767px) {
    padding: 8px;
    margin-bottom: 12px;
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

  @media (max-width: 767px) {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }
`;

export const ProductInfo = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  justify-content: space-between;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

export const ProductName = styled.div`
  font-size: 14px;
  color: #333;
  margin-bottom: 5px;
  font-weight: 500;
  flex: 1;
  margin-right: 15px;

  @media (max-width: 767px) {
    font-size: 13px;
    margin-right: 0;
    margin-bottom: 3px;
  }
`;

export const ProductPrice = styled.div`
  font-size: 13px;
  color: #4a90e2;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const ColumnHeader = styled.div`
  font-size: 12px;
  color: #666;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 11px;
  }
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  background: white;

  @media (max-width: 767px) {
    margin-top: 5px;
  }
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

  @media (max-width: 767px) {
    width: 24px;
    height: 24px;
    font-size: 12px;
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
  
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
  
  &[type=number] {
    -moz-appearance: textfield;
  }

  @media (max-width: 767px) {
    width: 30px;
    height: 24px;
    font-size: 12px;
  }
`;

export const ProductTotal = styled.div`
  font-size: 14px;
  color: #ff4757;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 13px;
  }
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

  @media (max-width: 767px) {
    font-size: 14px;
    width: 25px;
  }
`;

export const SummarySection = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  flex-shrink: 0;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  width: 30%;

  @media (max-width: 1023px) {
    width: 35%;
    padding: 15px;
  }

  @media (max-width: 767px) {
    width: 100%;
    padding: 15px;
  }
`;

export const SummaryRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
  
  &:last-child {
    margin-bottom: 0;
  }

  @media (max-width: 767px) {
    margin-bottom: 10px;
  }
`;

export const SummaryLabel = styled.div`
  font-size: 14px;
  color: #666;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const SummaryValue = styled.div`
  font-size: 14px;
  color: #333;
  font-weight: 500;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const TotalSection = styled.div`
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  @media (max-width: 767px) {
    margin-top: 15px;
    padding-top: 15px;
  }
`;

export const TotalLabel = styled.div`
  font-size: 14px;
  color: #666;
  margin-bottom: 8px;

  @media (max-width: 767px) {
    font-size: 13px;
  }
`;

export const TotalAmount = styled.div`
  font-size: 20px;
  color: #ff4757;
  font-weight: 600;
  margin-bottom: 5px;

  @media (max-width: 767px) {
    font-size: 18px;
  }
`;

export const TaxNote = styled.div`
  font-size: 11px;
  color: #999;
  margin-bottom: 20px;

  @media (max-width: 767px) {
    font-size: 10px;
    margin-bottom: 15px;
  }
`;

export const CheckoutButtonSuccess = styled.button`
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

  @media (max-width: 767px) {
    padding: 10px 0;
    font-size: 13px;
  }
`;

export const CheckoutButtonFail = styled.button`
  background:rgba(97, 92, 93, 0.33);
  color: white;
  border: none;
  padding: 12px 0;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: not-allowed;
  width: 100%;
  transition: background-color 0.2s;
  
  &:hover {
    background: rgba(97, 92, 93, 0.33);
  }
  
  &:active {
    background: rgba(97, 92, 93, 0.33);
  }

  @media (max-width: 767px) {
    padding: 10px 0;
    font-size: 13px;
  }
`;