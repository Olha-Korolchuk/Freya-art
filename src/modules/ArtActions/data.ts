import { IArt } from '@/types';

export interface ICreateArtFormFields extends Pick<IArt, 'description' | 'genre' | 'title' | 'type'> {}

export const createDefaultValues = (values?: ICreateArtFormFields): ICreateArtFormFields => ({
    description: values?.description || '',
    genre: values?.genre || [],
    title: values?.title || '',
    type: values?.type || [],
});
