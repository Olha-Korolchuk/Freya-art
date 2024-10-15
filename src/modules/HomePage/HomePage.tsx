import React from "react";
import { Welcome } from "./components/Welcome";
import { Quote } from "./components/Quote";
import { ArtsInfo } from "./components/ArtsInfo";
import { ExploreStyles } from "./components/ExploreStyles";
import { ThemesCarousel } from "./components/ThemesCarousel";
import { AchiveCounters } from "./components/AchieveCounters";
import { JoinUs } from "./components/JoinUs";
import { AskedQuestions } from "./components/AskedQuestions";

export const HomePage = () => {
  return (
    <>
      <Welcome />
      <Quote isWhite={true} text={'"Where Art Speaks to the Soul."'}></Quote>
      <ArtsInfo></ArtsInfo>
      <ExploreStyles></ExploreStyles>
      <Quote isWhite={false} text={"What is Freya?"}></Quote>
      <AchiveCounters />
      <ThemesCarousel></ThemesCarousel>
      <JoinUs />
      <AskedQuestions />
    </>
  );
};
