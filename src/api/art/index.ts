import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { collection, addDoc, query, getDocs, where } from 'firebase/firestore';
import { firestore, store } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { EQueryKey } from '@/types';
import { IArtActionRequest, IArtIterator } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export const useGetUserArtsQuery = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return useQuery<IArtIterator[]>({
        refetchOnMount: false,
        queryKey: [EQueryKey.USER_ARTS, user?.id],
        queryFn: async () => {
            const collectionRef = query(collection(firestore, 'arts'), where('ownerId', '==', user?.id));

            const { docs } = await getDocs(collectionRef);
            return docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IArtIterator[];
        },
    });
};

export const useGetFiltredArtsQuery = (filter?: any) => {
    return useQuery<IArtIterator[]>({
        refetchOnMount: false,
        queryKey: [EQueryKey.ALL_ARTS, filter],
        queryFn: async () => {
            const collectionRef = query(collection(firestore, 'arts'));

            const { docs } = await getDocs(collectionRef);
            return docs.map((doc) => ({ id: doc.id, ...doc.data() })) as IArtIterator[];
        },
    });
};

export const useCreateUserArtMutation = () => {
    const queryClient = useQueryClient();
    const { user } = useSelector((state: RootState) => state.auth);

    return useMutation({
        mutationFn: async (art: IArtActionRequest) => {
            const { image, ...artData } = art;

            const imageRef = ref(store, `arts/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);

            const artWithImage = {
                ...artData,
                image: imageUrl,
                ownerId: user?.id,
                authorName: user?.name,
            };

            await addDoc(collection(firestore, 'arts'), artWithImage);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: [EQueryKey.USER_ARTS, user?.id] });
            queryClient.invalidateQueries({
                queryKey: [EQueryKey.ALL_ARTS],
                predicate(query) {
                    return query.queryKey.includes(EQueryKey.ALL_ARTS);
                },
            });
        },
    });
};
