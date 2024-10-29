import { LINK_TEMPLATES } from '@/constants/link';
import { StyledAvatar, StyledButton, StyledHeader, StyledImg, StyledLink, StyledNavs } from './styles';
import ImageLogo from '@/assets/images/logo.png';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';
import { useNavigate } from 'react-router-dom';
import { signOut } from 'firebase/auth';
import { auth } from '../../../../api/firebase';
import { setUser } from '../../../../store/reducers/auth/authSlice';
import Avatar from '@/assets/images/userAvatar.jpg';
import LogOut from '@/assets/images/icons/logout.svg';

export const Header = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const push = useNavigate();
    const dispatch = useDispatch();
    const handlerLogout = () => {
        signOut(auth);
        dispatch(setUser(null));
        push(LINK_TEMPLATES.HOME);
    };

    return (
        <StyledHeader>
            <StyledImg src={ImageLogo} onClick={() => push(LINK_TEMPLATES.HOME)} />
            <StyledNavs>
                {!!user ? (
                    <>
                        <StyledButton isContained={true} onClick={() => push(LINK_TEMPLATES.PROFILE())}>
                            <StyledAvatar src={Avatar} />
                        </StyledButton>
                        <StyledButton isContained={false} onClick={handlerLogout}>
                            <StyledAvatar src={LogOut} />
                        </StyledButton>
                    </>
                ) : (
                    <>
                        <StyledLink to={LINK_TEMPLATES.SIGN_IN} isContained={true}>
                            Sign in
                        </StyledLink>
                        <StyledLink to={LINK_TEMPLATES.SIGN_UP} isContained={false}>
                            Sign up
                        </StyledLink>
                    </>
                )}
            </StyledNavs>
        </StyledHeader>
    );
};
