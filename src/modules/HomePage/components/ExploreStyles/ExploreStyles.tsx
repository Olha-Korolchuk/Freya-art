import React from 'react';
import {
    StyledCard,
    StyledCards,
    StyledContainer,
    StyledContainerGenre,
    StyledGenre,
    StyledImg,
    StyledText,
} from './styles';
import { stylesContent } from '@/constants/exploreStyles';
import { IstyleContent } from './types';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';

export const ExploreStyles = () => {
    const push = useNavigate();
    return (
        <>
            <StyledContainer>
                <StyledText>Explore styles</StyledText>
                <StyledCards>
                    {stylesContent.map((item: IstyleContent) => (
                        <StyledCard areaName={item.text} onClick={() => push(LINK_TEMPLATES.ALL_WORKS())}>
                            <StyledImg path={item.path} />
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
