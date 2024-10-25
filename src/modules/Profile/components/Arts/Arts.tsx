import {
    StyledArt,
    StyledArts,
    StyledButton,
    StyledCard,
    StyledContainer,
    StyledContainerTitle,
    StyledContent,
    StyledImg,
    StyledLine,
    StyledText,
    StyledTitle,
} from './styles';
import { artworksMock } from '@/constants/artworksMock';
import Plus from '@/assets/images/icons/plus.svg';
import { IUserInfo } from '@/types';
import React from 'react';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';

export const Arts = () => {
    const push = useNavigate();
    return (
        <>
            <StyledContainer>
                <StyledContent>
                    <StyledText>Artworks</StyledText>
                    <StyledButton onClick={() => push(LINK_TEMPLATES.MODIFY)}>
                        <StyledImg src={Plus} />
                    </StyledButton>
                </StyledContent>
                <StyledLine />
                <StyledArts>
                    {artworksMock.map((item: IUserInfo) => (
                        <StyledCard onClick={() => push(LINK_TEMPLATES.DETAILED())}>
                            <StyledArt path={item.img} />
                            <StyledContainerTitle>
                                <StyledTitle>{item.title}</StyledTitle>
                            </StyledContainerTitle>
                        </StyledCard>
                    ))}
                </StyledArts>
                {/* <StyledNoArts>
                    <StyledText>The user has not added artwork yet</StyledText>
                </StyledNoArts> */}
            </StyledContainer>
        </>
    );
};
