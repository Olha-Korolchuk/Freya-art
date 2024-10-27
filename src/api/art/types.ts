import { IArt } from '@/types';

export interface IArtActionRequest extends Omit<IArt, 'image' | 'id' | 'ownerId' | 'authorName'> {
    id?: string;
    image: string | File;
}

export interface IArtIterator extends IArt {
    id: string;
}
