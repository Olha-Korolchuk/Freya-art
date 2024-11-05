import { LINK_TEMPLATES } from '@/constants/link';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledContainer = styled.div`
    width: 100%;
    height: 100vh;
    background: rgb(255, 255, 255);
    background: linear-gradient(
        90deg,
        rgba(255, 255, 255, 1) 0%,
        rgba(157, 189, 97, 1) 50%,
        rgba(255, 255, 255, 1) 100%
    );
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 16px;
`;

const StyledTitle = styled.h1`
    font-size: 200px;
    line-height: 1;
`;
const StyledSubtitle = styled.p`
    font-size: 30px;
`;

const StyledLink = styled(Link)`
    border-radius: 30px;
    padding: 8px 36px;
    font-size: 20px;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    border: 1px solid #9dbd61;
`;

export const NotFoundPage = () => {
    return (
        <StyledContainer>
            <StyledTitle>404</StyledTitle>
            <StyledSubtitle>Page not found</StyledSubtitle>
            <StyledLink to={LINK_TEMPLATES.HOME}>Home</StyledLink>
        </StyledContainer>
    );
};
