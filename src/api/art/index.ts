import { useMutation, useQuery } from '@tanstack/react-query';
import { collection, addDoc, query, getDocs, where, doc, limit, startAfter } from 'firebase/firestore';
import { firestore, store } from '../firebase';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { EQueryKey, IArt } from '@/types';
import { IArtActionRequest, IArtIterator } from './types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { queryClient } from '../query';

export const useGetUserArtsQuery = () => {
    const { user } = useSelector((state: RootState) => state.auth);
    return useQuery<IArtIterator[]>({
        refetchOnMount: false,
        queryKey: [EQueryKey.USER_ARTS, user?.id],
        queryFn: async () => {
            const collectionRef = query(collection(firestore, 'arts'), where('ownerId', '==', user?.id));
            const { docs } = await getDocs(collectionRef);
            return docs.map((doc) => doc.data()) as IArtIterator[];
        },
    });
};

export const useGetFiltredArtsQuery = (filter?: { title?: string; page?: number; pageSize?: number }) => {
    const itemsPerPage = filter?.pageSize || 10;

    return useQuery<{ arts: IArtIterator[]; total: number }>({
        refetchOnMount: false,
        queryKey: [EQueryKey.ALL_ARTS, filter ? JSON.stringify(filter) : ''], // Stringify filter for better query key
        queryFn: async () => {
            const collectionRef = collection(firestore, 'arts');

            // Count Query
            let countQuery = query(collectionRef);
            if (filter?.title) {
                countQuery = query(
                    countQuery,
                    where('title', '>=', filter.title),
                    where('title', '<=', filter.title + '\uf8ff'),
                );
            }
            const countDocs = await getDocs(countQuery);
            const total = countDocs.size;

            // Arts Query
            let artsQuery = query(collectionRef);
            if (filter?.title) {
                artsQuery = query(
                    artsQuery,
                    where('title', '>=', filter.title),
                    where('title', '<=', filter.title + '\uf8ff'),
                );
            }

            // Pagination Logic
            if (filter?.page && filter.page > 1) {
                // Only apply pagination if page is greater than 1
                const lastVisible = await getDocs(query(collectionRef, limit((filter.page - 1) * itemsPerPage)));
                const lastDoc = lastVisible.docs[lastVisible.docs.length - 1];
                if (lastDoc) {
                    artsQuery = query(artsQuery, startAfter(lastDoc));
                }
            }

            artsQuery = query(artsQuery, limit(itemsPerPage)); // Apply limit to the artsQuery after filtering and pagination

            const { docs } = await getDocs(artsQuery);
            const arts = docs.map((doc) => doc.data()) as IArtIterator[];

            return { arts, total };
        },
    });
};

export const useGetArtQuery = (id: string) => {
    return useQuery<IArtIterator>({
        refetchOnMount: false,
        queryKey: [EQueryKey.ART, id],
        queryFn: async () => {
            const collectionRef = query(collection(firestore, 'arts'), where('id', '==', id));

            const { docs } = await getDocs(collectionRef);
            return docs[0].data() as IArtIterator;
        },
    });
};

export const useCreateUserArtMutation = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return useMutation({
        mutationFn: async (art: IArtActionRequest) => {
            const { image, ...artData } = art;

            const imageRef = ref(store, `arts/${image.name}`);
            await uploadBytes(imageRef, image);
            const imageUrl = await getDownloadURL(imageRef);
            const newArtRef = doc(collection(firestore, 'arts'));

            const artWithImage: IArt = {
                ...artData,
                image: imageUrl,
                ownerId: user?.id || '',
                authorName: user?.name || '',
                id: newArtRef.id,
            };

            await addDoc(collection(firestore, 'arts'), artWithImage);
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return query.queryKey.includes(EQueryKey.USER_ARTS) || query.queryKey.includes(EQueryKey.ALL_ARTS);
                },
            });
        },
    });
};
