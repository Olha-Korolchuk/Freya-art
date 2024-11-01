import { useActionUserArtMutation, useGetArtQuery } from '@/api/art';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Action } from './Action';
import { Loader } from '@/components/Loader';
import { StyledLoaderBox } from './styles';

export const EditArtPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetArtQuery(id || '');
    const { user } = useSelector((state: RootState) => state.auth);

    const { mutateAsync } = useActionUserArtMutation();
    if (isLoading) {
        return (
            <StyledLoaderBox>
                <Loader bgColor="transparent" />
            </StyledLoaderBox>
        );
    }

    if (data?.ownerId !== user?.id) {
        return <StyledLoaderBox>Not Found</StyledLoaderBox>;
    }

    return (
        <Action
            isEdit
            defaultValues={data}
            handler={(values) => mutateAsync({ art: { ...data, ...values }, isEdit: true })}
        />
    );
};
