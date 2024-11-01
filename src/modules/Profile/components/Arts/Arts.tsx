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
    StyledNoArts,
    StyledText,
    StyledTitle,
} from './styles';
import Plus from '@/assets/images/icons/plus.svg';
import { LINK_TEMPLATES } from '@/constants/link';
import { useNavigate } from 'react-router-dom';
import { IArtIterator } from '@/api/art/types';
import { IArt } from '@/types';
import { FC } from 'react';

interface IArtsProps {
    arts?: IArt[];
    isOwner: boolean;
}

export const Arts: FC<IArtsProps> = ({ arts, isOwner }) => {
    const push = useNavigate();

    return (
        <>
            <StyledContainer>
                <StyledContent>
                    <StyledText>Artworks</StyledText>
                    {isOwner && (
                        <StyledButton onClick={() => push(LINK_TEMPLATES.CREATE)}>
                            <StyledImg src={Plus} />
                        </StyledButton>
                    )}
                </StyledContent>
                <StyledLine />
                {arts?.length ? (
                    <StyledArts>
                        {arts?.map((item: IArtIterator) => (
                            <StyledCard onClick={() => push(LINK_TEMPLATES.DETAILED(item.id))} key={item.id}>
                                <StyledArt path={item.image} />
                                <StyledContainerTitle>
                                    <StyledTitle>{item.title}</StyledTitle>
                                </StyledContainerTitle>
                            </StyledCard>
                        ))}
                    </StyledArts>
                ) : (
                    <StyledNoArts>
                        <StyledText>The user has not added artwork yet</StyledText>
                    </StyledNoArts>
                )}
            </StyledContainer>
        </>
    );
};
