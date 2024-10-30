import Avatar from '@/assets/images/userAvatar.jpg';
import Pensil from '@/assets/images/icons/pencil.svg';
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
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { useState } from 'react';
import { collection, doc, setDoc } from 'firebase/firestore';
import { firestore, store } from '@/api/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';

export const UserInfo = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    const [profileImage, setProfileImage] = useState<null | string>(null);

    const uploadImageAndGetUrl = async (image: File): Promise<string> => {
        const imageRef = ref(store, `arts/${image.name}`);
        await uploadBytes(imageRef, image);
        return getDownloadURL(imageRef);
    };

    const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => setProfileImage(reader.result!.toString());
            reader.readAsDataURL(file);
            const imageUrl = await uploadImageAndGetUrl(file);

            const refCollection = collection(firestore, 'users');
            const data = {
                name: user?.name,
                email: user?.email,
                id: user?.id,
                image: imageUrl,
            };

            const docRef = doc(refCollection, user?.id);
            await setDoc(docRef, data);
        }
    };

    return (
        <StyledContainer>
            <StyledText>
                <StyledName>{user?.name}</StyledName>
                <StyledEmail>{user?.email}</StyledEmail>
            </StyledText>

            <StyledPhoto>
                <StyledImg src={profileImage || user?.image || Avatar} />
                <StyledLabel>
                    <StyledFile type="file" accept="image/*" onChange={handleImageChange} />
                    <StyledIcon src={Pensil} />
                </StyledLabel>
            </StyledPhoto>
        </StyledContainer>
    );
};
