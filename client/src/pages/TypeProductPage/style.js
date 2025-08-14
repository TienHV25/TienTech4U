import styled from 'styled-components'
import { Col, Row } from 'antd'

export const WrapperContainer = styled.div`
  background-color: #efefef;
  height: calc(100vh - 64px);

  /* Mobile */
  @media (max-width: 767px) {
    height: auto; 
  }
`;

export const WrapperRow = styled(Row)`
  padding: 0 120px;
  background-color: #efefef;
  flex-wrap: nowrap;
  padding-top: 10px;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    padding: 0 40px; 
  }

  /* Mobile */
  @media (max-width: 767px) {
    padding: 0 10px;
    flex-wrap: wrap;
  }
`;

export const WrapperColNav = styled(Col)`
  background-color: #fff;
  margin-right: 15px;
  padding: 10px;
  border-radius: 6px;
  height: fit-content;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    margin-right: 10px;
    flex: 0 0 25%;
    max-width: 25%;
  }

  /* Mobile */
  @media (max-width: 767px) {
    flex: 0 0 100%;
    max-width: 100%;
    margin-right: 0;
    margin-bottom: 10px;
  }
`;

export const WrapperColProducts = styled(Col)`
  display: flex;
  align-items: center;
  gap: 20px;
  flex-wrap: wrap;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    gap: 15px;
    flex: 0 0 75%;
    max-width: 75%;
  }

  /* Mobile */
  @media (max-width: 767px) {
    gap: 10px;
    flex: 0 0 100%;
    max-width: 100%;
    justify-content: center; 
  }
`;

export const WrapperPagination = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-top: 5px;
  margin-bottom: 20px;

  /* Mobile */
  @media (max-width: 767px) {
    margin-top: 15px;
  }
`;
