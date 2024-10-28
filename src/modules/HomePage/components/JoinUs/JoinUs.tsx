import { StyledContainer, StyledContent, StyledH1, StyledH2, StyledImg, StyledLink, StyledTexts } from './style';
import JoinUsBg from '@/assets/images/joinUsBg.png';
import JoinUsImg from '@/assets/images/joinUs.png';
import { LINK_TEMPLATES } from '@/constants/link';

export const JoinUs = () => {
    return (
        <StyledContainer path={JoinUsBg}>
            <StyledContent>
                <StyledImg src={JoinUsImg} />
            </StyledContent>
            <StyledTexts>
                <StyledH1>Join Us</StyledH1>
                <StyledH2>Be a Part of Freya</StyledH2>
                <StyledLink to={LINK_TEMPLATES.SIGN_UP}>Sign up</StyledLink>
            </StyledTexts>
        </StyledContainer>
    );
};
