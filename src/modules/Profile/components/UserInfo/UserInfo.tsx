import Avatar from '@/assets/images/userAvatar.jpg';
import { StyledContainer, StyledEmail, StyledImg, StyledName, StyledText } from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../store/store';

export const UserInfo = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return (
        <StyledContainer>
            <StyledText>
                <StyledName data-cy="user-name">{user?.name}</StyledName>
                <StyledEmail data-cy="user-email">{user?.email}</StyledEmail>
            </StyledText>

            <StyledImg src={Avatar} data-cy="user-avatar" />
        </StyledContainer>
    );
};
