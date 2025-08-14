import { Button, Col, Image, Row } from "antd";
import styled from "styled-components";

export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;

    /* Tablet */
    @media (max-width: 1023px) and (min-width: 768px) {
        justify-content: center;
    }

    /* Mobile */
    @media (max-width: 767px) {
        justify-content: center;
        margin-bottom: 4px;
    }
`

export const WrapperStyleImageSmall = styled(Image)`
    border-radius: 5px;
    border: 2px solid
    ${({ $isSelected }) =>
      $isSelected ? 'rgb(11, 116, 229)' : 'rgba(0, 0, 0, 0.1)'};
    cursor: pointer;
    width: 80px;

    /* Mobile */
    @media (max-width: 767px) {
        width: 50px;
        height: 50px;
        object-fit: cover;
    }
`

export const WrapperInforProduct = styled.div`
    font-size:16px;
    font-weight:500;
    padding-top:15px;

    /* Mobile */
    @media (max-width: 767px) {
        font-size:14px;
        padding-top: 10px;
    }
`

export const WrapperInforProductSmall = styled.span`
    font-size:14px;
    margin-left: 5px;

    /* Mobile */
    @media (max-width: 767px) {
        font-size:12px;
        margin-left: 3px;
    }
`

export const WrapperStyledNameProduct = styled.h1`
    color:rgb(36,36,36);
    font-size:24px;
    font-weight:500;
    line-height:32px;
    word-break: break-word;

    /* Tablet */
    @media (max-width: 1023px) and (min-width: 768px) {
        font-size:20px;
    }

    /* Mobile */
    @media (max-width: 767px) {
        font-size:16px;
        line-height: 22px;
        margin-bottom: 8px;
    }
`

export const WrapperStyledTextProduct = styled.span`
    font-size:15px;
    line-height:24px;
    color:rgb(120,120,120);
    margin-left:5px;

    /* Mobile */
    @media (max-width: 767px) {
        font-size:12px;
        margin-left: 3px;
    }
`

export const WrapperPriceProduct = styled.div`
    color: rgb(255, 66, 78);
    
    /* Mobile */
    @media (max-width: 767px) {
        margin: 8px 0;
    }
`

export const WrapperPriceTextProduct = styled.h1`
    font-size:32px;
    line-height:40px;
    margin-right:8px;
    font-weight:500;
    display:flex;

    /* Tablet */
    @media (max-width: 1023px) and (min-width: 768px) {
        font-size:28px;
    }

    /* Mobile */
    @media (max-width: 767px) {
        font-size:20px;
        line-height: 28px;
        margin-right: 4px;
    }
`

export const WrapperAddresTittleProduct = styled.span`
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: rgb(39, 39, 42);

    /* Mobile */
    @media (max-width: 767px) {
        font-size: 14px;
        display: block;
        margin-top: 8px;
    }
`

export const WrapperAdressProduct = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    font-size: 14px;
    font-weight: 400;
    line-height: 150%;
    margin-top:10px;

    /* Mobile */
    @media (max-width: 767px) {
        font-size: 12px;
        margin-top: 5px;
        word-break: break-word;
    }
`

export const WrapperChangeAdress = styled.span`
    display: flex;
    align-items: center;
    cursor: pointer;
    gap: 4px;
    font-size: 16px;
    font-weight: 400;
    line-height: 150%;
    margin-top:10px;
    color: rgb(10, 104, 255);

    /* Mobile */
    @media (max-width: 767px) {
        font-size: 12px;
        margin-top: 3px;
        justify-content: flex-start;
    }
`

export const WrapperNumberOfProduct = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 10px;
    margin-bottom:10px;

    /* Mobile */
    @media (max-width: 767px) {
        font-size: 14px;
        margin-top: 12px;
        margin-bottom: 8px;
    }
`

export const WrapperQuantityContainer = styled.div`
    display: flex;
    align-items: center;
    
    /* Mobile */
    @media (max-width: 767px) {
        justify-content: flex-start;
        margin-bottom: 15px;
    }
`

export const WrapperButton = styled(Button)`
    font-size: 18px;
    border:1px solid rgb(166, 166, 176);
    margin:3px;
    border-radius: 4px;
    color:rgb(6, 36, 36);

    /* Mobile */
    @media (max-width: 767px) {
        font-size: 16px;
        padding: 0 8px;
        margin: 2px;
        min-width: 32px;
        height: 32px;
    }
`

export const WrapperNumButton = styled.span`
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgb(166, 166, 176);
    margin:3px;
    padding:5px 15px;

    /* Mobile */
    @media (max-width: 767px) {
        font-size: 14px;
        padding: 4px 12px;
        margin: 2px;
        min-width: 40px;
        display: inline-block;
    }
`

export const WrapperMainColImage = styled(Col)`
    padding: 16px;
    background-color: #fff;

    /* Mobile */
    @media (max-width: 767px) {
        padding: 8px;
        margin-bottom: 0;
    }
`

export const StyledImageMain = styled(Image)`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    width: 100%;
    
    /* Mobile */
    @media (max-width: 767px) {
        margin-bottom: 8px;
    }
`

export const WrapperRowImages = styled(Row)`
    padding-top: 10px;
    justify-content: space-between;
    background-color: #fff;

    /* Mobile */
    @media (max-width: 767px) {
        justify-content: flex-start;
        gap: 4px;
        padding-top: 8px;
    }
`

export const WrapperHighlightContainer = styled.div`
    padding: 10px;
    
    /* Mobile */
    @media (max-width: 767px) {
        padding: 8px 0;
        width: 100%;
    }
`

export const WrapperBottomSpacing = styled.div`
    margin-top: 10px;
    display: flex;
    align-items: center;

    /* Mobile */
    @media (max-width: 767px) {
        margin-top: 6px;
        align-items: flex-start;
    }
`

export const WrapperProductPriceSymbol = styled.span`
    font-size: 80%;
    line-height: 0.6;
    position: relative;
    vertical-align: baseline;
`

export const WrapperRowAddress = styled(Row)`
     /* Tablet */
    @media (max-width: 1023px) and (min-width: 768px) {
        display:flex;
        flex-direction:column;
    }

    /* Mobile */
    @media (max-width: 767px) {
        flex-direction: column;
        gap: 2px;
        margin-bottom: 8px;
    }
`

export const WrapperColAddress = styled(Col)`
    /* Mobile */
    @media (max-width: 767px) {
        width: 100% !important;
        margin-bottom: 2px;
    }
`

export const WrapperColChangeAddress = styled(Col)`
    /* Mobile */
    @media (max-width: 767px) {
        width: 100% !important;
        text-align: left;
    }
`

export const WrapperButtonGroup = styled.div`
    margin-top: 20px;
   
    /* Tablet */
    @media (max-width: 1023px) and (min-width: 768px) {
        flex-direction: column;
        gap: 10px;
        align-items: center;
        justify-content: center;
       
    }

    /* Mobile */
    @media (max-width: 767px) {
        flex-direction: column;
        gap: 8px;
        margin-top: 15px;
        width: 100%;
        
        button {
            width: 100% !important;
            max-width: none !important;
        }
    }
`