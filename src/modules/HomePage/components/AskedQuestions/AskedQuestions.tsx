import  { useState } from "react";
import {
  StyledAccordion,
  StyledAccordionContent,
  StyledAnswer,
  StyledContainer,
  StyledQuestion,
  StyledText,
} from "./styles";
import { askedQuestions } from "@/constants/askedQuestions";
import { IAskedQuestions } from "./types";

export const AskedQuestions = () => {
  const [selected, setSelected] = useState<number[]>([]);
  console.log(selected);
  const handlerToggle = (id: number) => {
    const isExist = selected.includes(id);
    if (isExist) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  return (
    <StyledContainer>
      <StyledText>Frequently Asked Questions</StyledText>
      <StyledAccordion>
        {askedQuestions.map((item: IAskedQuestions) => (
          <StyledAccordionContent onClick={() => handlerToggle(item.id)}>
            <StyledQuestion>{item.question}</StyledQuestion>
            <StyledAnswer isOpen={selected.includes(item.id)}>
              <p>{item.answer}</p>
            </StyledAnswer>
          </StyledAccordionContent>
        ))}
      </StyledAccordion>
    </StyledContainer>
  );
};
