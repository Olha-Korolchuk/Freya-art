import styled from 'styled-components';

export interface IStyledLinkProps {
    isContained: boolean;
}

export const StyledContent = styled.form`
    display: flex;
    flex-direction: column;
    padding: 38px;
    gap: 4px;
    text-align: center;
`;

export const StyledTitle = styled.h1`
    font-size: 50px;
    color: #fff;
    text-shadow: 4px 6px 4px rgba(0, 0, 0, 0.5);
`;

export const StyledButton = styled.button<IStyledLinkProps>`
    border-radius: 30px;
    padding: 8px 36px;
    font-size: 20px;
    text-decoration: none;
    color: #000;
    background-color: #fff;
    ${({ isContained }) => (isContained ? 'background-color: #9dbd61' : 'border: 1px solid #9dbd61')}
`;

export const StyledNavs = styled.div`
    display: flex;
    gap: 38px;
    justify-content: center;
`;
