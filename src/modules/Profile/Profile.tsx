import { UserInfo } from './components/UserInfo/UserInfo';
import { Arts } from './components/Arts';
import { Loader } from '@/components/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useParams } from 'react-router-dom';
import { useGetUserArtsQuery, useGetUserProfile } from '@/api/user';
import styled from 'styled-components';

const StyledLoading = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    height: calc(100vh - 80px);
    background-color: #e4edd4;
    padding-bottom: 80px;
`;

export const Profile = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const { id } = useParams();
    const isOwner = user?.id === id;

    const { data, isLoading } = useGetUserArtsQuery(id);
    const { data: profile, isLoading: isLoadinProfile } = useGetUserProfile(id, isOwner);

    if (isLoading || isLoadinProfile) {
        return (
            <StyledLoading>
                <Loader height="fit-content" />
            </StyledLoading>
        );
    }

    return (
        <>
            <UserInfo isOwner={isOwner} profile={isOwner ? user! : profile} />
            <Arts arts={data} isOwner={isOwner} />
        </>
    );
};
