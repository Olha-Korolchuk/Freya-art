import styled from "styled-components";
import { TCardProps, TImgProps } from "./types";

export const StyledContainer = styled.div`
  margin: 38px;
  height: 100vh;
  max-height: 600px;
  min-height: 360px;
`;

export const StyledText = styled.h2`
  font-size: 40px;
`;

export const StyledCards = styled.div`
  margin: auto;
  margin-top: 38px;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 246px 256px;
  grid-template-areas:
    "Fairy Nature Animal"
    "Fairy People People";
  grid-gap: 16px;
  width: 100%;
`;

export const StyledCard = styled.div<TCardProps>`
  position: relative;
  grid-area: ${({ areaName }) => areaName};
`;

export const StyledImg = styled.div<TImgProps>`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  background-image: ${({ path }) => `url('${path}')`};
`;

export const StyledContainerGenre = styled.div`
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

export const StyledGenre = styled.h3`
  font-size: 40px;
`;
