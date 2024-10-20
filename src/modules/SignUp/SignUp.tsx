import React from 'react';
import { FormInput } from '../../ui-library/inputs/FormInput';
import { StyledContent, StyledLink, StyledNavs, StyledTitle } from './styles';
import { LINK_TEMPLATES } from '../../constants/link';

export const SignUp = () => {
    return (
        <StyledContent>
            <StyledTitle>Sign up</StyledTitle>
            <FormInput name={'Email'} type="email" />
            <FormInput name={'Name'} type="text" />
            <FormInput name={'Password'} type="password" />
            <FormInput name={'Confirm password'} type="password" />

            <StyledNavs>
                <StyledLink to={LINK_TEMPLATES.HOME} isContained={true}>
                    Submit
                </StyledLink>
                <StyledLink to={LINK_TEMPLATES.SIGN_IN} isContained={false}>
                    Sign in
                </StyledLink>
            </StyledNavs>
        </StyledContent>
    );
};
