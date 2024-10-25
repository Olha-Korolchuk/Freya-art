import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { TLinkProps } from './types';

export const StyledHeader = styled.header`
    padding: 0 38px;
    width: 100%;
    height: 80px;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const StyledImg = styled.img`
    width: 70px;
`;

export const StyledNavs = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
`;

export const StyledLink = styled(Link)<TLinkProps>`
    border-radius: 30px;
    padding: 8px 36px;
    font-size: 20px;
    text-decoration: none;
    color: #000;
    ${({ isContained }) => (isContained ? 'background-color: #9dbd61' : 'border: 1px solid #9dbd61')}
`;

export const StyledNav = styled(Link)`
    font-size: 20px;
    text-decoration: none;
    color: #000;
    border: none;
    cursor: pointer;
`;

export const StyledButton = styled.button<TLinkProps>`
    cursor: pointer;
    font-size: 20px;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1px;
    border: none;
    ${({ isContained }) => (isContained ? 'background-color: #9dbd61' : 'background-color: #fff')}
`;

export const StyledAvatar = styled.img`
    height: 40px;
    border-radius: 100%;
`;
