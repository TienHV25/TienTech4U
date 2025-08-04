import styled from 'styled-components';

export const Wrapper = styled.div`
  padding: 1rem;
  background: #f9f9fb;
`

export const OrderCard = styled.div`
  background: white;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: 0 0 10px rgba(0,0,0,0.1);
  max-width: 700px;
  margin: 1rem auto;
`

export const OrderStatus = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin-bottom: 1rem;
`

export const OrderItem = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
  margin-bottom: 15px;
`

export const OrderImage = styled.img`
  width: 60px;
  height: 60px;
  object-fit: cover;
`

export const OrderTitle = styled.div`
  font-weight: bold;
  flex-grow: 1;
  font-size:12px;
`

export const OrderPrice = styled.div`
  font-size: 14px;
  color: #333;
`

export const OrderTotal = styled.div`
  color: red;
  font-weight: bold;
  text-align: right;
  font-size: 14px;
  margin-bottom: 15px;
`

export const ButtonGroup = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`

export const ActionButton = styled.button`
  background: ${(props) => (props.type === 'cancel' ? 'white' : '#1890ff')};
  color: ${(props) => (props.type === 'cancel' ? '#000' : '#fff')};
  border: ${(props) => (props.type === 'cancel' ? '1px solid #ccc' : 'none')};
  padding: 6px 12px;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    opacity: 0.9;
  }
`
