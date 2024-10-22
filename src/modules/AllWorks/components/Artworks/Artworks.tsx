import React from 'react';
import { StyledArt, StyledCard, StyledContainer, StyledContainerTitle, StyledTitle } from './styles';
// import { artworksMock } from '@/constants/artworksMock';
// import { artworksMock } from '@/';
import { IUserInfo } from '../../../../types';

export const Artworks = () => {
    return (
        <StyledContainer>
            {artworksMock.map((item: IUserInfo) => (
                <StyledCard>
                    <StyledArt path={item.img} />
                    <StyledContainerTitle>
                        <StyledTitle>{item.title}</StyledTitle>
                    </StyledContainerTitle>
                </StyledCard>
            ))}
        </StyledContainer>
    );
};
