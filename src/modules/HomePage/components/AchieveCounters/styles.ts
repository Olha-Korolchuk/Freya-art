import styled from "styled-components";

export const StyledContainer = styled.div`
  padding: 38px;
  position: relative;
  text-align: center;
  height: 100vh;
`;

export const StyledText = styled.h2`
  font-size: 40px;
`;

export const StyledLine = styled.div`
  position: absolute;
  top: calc(50% + 38px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 508px;
  height: 1px;
  z-index: 2;
  background-color: #000;
`;

export const StyledImg = styled.img`
  position: absolute;
  top: calc(50% + 38px);
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 2;
  border-radius: 16px;
`;

export const StyledImgBackground = styled.img`
  position: absolute;
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: top;
  height: 568px;
  bottom: 0;
  left: 0;
  z-index: 1;
  border-radius: 16px;
`;
