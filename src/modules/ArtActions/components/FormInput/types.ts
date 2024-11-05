import { UseFormRegister } from 'react-hook-form';

export interface IStyledInputProps {
    placeholder: string;
    type: string;
    register: ReturnType<UseFormRegister<any>>;
    error?: string;
}
