import styled from "styled-components";
import { TColorProps } from "./types";

export const StyledContainer = styled.div<TColorProps>`
  padding: 0 38px;
  height: 82px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: ${({ isWhite }) => (isWhite ? "#fff" : "#9dbd61")};
`;

export const StyledCircle = styled.div`
  width: 29px;
  height: 29px;
  border-radius: 100%;
  background-color: #000;
`;

export const StyledText = styled.h1`
  font-size: 50px;
`;
