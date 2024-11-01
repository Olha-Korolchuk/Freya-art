import { uploadImageAndGetUrl } from '@/api/helpers';
import { useUpdateUserMutation } from '@/api/user';
import Pensil from '@/assets/images/icons/pencil.svg';
import Avatar from '@/assets/images/userAvatar.jpg';
import { IUser } from '@/types';
import { FC, useState } from 'react';
import {
    StyledContainer,
    StyledEmail,
    StyledFile,
    StyledIcon,
    StyledImg,
    StyledLabel,
    StyledName,
    StyledPhoto,
    StyledText,
} from './styles';

interface IUserInfoProps {
    profile?: IUser;
    isOwner: boolean;
}

export const UserInfo: FC<IUserInfoProps> = ({ profile, isOwner }) => {
    const [profileImage, setProfileImage] = useState<null | string>(null);

    const { mutateAsync } = useUpdateUserMutation();

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (profile) {
            const file = e.target.files![0];
            if (file) {
                const reader = new FileReader();
                reader.onload = () => setProfileImage(reader.result!.toString());
                reader.readAsDataURL(file);
                const imageUrl = await uploadImageAndGetUrl(file);

                const data: IUser = {
                    name: profile?.name,
                    email: profile?.email,
                    id: profile?.id,
                    image: imageUrl,
                };
                await mutateAsync(data);
            }
        }
    };

    return (
        <StyledContainer>
            <StyledText>
                <StyledName data-cy="user-name">{profile?.name}</StyledName>
                <StyledEmail data-cy="user-email">{profile?.email}</StyledEmail>
            </StyledText>

            <StyledPhoto>
                <StyledImg src={profileImage || profile?.image || Avatar} data-cy="user-avatar" />
                {isOwner && (
                    <StyledLabel>
                        <StyledFile type="file" accept="image/*" onChange={handleImageChange} />
                        <StyledIcon src={Pensil} />
                    </StyledLabel>
                )}
            </StyledPhoto>
        </StyledContainer>
    );
};
