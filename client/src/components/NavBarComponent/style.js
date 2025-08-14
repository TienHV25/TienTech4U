import styled from 'styled-components'

export const WrapperContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    gap: 6px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    flex-direction: row;
    flex-wrap: wrap;
    gap: 4px;
  }
`;

export const WrapperLableText = styled.h4`
  color: rgb(56, 56, 61);
  font-size: 16px;
  font-weight: 400px;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    font-size: 15px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    font-size: 14px;
    width: 100%;
    text-align: center;
  }
`;

export const WrapperTextValue = styled.div`
  color: rgb(56, 56, 61);
  font-weight: 400;
  padding: 5px;
  font-size: 14px;
  cursor: pointer;
  font-family: Inter, Arial, sans-serif;

  &:hover {
    color: white;
    background: rgb(118, 178, 218);
  }

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    font-size: 13px;
    padding: 4px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    font-size: 12px;
    padding: 3px 5px;
  }
`;

export const WrapperRating = styled.span`
  margin-left: 5px;
  font-size: 14px;
  font-weight: 400px;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    font-size: 13px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const WrapperPrice = styled.div`
  margin: 0;
  border-radius: 10px;
  color: rgb(56, 56, 61);
  background-color: rgb(238, 238, 238);
  width: fit-content;
  padding: 2px 0;

  /* Tablet */
  @media (max-width: 1023px) and (min-width: 768px) {
    padding: 2px 4px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    font-size: 12px;
    padding: 1px 3px;
  }
`;
