import { StyledArt, StyledCircle, StyledContainer, StyledFreya, StyledLine, StyledWelcome } from './styles';

export const Welcome = () => (
    <StyledContainer>
        <StyledWelcome>
            <StyledFreya>Freya</StyledFreya>
            <StyledArt>Art</StyledArt>
        </StyledWelcome>
        <StyledCircle />
        <StyledLine />
    </StyledContainer>
);
