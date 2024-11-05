import { askedQuestions } from "@/constants/askedQuestions";
import { useState } from "react";
import {
  StyledAccordion,
  StyledAccordionContent,
  StyledAnswer,
  StyledContainer,
  StyledQuestion,
  StyledText,
} from "./styles";
import { IAskedQuestions } from "./types";

export const AskedQuestions = () => {
  const [selected, setSelected] = useState<number[]>([]);

  const handlerToggle = (id: number) => {
    const isExist = selected.includes(id);
    if (isExist) {
      setSelected((prev) => prev.filter((item) => item !== id));
    } else {
      setSelected((prev) => [...prev, id]);
    }
  };

  return (
    <StyledContainer data-cy="faq-container">
      <StyledText>Frequently Asked Questions</StyledText>
      <StyledAccordion>
        {askedQuestions.map((item: IAskedQuestions) => (
          <StyledAccordionContent
            key={item.id}
            onClick={() => handlerToggle(item.id)}
            data-cy={`question-${item.id}`}
          >
            <StyledQuestion>{item.question}</StyledQuestion>
            <StyledAnswer
              isOpen={selected.includes(item.id)}
              data-cy={`answer-${item.id}`}
            >
              <p>{item.answer}</p>
            </StyledAnswer>
          </StyledAccordionContent>
        ))}
      </StyledAccordion>
    </StyledContainer>
  );
};
