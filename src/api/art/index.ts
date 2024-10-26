import { useMutation, useQuery } from '@tanstack/react-query';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { firestore } from '../firebase';
import { EQueryKey, IArt, TID } from '@/types';

export const useGetUseArtsQuery = (id: TID) => {
    return useQuery<any>({
        refetchOnMount: false,
        queryKey: [EQueryKey.USER_ARTS, id],
        queryFn: async () => {
            const collectionRef = query(collection(firestore, 'arts'), where('ownerId', '==', id));

            const { docs } = await getDocs(collectionRef);
            return docs[0].data();
        },
    });
};

// export const useCreateUseArtMutation = (art: IArt) => {
//     return useMutation({
//         mutationFn: (event) => {},
//     });
// };
