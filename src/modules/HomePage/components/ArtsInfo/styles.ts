import styled from "styled-components";

export const StyledContainer = styled.div`
  position: relative;
  height: 100vh;
  background-color: #9dbd61;
  padding-inline: 180px 38px;
  display: flex;
  align-items: center;
  gap: 106px;
  overflow-x: hidden;
`;

export const StyledBorder = styled.div`
  width: 1430px;
  height: 596px;
  border-radius: 25px;
  border: 1px solid #000;
  position: absolute;
  right: -20px;
`;

export const StyledImg = styled.img`
  width: 576px;
  height: 398px;
  border-radius: 16px;
`;

export const StyledP = styled.p`
  font-size: 25px;
`;

export const StyledLine = styled.div`
  width: 386px;
  height: 1px;
  background-color: #000;
  position: absolute;
  right: 0;
  top: 70%;
`;
