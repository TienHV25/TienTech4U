import { Row, Col } from "antd";
import styled from 'styled-components'
import { HomeOutlined, ShoppingCartOutlined } from '@ant-design/icons';

export const WrapperHeader = styled(Row)`
   padding: 10px 120px;
   background-color: rgb(26, 148, 255);
   align-items:center;
   flex-wrap: nowrap;

   @media (max-width: 1023px) {
      padding: 10px 40px;
   }

   @media (max-width: 767px) {
      flex-direction: column;
      padding: 10px 20px;
      gap: 10px;
      text-align: center;
   }
`

export const WrapperTextHeader = styled.span`
   font-size:23px;
   color:#fff;
   font-weight:bold;
   text-align:center;
   margin-left:50px;
   cursor:pointer;

   @media (max-width: 1023px) {
      margin-left: 20px;
      font-size: 20px;
   }

   @media (max-width: 767px) {
      margin-left: 0;
      font-size: 18px;
   }
`

export const WrapperLogoText = styled.span`
   cursor: pointer;
`

export const WrapperAccountHeader = styled.div`
   display:flex;
   align-items:center;
   color:#fff;
   gap: 10px;
   margin-left:30px;

   @media (max-width: 1023px) {
      gap: 8px;
      margin-left: 15px;
   }

   @media (max-width: 767px) {
      margin-left: 0;
      justify-content: center;
      flex-wrap: wrap;
   }
`

export const WrapperIconText = styled.div`
   display: flex;
   align-items: center;
   cursor: pointer;

   @media (max-width: 767px) {
      flex-direction: column;
      font-size: 12px;
   }
`

export const WrapperTextHeaderSmall = styled.span`
   font-size:14px;
   color:#fff;
   margin-left:10px;
   line-height: 1.5;

   @media (max-width: 767px) {
      margin-left: 0;
      font-size: 12px;
   }
`

export const WrapperTextHeaderSmallLogin = styled.span`
   font-size:14px;
   color:#fff;
   margin-left:10px;
   line-height: 1.5;
   display:flex;
   flex-direction:column;
   align-items:center;
   gap: 1px;
   cursor: pointer;

   @media (max-width: 767px) {
      margin-left: 0;
      font-size: 12px;
   }
`

export const WrapperContentPopUp = styled.p`
   cursor: pointer;
   text-align: center;
   &:hover {
      color: rgb(26, 148,255);
   }
`

export const WrapperCol8 = styled(Col)`
   display: flex;
   gap: 20px;

   @media (max-width: 1023px) {
      gap: 10px;
   }

   @media (max-width: 767px) {
      flex-direction: column;
      gap: 8px;
      align-items: center;
   }
`

export const AvatarImage = styled.img`
   height: 32px;
   width: 32px;
   border-radius: 50%;
   object-fit: cover;
`

export const HomeIcon = styled(HomeOutlined)`
   font-size: 23px;

   @media (max-width: 767px) {
      font-size: 20px;
   }
`

export const CartIcon = styled(ShoppingCartOutlined)`
   font-size: 23px;
   color: #fff;
   margin-left: 20px;

   @media (max-width: 767px) {
      margin-left: 0;
      font-size: 20px;
   }
`

export const ChevronDownIcon = styled.i.attrs(() => ({
   className: "fas fa-chevron-down"
}))`
`
