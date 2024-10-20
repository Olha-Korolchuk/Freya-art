export interface IStyledLinkProps {
    isContained: boolean;
}

export type TLinkProps = IStyledLinkProps;

export interface ISignUpFromFields {
    email: string;
    name: string;
    password: string;
    confirmPassword: string;
}
