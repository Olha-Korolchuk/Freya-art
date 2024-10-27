import { IArt, TID } from '@/types';

export interface IArtActionRequest extends Omit<IArt, 'image' | 'id' | 'ownerId' | 'authorName'> {
    image: File;
}

export interface IArtIterator extends IArt {
    id: TID;
}
