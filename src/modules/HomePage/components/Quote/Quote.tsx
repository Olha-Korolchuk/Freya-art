import React, { FC } from 'react';
import { IQuoteProps } from './types';
import { StyledCircle, StyledContainer, StyledText } from './styles';

export const Quote: FC<IQuoteProps> = ({ isWhite, text }) => {
    return (
        <>
            <StyledContainer isWhite={isWhite}>
                <StyledCircle />
                <StyledText>{text}</StyledText>
                <StyledCircle />
            </StyledContainer>
        </>
    );
};
