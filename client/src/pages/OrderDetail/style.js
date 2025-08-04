import styled from 'styled-components'

export const DetailWrapper = styled.div`
  padding: 40px 80px;
  background: #f8f8f8;
`

export const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 40px;
`

export const InfoBox = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
`

export const SectionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 12px;
`

export const ProductTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 6px rgba(0,0,0,0.1);
  th, td {
    padding: 12px 16px;
    text-align: center;
    border-bottom: 1px solid #eee;
  }
`

export const ProductRow = styled.tr`
  &:last-child td {
    border-bottom: none;
  }
`

export const ProductCell = styled.td`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ProductImage = styled.img`
  width: 50px;
  height: 50px;
  object-fit: cover;
`

export const ProductName = styled.div`
  font-weight: 500;
`

export const TotalRow = styled.tr`
  font-weight: bold;
  background: #fafafa;
`
