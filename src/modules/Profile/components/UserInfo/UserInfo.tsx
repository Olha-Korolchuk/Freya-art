import Avatar from '@/assets/images/userAvatar.jpg';
import { StyledContainer, StyledEmail, StyledImg, StyledName, StyledText } from './styles';
import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export const UserInfo = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <StyledContainer>
            <StyledText>
                <StyledName>{user?.name}</StyledName>
                <StyledEmail>{user?.email}</StyledEmail>
            </StyledText>

            <StyledImg src={Avatar} />
        </StyledContainer>
    );
};