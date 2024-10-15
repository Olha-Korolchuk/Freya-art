import { LINK_TEMPLATES } from '@/constants/link';
import { StyledHeader, StyledImg, StyledLink, StyledNavs } from './styles';
import ImageLogo from '@/assets/images/logo.png';
import React from 'react';

export const Header = () => {
    return (
        <StyledHeader>
            <StyledImg src={ImageLogo} />
            <StyledNavs>
                <StyledLink to={LINK_TEMPLATES.HOME} isContained={true}>
                    Sign in
                </StyledLink>
                <StyledLink to={LINK_TEMPLATES.SIGN_UP} isContained={false}>
                    Sign up
                </StyledLink>
            </StyledNavs>
        </StyledHeader>
    );
};
