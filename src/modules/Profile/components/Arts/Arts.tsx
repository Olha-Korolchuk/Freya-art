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

export const Arts = () => {
    return (
        <>
            <StyledContainer>
                <StyledContent>
                    <StyledText>Artworks</StyledText>
                    <StyledButton>
                        <StyledImg src={Plus} />
                    </StyledButton>
                </StyledContent>
                <StyledLine />
                <StyledArts>
                    {artworksMock.map((item: IUserInfo) => (
                        <StyledCard>
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
