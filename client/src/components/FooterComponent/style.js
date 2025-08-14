import styled from 'styled-components'

export const WrapperFooter = styled.div`
   height: 50px;
   background-color: rgb(26, 148, 255);
   text-align: center; 
   padding-top: 40px;

   @media (max-width: 1023px) and (min-width: 768px) {
      height: auto;
      padding: 20px 10px;
   }

   @media (max-width: 767px) {
      height: auto;
      padding: 15px 5px;
   }
`

export const WrapperFooterText = styled.span`
   font-size: 14px;
   color: rgb(255 255 255 / var(--tw-text-opacity, 1));   

   @media (max-width: 1023px) and (min-width: 768px) {
      font-size: 13px;
      line-height: 1.4;
      display: inline-block;
   }

   @media (max-width: 767px) {
      font-size: 12px;
      line-height: 1.4;
      display: block; /* Cho xuống dòng nếu cần */
   }
`
