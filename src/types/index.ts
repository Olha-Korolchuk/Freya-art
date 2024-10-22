export type TID = number | string;

export interface IUser {
    id: TID;
    name: string;
    email: string;
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
