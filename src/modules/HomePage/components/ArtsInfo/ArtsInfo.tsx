import React from "react";
import ImageArtsInfo from "@/assets/images/artsInfo.png";
import {
  StyledBorder,
  StyledContainer,
  StyledImg,
  StyledLine,
  StyledP,
} from "./styles";

export const ArtsInfo = () => {
  return (
    <>
      <StyledContainer>
        <StyledBorder />
        <StyledImg src={ImageArtsInfo} />
        <StyledP>
          Discover a curated selection of contemporary and classic masterpieces
          from artists worldwide. Whether you're an art enthusiast or a seasoned
          collector, our gallery invites you to explore the world through the
          lens of creativity.
        </StyledP>
        <StyledLine />
      </StyledContainer>
    </>
  );
};
