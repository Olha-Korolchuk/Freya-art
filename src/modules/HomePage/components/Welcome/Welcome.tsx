import React from "react";
import {
  StyledArt,
  StyledCircle,
  StyledContainer,
  StyledFreya,
  StyledLine,
  StyledWelcome,
} from "./styles";

export const Welcome = () => {
  return (
    <StyledContainer>
      <StyledWelcome>
        <StyledFreya>Freya</StyledFreya>
        <StyledArt>Art</StyledArt>
      </StyledWelcome>
      <StyledCircle />
      <StyledLine />
    </StyledContainer>
  );
};
