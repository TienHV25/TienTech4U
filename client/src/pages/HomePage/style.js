import styled from 'styled-components'
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

export const WrapperTypeProduct = styled.div`
   display: flex;
   align-items: center;
   gap: 16px;
   justify-content: flex-start;
   height: 44px;

   @media (max-width: 1023px) and (min-width: 768px) {
      gap: 12px;
      height: auto; 
      flex-wrap: wrap;
   }

   @media (max-width: 767px) {
      gap: 8px;
      height: auto;
      flex-wrap: wrap;
   }
`

export const WrapperButtonMore = styled(ButtonComponent)`
   &:hover {
     color:#fff;
     background: rgb(13,92,182);
     span {
        color:#fff;
     }
   }
`

export const WrapperButtonEnd = styled(ButtonComponent)`
   &:hover {
     cursor: not-allowed;
   }
`

export const WrapperTypeProductContainer = styled.div`
   padding: 0 120px;
   background-color: white;

   @media (max-width: 1023px) and (min-width: 768px) {
      padding: 0 40px;
   }

   @media (max-width: 767px) {
      padding: 0 10px;
   }
`

export const WrapperSliderContainer = styled.div`
   background-color: #efefef;
   padding: 0 120px;

   @media (max-width: 1023px) and (min-width: 768px) {
      padding: 0 40px;
   }

   @media (max-width: 767px) {
      padding: 0 40px;
   }
`

export const WrapperProductsContainer = styled.div`
   margin-top: 35px;
   display: flex;
   gap: 15px;
   flex-wrap: wrap;

   @media (max-width: 1023px) and (min-width: 768px) {
      gap: 12px;
   }

   @media (max-width: 767px) {
      gap: 8px;
      padding: 0 65px;
   }
`

export const WrapperButtonContainer = styled.div`
   text-align: center;
`
