import styled from 'styled-components';
import { IOpenable } from './types';

export const StyledContainer = styled.div`
    width: 100%;
    min-height: 75vh;
    padding: 38px;
    background-color: #9dbd61;
`;

export const StyledText = styled.h2`
    font-size: 40px;
`;

export const StyledAccordion = styled.div`
    margin-top: 38px;
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 14px;
`;

export const StyledAccordionContent = styled.div`
    position: relative;
    width: 100%;
`;

export const StyledQuestion = styled.div`
    padding: 14px 40px 14px 14px;
    background-color: #fff;
    font-size: 27px;
    cursor: pointer;
`;

export const StyledAnswer = styled.div<IOpenable>`
    padding: 4px 18px;
    font-size: 22px;
    display: grid;
    overflow: hidden;
    transition: grid-template-rows 200ms;
    grid-template-rows: ${({ isOpen }) => (isOpen ? 1 : 0)}fr;
    & p {
        min-height: 0;
    }
`;
