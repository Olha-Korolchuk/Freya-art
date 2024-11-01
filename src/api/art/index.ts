import { RootState } from '@/store/store';
import { EQueryKey, IArt } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDocs,
    limit,
    query,
    startAfter,
    updateDoc,
    where,
} from 'firebase/firestore';
import { useSelector } from 'react-redux';
import { firestore } from '../firebase';
import { queryClient } from '../query';
import { IArtActionRequest, IArtIterator } from './types';
import { uploadImageAndGetUrl } from '../helpers';

export const useGetFilteredArtsQuery = (filter?: {
    title?: string;
    genre?: string[];
    type?: string[];
    page?: number;
    pageSize?: number;
}) => {
    const itemsPerPage = filter?.pageSize || 10;

    return useQuery<{ arts: IArtIterator[]; total: number }>({
        refetchOnMount: false,
        queryKey: [EQueryKey.ALL_ARTS, filter ? JSON.stringify(filter) : ''],
        queryFn: async () => {
            const collectionRef = collection(firestore, 'arts');

            let countQuery = query(collectionRef);
            if (filter?.title) {
                countQuery = query(
                    countQuery,
                    where('title', '>=', filter.title),
                    where('title', '<=', filter.title + '\uf8ff'),
                );
            }
            if (filter?.genre?.length) {
                countQuery = query(countQuery, where('genre', 'array-contains-any', filter.genre));
            }
            if (filter?.type?.length) {
                countQuery = query(countQuery, where('type', 'array-contains-any', filter.type));
            }
            const countDocs = await getDocs(countQuery);
            const total = countDocs.size;

            let artsQuery = query(collectionRef);
            if (filter?.title) {
                artsQuery = query(
                    artsQuery,
                    where('title', '>=', filter.title),
                    where('title', '<=', filter.title + '\uf8ff'),
                );
            }
            if (filter?.genre?.length) {
                artsQuery = query(artsQuery, where('genre', 'array-contains-any', filter.genre));
            }
            if (filter?.type?.length) {
                artsQuery = query(artsQuery, where('type', 'array-contains-any', filter.type));
            }
            if (filter?.page && filter.page > 1) {
                const lastVisible = await getDocs(query(collectionRef, limit((filter.page - 1) * itemsPerPage)));
                const lastDoc = lastVisible.docs[lastVisible.docs.length - 1];
                if (lastDoc) {
                    artsQuery = query(artsQuery, startAfter(lastDoc));
                }
            }

            artsQuery = query(artsQuery, limit(itemsPerPage));
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

export const useDeleteUserArtMutation = () => {
    return useMutation({
        mutationFn: async (id: string) => {
            const artsCollectionRef = collection(firestore, 'arts');
            const artQuery = query(artsCollectionRef, where('id', '==', id));
            const querySnapshot = await getDocs(artQuery);

            if (!querySnapshot.empty) {
                const artDocRef = querySnapshot.docs[0].ref;
                await deleteDoc(artDocRef);
            } else {
                throw new Error(`No document found with internal ID: ${id}`);
            }
        },
        onSuccess: (_data, id) => {
            queryClient.invalidateQueries({
                predicate: (query) =>
                    query.queryKey.includes(EQueryKey.USER_ARTS) ||
                    query.queryKey.includes(EQueryKey.ALL_ARTS) ||
                    (query.queryKey.includes(EQueryKey.ART) && query.queryKey.includes(id)),
            });
        },
        onError: (error) => {
            console.error('Failed to delete document:', error);
        },
    });
};

export const useActionUserArtMutation = () => {
    const { user } = useSelector((state: RootState) => state.auth);

    return useMutation({
        mutationFn: async ({ art, isEdit }: { art: IArtActionRequest; isEdit: boolean }) => {
            const { image, ...artData } = art;
            const imageUrl = image instanceof File ? await uploadImageAndGetUrl(image) : image;

            const artWithImage = {
                ...artData,
                image: imageUrl,
                ownerId: user?.id || '',
            };

            if (isEdit && artData.id) {
                const artsCollectionRef = collection(firestore, 'arts');
                const artQuery = query(artsCollectionRef, where('id', '==', artData.id));
                const querySnapshot = await getDocs(artQuery);

                if (!querySnapshot.empty) {
                    const artDocRef = querySnapshot.docs[0].ref;
                    await updateDoc(artDocRef, artWithImage);
                } else {
                    console.error(`No document found with custom ID: ${artData.id}`);
                }
            } else {
                const newArtRef = doc(collection(firestore, 'arts'));
                artWithImage.id = newArtRef.id;
                await addDoc(collection(firestore, 'arts'), artWithImage);
            }
        },
        onSuccess: (_data, { art }) => {
            queryClient.invalidateQueries({
                predicate: (query) => {
                    return (
                        query.queryKey.includes(EQueryKey.USER_ARTS) ||
                        query.queryKey.includes(EQueryKey.ALL_ARTS) ||
                        (query.queryKey.includes(EQueryKey.ART) && query.queryKey.includes(art.id))
                    );
                },
            });
        },
    });
};
