import { IArtIterator } from '../art/types';
import { useMutation, useQuery } from '@tanstack/react-query';
import { collection, DocumentData, getDocs, query, QuerySnapshot, updateDoc, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { EQueryKey, IUser } from '@/types';
import { useDispatch } from 'react-redux';
import { setUser } from '@/store/reducers/auth/authSlice';

export const useGetUserArtsQuery = (id?: string) => {
    return useQuery<IArtIterator[]>({
        refetchOnMount: false,
        queryKey: [EQueryKey.USER_ARTS, id],
        queryFn: async () => {
            const collectionRef = query(collection(firestore, 'arts'), where('ownerId', '==', id));
            const { docs } = await getDocs(collectionRef);
            return docs.map((doc) => doc.data()) as IArtIterator[];
        },
    });
};

export const getUserById = async (
    id: string,
): Promise<{ snapshot: QuerySnapshot<DocumentData, DocumentData>; user: IUser; isEmpty: boolean }> => {
    const userCollectionRef = query(collection(firestore, 'users'), where('id', '==', id));

    const snapshot = await getDocs(userCollectionRef);
    return { snapshot, user: snapshot.docs[0]?.data() as IUser, isEmpty: snapshot.empty };
};

export const useGetUserProfile = (id?: string, skip?: boolean) => {
    return useQuery<IUser>({
        refetchOnMount: false,
        queryKey: [EQueryKey.USER, id],
        enabled: !skip,
        queryFn: async () => {
            return (await getUserById(id || '')).user;
        },
    });
};

export const useUpdateUserMutation = () => {
    const dispatch = useDispatch();

    return useMutation({
        mutationFn: async (profile: IUser) => {
            const { isEmpty, snapshot } = await getUserById(profile.id);

            if (!isEmpty) {
                const artDocRef = snapshot.docs[0].ref;
                await updateDoc(artDocRef, profile as any);
            } else {
                console.error(`No user found with custom ID: ${profile.id}`);
            }
        },
        onSuccess: (_data, profile) => {
            dispatch(setUser(profile));
        },
        onError: (error) => {
            console.error('Failed to update user:', error);
        },
    });
};
