export type TID = number | string;

export interface IUser {
    id: TID;
    name: string;
    email: string;
}

export interface IError {
    isError: boolean;
}
