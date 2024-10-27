import { IArt } from '@/types';

export interface ICreateArtFormFields extends Pick<IArt, 'description' | 'genre' | 'title' | 'type'> {}

export const defaultValues: ICreateArtFormFields = {
    description: '',
    genre: '',
    title: '',
    type: '',
};
