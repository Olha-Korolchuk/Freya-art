import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { store } from './firebase';

export const uploadImageAndGetUrl = async (image: File, path: string | undefined = 'arts'): Promise<string> => {
    const imageRef = ref(store, `${path}/${image.name}`);
    await uploadBytes(imageRef, image);
    return getDownloadURL(imageRef);
};
