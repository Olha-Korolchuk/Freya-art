export type TID = string;

export interface IUser {
    id: TID;
    name: string;
    email: string;
    image: string | null;
}

export interface IError {
    isError: boolean;
}

export interface IUserInfo {
    img: string;
    title: string;
    description: string;
    genre: string;
    type: string;
    username: string;
}

export interface IArt {
    title: string;
    description: string;
    type: string[];
    genre: string[];
    id: TID;
    ownerId: TID;
    image: string;
}

export enum EQueryKey {
    USER_ARTS = 'USER_ARTS',
    ALL_ARTS = 'ALL_ARTS',
    ART = 'ART',
    USER = 'USER',
}

export interface IOption {
    value: string;
    label: string;
}
