import { Button, Col, Image } from "antd";
import styled from "styled-components";


export const WrapperStyleColImage = styled(Col)`
    flex-basis: unset;
    display: flex;
`

export const WrapperStyleImageSmall = styled(Image)`
    border:1px solid rgba(0, 0, 0, 0.1);
    border-radius:5px;
    border: 2px solid
    ${({ $isSelected }) =>
      $isSelected ? 'rgb(11, 116, 229)' : 'rgba(0, 0, 0, 0.1)'};
    cursor: pointer;
`
export const WrapperInforProduct = styled.div`
    font-size:16px;
    font-weight:500;
    padding-top:15px;
`
export const WrapperInforProductSmall = styled.span`
    font-size:14px;
    marginLeft:'5px'
`
export const WrapperStyledNameProduct = styled.h1`
    color:rgb(36,36,36);
    font-size:24px;
    font-weight:500;
    line-height:32px;
    word-break: break-word;

`

export const WrapperStyledTextProduct = styled.span`
    font-size:15px;
    line-height:24px;
    color:rgb(120,120,120);
    margin-left:5px;
`

export const WrapperPriceProduct = styled.div`
    color: rgb(255, 66, 78);
`

export const WrapperPriceTextProduct = styled.h1`
    font-size:32px;
    line-height:40px;
    margin-right:8px;
    font-weight:500;
    display:flex;
`

export const WrapperAddresTittleProduct = styled.span`
    font-weight: 600;
    font-size: 16px;
    line-height: 150%;
    color: rgb(39, 39, 42);
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
`

export const WrapperNumberOfProduct = styled.div`
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
    line-height: 150%;
    margin-top: 10px;
    margin-bottom:10px;
`

export const WrapperButton = styled(Button)`
    font-size: 18px;
    border:1px solid rgb(166, 166, 176);
    margin:3px;
    border-radius: 4px;
    color:rgb(6, 36, 36);
`

export const WrapperNumButton = styled.span`
    font-size: 16px;
    text-align: center;
    border-radius: 4px;
    border: 1px solid rgb(166, 166, 176);
    margin:3px;
    padding:5px 15px;
`
