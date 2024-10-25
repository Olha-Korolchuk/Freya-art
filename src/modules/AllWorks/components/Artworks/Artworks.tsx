import React from 'react';
import { StyledArt, StyledCard, StyledContainer, StyledContainerTitle, StyledTitle } from './styles';
import { artworksMock } from '@/constants/artworksMock';
import { IUserInfo } from '../../../../types';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';

export const Artworks = () => {
    const push = useNavigate();
    return (
        <StyledContainer>
            {artworksMock.map((item: IUserInfo) => (
                <StyledCard onClick={() => push(LINK_TEMPLATES.DETAILED())}>
                    <StyledArt path={item.img} />
                    <StyledContainerTitle>
                        <StyledTitle>{item.title}</StyledTitle>
                    </StyledContainerTitle>
                </StyledCard>
            ))}
        </StyledContainer>
    );
};
