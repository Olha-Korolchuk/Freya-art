export interface ICreateArtFormFields {
    title: string;
    description: string;
    type: string;
    genre: string;
    image: string;
}

export const defaultValues: ICreateArtFormFields = {
    description: '',
    genre: '',
    image: '',
    title: '',
    type: '',
};
