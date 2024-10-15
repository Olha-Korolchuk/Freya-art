import React from "react";
import {
  StyledContainer,
  StyledContent,
  StyledH1,
  StyledH2,
  StyledImg,
  StyledLink,
  StyledTexts,
} from "./style";
import JoinUsBg from "@/assets/images/joinUsBg.png";
import JoinUsImg from "@/assets/images/joinUs.png";

export const JoinUs = () => {
  return (
    <StyledContainer path={JoinUsBg}>
      <StyledContent>
        <StyledImg src={JoinUsImg} />
      </StyledContent>
      <StyledTexts>
        <StyledH1>Join Us</StyledH1>
        <StyledH2>Be a Part of Freya</StyledH2>
        <StyledLink>Sign up</StyledLink>
      </StyledTexts>
    </StyledContainer>
  );
};
