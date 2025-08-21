import styled from "styled-components";
import { Image } from 'antd';

export const MainContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: rgba(0, 0, 0, 0.53);
    padding: 0 20px;

    @media (max-width: 767px) {
        padding: 0 10px;
        height: 100vh;
        overflow-y: auto;
    }
`;

export const FormContainer = styled.div`
    width: 800px;
    height: 445px;
    border-radius: 6px;
    background: #fff;
    display: flex;

    @media (max-width: 1023px) and (min-width: 768px) {
        width: 700px;
        height: 400px;
    }

    @media (max-width: 767px) {
        width: 100%;
        max-width: 400px;
        height: auto;
        flex-direction: column;
        min-height: 500px;
    }
`;

export const WarpperContainerLeft = styled.div`
    width: 400px;
    padding: 40px 45px 24px;
    background: rgb(255, 255, 255);
    border-radius: 20px 0px 0px 20px;

    @media (max-width: 1023px) and (min-width: 768px) {
        width: 350px;
        padding: 30px 35px 20px;
    }

    @media (max-width: 767px) {
        width: 100%;
        padding: 30px 20px;
        border-radius: 20px 20px 0px 0px;
    }
`;

export const WarpperImage = styled(Image)`
    @media (max-width: 767px) {
        height: 120px !important;
        width: auto !important;
    }
`;

export const WarpperContainerRight = styled.div`
    background: rgb(222, 235, 255);
    width: 400px;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-direction: column;
    border-radius: 0px 20px 20px 0px;
    position: relative;

    @media (max-width: 1023px) and (min-width: 768px) {
        width: 350px;
    }

    @media (max-width: 767px) {
        width: 100%;
        padding: 30px 20px;
        border-radius: 0px 0px 20px 20px;
        min-height: 200px;
    }
`;

export const WarpperTextLoginLeft = styled.div`
    font-size: 24px;
    font-weight: 500;
    padding-top: 20px;

    @media (max-width: 1023px) and (min-width: 768px) {
        font-size: 22px;
        padding-top: 15px;
    }

    @media (max-width: 767px) {
        font-size: 20px;
        padding-top: 10px;
        text-align: center;
    }
`;

export const WarpperTextSmallLoginLeft = styled.div`
    font-size: 16px;
    font-weight: 400;
    margin: 10px 0 10px 0;

    @media (max-width: 1023px) and (min-width: 768px) {
        font-size: 15px;
    }

    @media (max-width: 767px) {
        font-size: 14px;
        text-align: center;
        margin: 10px 0;
    }
`;

export const WarpperTextLoginRight = styled.div`
    margin: 0px 0px 5px;
    color: rgb(10, 104, 255);
    font-size: 18px;
    font-weight: 500;
    line-height: 24px;

    @media (max-width: 1023px) and (min-width: 768px) {
        font-size: 16px;
        line-height: 22px;
    }

    @media (max-width: 767px) {
        font-size: 16px;
        line-height: 22px;
        text-align: center;
    }
`;

export const WarpperTextSmallLoginRight = styled.div`
    font-size: 14px;
    color: rgb(10, 104, 255);
    font-weight: 400;
    line-height: 20px;

    @media (max-width: 1023px) and (min-width: 768px) {
        font-size: 13px;
        line-height: 18px;
    }

    @media (max-width: 767px) {
        font-size: 12px;
        line-height: 18px;
        text-align: center;
    }
`;

export const InputWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px; 
    margin-top: 20px;

    @media (max-width: 1023px) and (min-width: 768px) {
        gap: 8px;
        margin-top: 15px;
    }

    @media (max-width: 767px) {
        gap: 12px;
        margin-top: 20px;
    }
`;

export const BackArrow = styled.div`
    width: 25px;
    height: 25px;
    cursor: pointer;
    
    img {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 767px) {
        align-self: flex-start;
        margin-bottom: 10px;
    }
`;

export const ErrorMessage = styled.span`
    color: rgb(255, 66, 78);
    margin-top: 20px;
    display: flex;
    font-size: 12px;

    @media (max-width: 1023px) and (min-width: 768px) {
        margin-top: 15px;
        font-size: 11px;
    }

    @media (max-width: 767px) {
        margin-top: 15px;
        font-size: 12px;
        text-align: center;
        justify-content: center;
    }
`;

export const ButtonContainer = styled.div`
    margin-top: 20px;
    display: flex;

    @media (max-width: 1023px) and (min-width: 768px) {
        margin-top: 15px;
    }

    @media (max-width: 767px) {
        margin-top: 20px;
        justify-content: center;
        
        button {
            width: 100% !important;
            max-width: 300px;
        }
    }
`;

export const LoginPromptContainer = styled.div`
    display: flex;
    margin-top: 40px;
    text-align: center;
    font-size: 14px;
    margin-left: 100px;

    @media (max-width: 1023px) and (min-width: 768px) {
        margin-top: 30px;
        font-size: 13px;
        margin-left: 70px;
    }

    @media (max-width: 767px) {
        margin-top: 30px;
        font-size: 14px;
        margin-left: 0;
        justify-content: center;
        flex-wrap: wrap;
    }
`;

export const LoginPromptText = styled.div`
    color: rgb(120, 120, 120);

    @media (max-width: 767px) {
        margin-bottom: 5px;
    }
`;

export const LoginLink = styled.div`
    color: rgb(13, 92, 182);
    cursor: pointer;
    margin-left: 5px;

    @media (max-width: 767px) {
        margin-left: 5px;
    }
`;

export const CloseButton = styled.div`
    position: absolute;
    width: 42px;
    height: 42px;
    cursor: pointer;
    top: -60px;
    right: -170px;
    
    img {
        width: 100%;
        height: 100%;
    }

    @media (max-width: 1023px) and (min-width: 768px) {
        width: 35px;
        height: 35px;
        top: -50px;
        right: -140px;
    }

    @media (max-width: 767px) {
        width: 30px;
        height: 30px;
        top: -40px;
        right: -50px;
    }
`;