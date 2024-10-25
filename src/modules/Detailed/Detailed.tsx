import {
    StyledArt,
    StyledAuthor,
    StyledBGImg,
    StyledBlock,
    StyledCategory,
    StyledContainer,
    StyledContent,
    StyledDescription,
    StyledExit,
    StyledExitImg,
    StyledIcon,
    StyledImg,
    StyledInfo,
    StyledTexts,
    StyledTitle,
    StyledUpdate,
} from './styles';
import React from 'react';
import Art from '@/assets/images/themesCarousel_2.png';
import Background from '@/assets/images/achiveCounterBg.png';
import Pensil from '@/assets/images/icons/pencil.svg';
import Exit from '@/assets/images/icons/arrow-exit.svg';
import { useNavigate } from 'react-router-dom';
import { LINK_TEMPLATES } from '@/constants/link';

export const Detailed = () => {
    const push = useNavigate();
    return (
        <StyledContainer>
            <StyledBGImg src={Background} />
            <StyledExit onClick={() => push(-1)}>
                <StyledExitImg src={Exit} />
            </StyledExit>
            <StyledArt>
                <StyledImg src={Art} />

                <StyledContent>
                    <StyledTexts>
                        <StyledTitle>Title</StyledTitle>
                        <StyledAuthor>Author</StyledAuthor>
                        <StyledDescription>
                            Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has
                            been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
                            galley of type and scrambled it to make a type specimen book. It has survived not only five
                            centuries, but also the leap into electronic typesetting, remaining essentially unchanged.
                        </StyledDescription>
                    </StyledTexts>

                    <StyledBlock>
                        <StyledCategory>
                            <StyledInfo>Type</StyledInfo>
                            <StyledInfo>Genre</StyledInfo>
                        </StyledCategory>
                        <StyledUpdate onClick={() => push(LINK_TEMPLATES.MODIFY)}>
                            <StyledIcon src={Pensil} />
                        </StyledUpdate>
                    </StyledBlock>
                </StyledContent>
            </StyledArt>
        </StyledContainer>
    );
};
