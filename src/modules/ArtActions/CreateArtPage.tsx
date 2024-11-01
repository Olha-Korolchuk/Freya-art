import { useActionUserArtMutation } from '@/api/art';
import { Action } from './Action';

export const CreateArtPage = () => {
    const { mutateAsync } = useActionUserArtMutation();

    return <Action handler={(data) => mutateAsync({ art: data, isEdit: false })} />;
};
