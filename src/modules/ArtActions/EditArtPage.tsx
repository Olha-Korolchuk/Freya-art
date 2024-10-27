import { useActionUserArtMutation, useGetArtQuery } from '@/api/art';
import { RootState } from '@/store/store';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Action } from './Action';

export const EditArtPage = () => {
    const { id } = useParams();
    const { data, isLoading } = useGetArtQuery(id || '');
    const { user } = useSelector((state: RootState) => state.auth);

    const { mutateAsync } = useActionUserArtMutation();
    if (isLoading) {
        return <>Loading...</>;
    }

    if (data?.ownerId !== user?.id) {
        return <>Not Found</>;
    }

    return (
        <Action
            isEdit
            defaultValues={data}
            handler={(values) => mutateAsync({ art: { ...data, ...values }, isEdit: true })}
        />
    );
};
