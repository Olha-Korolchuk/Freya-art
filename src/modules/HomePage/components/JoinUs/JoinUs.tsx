import React from "react";
import { StyledContainer, StyledContent, StyledImg } from "./style";
import JoinUsBg from "@/assets/images/joinUsBg.png";
import JoinUsImg from "@/assets/images/joinUs.png";

export const JoinUs = () => {
  return (
    <StyledContainer path={JoinUsBg}>
      <StyledContent>
        <StyledImg src={JoinUsImg} />
      </StyledContent>
    </StyledContainer>
  );
};
