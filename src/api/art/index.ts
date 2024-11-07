import { RootState } from '@/store/store';
import { EQueryKey } from '@/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    DocumentData,
    getDocs,
    Query,
    query,
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

            // Запити для кожного фільтра
            let titleQuery: Query<DocumentData> = collectionRef;
            if (filter?.title) {
                titleQuery = query(
                    collectionRef,
                    where('title', '>=', filter.title),
                    where('title', '<=', filter.title + '\uf8ff'),
                );
            }

            let genreQuery: Query<DocumentData> = collectionRef;
            if (filter?.genre?.length) {
                genreQuery = query(collectionRef, where('genre', 'array-contains-any', filter.genre));
            }

            let typeQuery: Query<DocumentData> = collectionRef;
            if (filter?.type?.length) {
                typeQuery = query(collectionRef, where('type', 'array-contains-any', filter.type));
            }

            // Отримуємо окремі результати для кожного фільтра
            const [titleDocs, genreDocs, typeDocs] = await Promise.all([
                getDocs(titleQuery),
                getDocs(genreQuery),
                getDocs(typeQuery),
            ]);

            // Зберігаємо ID документів для швидкого доступу
            const titleIds = new Set(titleDocs.docs.map((doc) => doc.id));
            const genreIds = new Set(genreDocs.docs.map((doc) => doc.id));
            const typeIds = new Set(typeDocs.docs.map((doc) => doc.id));

            // Перетин ID
            const commonIds = [...titleIds].filter((id) => genreIds.has(id) && typeIds.has(id));

            // Вибираємо документи, які відповідають усім фільтрам
            const arts = commonIds.map((id) => {
                const doc =
                    titleDocs.docs.find((d) => d.id === id) ||
                    genreDocs.docs.find((d) => d.id === id) ||
                    typeDocs.docs.find((d) => d.id === id);
                return doc?.data() as IArtIterator;
            });

            // Пагінація
            let paginatedArts = arts || [];
            let total = arts.length || 0;
            const page = filter?.page ?? 1;
            paginatedArts = arts.slice((page - 1) * itemsPerPage, page * itemsPerPage);
            total = arts.length;

            return { arts: paginatedArts, total };
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
