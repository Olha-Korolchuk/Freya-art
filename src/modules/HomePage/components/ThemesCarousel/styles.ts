import styled from "styled-components";
import { TImgProps } from "./types";

export const StyledContainer = styled.div`
  height: 100vh;
  max-height: 630px;
  min-height: 470px;
  background-color: #9dbd61;
`;

export const StyledText = styled.h2`
  padding: 38px 38px 18px;
  font-size: 40px;
`;

export const StyledImg = styled.div<TImgProps>`
  width: 100%;
  height: 100%;
  min-height: 460px;
  min-width: 140px;
  border-radius: 16px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ path }) => `url('${path}')`};
`;

export const StyledContainerTitle = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  color: white;
  padding: 10px;
  text-align: center;
  background: rgb(0, 0, 0);
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.4) 0%,
    rgba(0, 0, 0, 0.8) 100%
  );
  border-bottom-left-radius: 16px;
  border-bottom-right-radius: 16px;
`;

export const StyledTitle = styled.h3`
  font-size: 40px;
`;
