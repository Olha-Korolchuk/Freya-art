import {
    StyledArt,
    StyledCircle,
    StyledContainer,
    StyledFreya,
    StyledLine,
    StyledWelcome,
} from "./styles";

export const Welcome = () => {
    return (
        <StyledContainer data-cy="styled-container">
            <StyledWelcome>
                <StyledFreya data-cy="styled-freya">Freya</StyledFreya>
                <StyledArt data-cy="styled-art">Art</StyledArt>
            </StyledWelcome>
            <StyledCircle data-cy="styled-circle" />
            <StyledLine data-cy="styled-line" />
        </StyledContainer>
    );
};
