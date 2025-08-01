import styled from 'styled-components';

export const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  background-color: #f8f9fa;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  min-height: 100vh;
`;

export const Header = styled.h2`
  font-size: 24px;
  color: #2e7d32;
  margin-bottom: 30px;
`;

export const MainContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
`;

export const ProductSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

`;

export const SectionBox = styled.div`
  background: white;
  padding-left:  24px;
  padding-right: 24px;
  padding-bottom: 16px;
  padding-top:  5px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.08);
`;

export const SectionTotal = styled.div`
  marginTop: '20px',
  padding: '16px',
  backgroundColor: '#fff4e5',
  border: '1px solid #ffd699',
  borderRadius: '8px',
  textAlign: 'right'
`;


export const SectionTitle = styled.h3`
  font-size: 20px;
  color: #333;
  margin-bottom: 12px;
`;

export const OptionBox = styled.div`  
  display: flex;
  flex-direction: column;
  padding: 12px 16px;
  border-left: 4px solid ${props => props.type === 'fast' ? '#1976d2' : 'orange'};
  background-color:   ${props => props.type === 'fast' ? 'rgb(240,248,255);' : '#faad141a'}; 
  border-radius: 6px;
`;

export const OptionLabel = styled.div`
  font-weight: bold;
  color: ${props => props.type === 'fast' ? '#1976d2' : '#555'};
  margin-bottom: 4px;
`;

export const OptionText = styled.div`
  font-size: 14px;
  color: #444;
`;

export const ProductRow = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  border-bottom: 1px solid #eee;
  padding: 15px;
  margin-top: 15px;
  background-color: white;
`;

export const ProductImage = styled.div`
  width: 80px;
  height: 80px;
  flex-shrink: 0;
  border-radius: 8px;
  overflow: hidden;
`;

export const ProductInfo = styled.div`
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;


`;

export const ProductName = styled.div`
  font-size: 16px;
  font-weight: 500;
  color: #333;
  width: 100%;
  margin-bottom: 8px;
`;

export const QuantityControls = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

export const ProductTotal = styled.div`
  font-weight: bold;
  color: #d32f2f;
  font-size: 14px;
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
`;