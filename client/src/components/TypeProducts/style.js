import styled from 'styled-components'

export const WrapperTypeName = styled.h2`
  font-weight: 600;
  padding: 5px;
  margin: 5px;
  font-size: 14px;
  cursor: pointer;
  font-family: Inter, Arial, sans-serif;

  &:hover {
    color: white;
    background: rgb(118, 178, 218);
  }

  /* Tablet */
  @media (max-width: 1024px) {
    font-size: 13px;
    padding: 4px;
    margin: 2px;
  }

  /* Mobile */
  @media (max-width: 767px) {
    font-size: 12px;
    padding: 3px;
    margin: 3px;
  }
`;
