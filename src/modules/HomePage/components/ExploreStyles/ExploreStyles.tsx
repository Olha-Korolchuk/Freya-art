import React from "react";
import {
  StyledCard,
  StyledCards,
  StyledContainer,
  StyledContainerGenre,
  StyledGenre,
  StyledImg,
  StyledText,
} from "./styles";
import { stylesContent } from "@/constants/exploreStyles";
import { IstyleContent } from "./types";

export const ExploreStyles = () => {
  return (
    <>
      <StyledContainer>
        <StyledText>Explore styles</StyledText>
        <StyledCards>
          {stylesContent.map((item: IstyleContent) => (
            <StyledCard areaName={item.text}>
              <StyledImg path={item.path}></StyledImg>
              <StyledContainerGenre>
                <StyledGenre>{item.text}</StyledGenre>
              </StyledContainerGenre>
            </StyledCard>
          ))}
        </StyledCards>
      </StyledContainer>
    </>
  );
};
