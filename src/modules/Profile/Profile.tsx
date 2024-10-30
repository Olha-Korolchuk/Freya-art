import { UserInfo } from './components/UserInfo/UserInfo';
import { Arts } from './components/Arts';
import { useGetUserArtsQuery } from '@/api/art';
import { StyledLoading } from './styles';
import { Loader } from '@/components/Loader';

export const Profile = () => {
    const { isLoading } = useGetUserArtsQuery();

    if (isLoading) {
        return (
            <StyledLoading>
                <Loader height="48vh" />
            </StyledLoading>
        );
    }

    return (
        <>
            <UserInfo />
            <Arts />
        </>
    );
};
