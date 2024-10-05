import React from "react";
import {
  StyledContainer,
  StyledImg,
  StyledLine,
  StyledText,
  StyledImgBackground,
} from "./styles";
import AchiveCounter from "@/assets/images/achiveCounter.png";
import AchiveCounterBg from "@/assets/images/achiveCounterBg.png";

export const AchiveCounters = () => {
  return (
    <StyledContainer>
      <StyledText>
        A global network of 1,000 partner galleries 100,000 Artists
      </StyledText>
      <StyledLine />
      <StyledImg src={AchiveCounter}></StyledImg>
      <StyledImgBackground src={AchiveCounterBg}></StyledImgBackground>
    </StyledContainer>
  );
};
