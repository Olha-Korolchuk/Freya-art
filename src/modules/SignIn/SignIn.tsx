import React from 'react';
import { FormInput } from '../../ui-library/inputs/FormInput';
import { StyledContent, StyledLink, StyledTitle } from './styles';
import { LINK_TEMPLATES } from '../../constants/link';

export const SignIn = () => {
    return (
        <StyledContent>
            <StyledTitle>Sign in</StyledTitle>
            <FormInput name={'Name'} type="text" />
            <FormInput name={'Password'} type="password" />

            <StyledLink to={LINK_TEMPLATES.HOME} isContained={true}>
                Submit
            </StyledLink>
            <StyledLink to={LINK_TEMPLATES.SIGN_UP} isContained={false}>
                Sign up
            </StyledLink>
        </StyledContent>
    );
};
