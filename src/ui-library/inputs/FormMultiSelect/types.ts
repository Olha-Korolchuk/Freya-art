import { IOption } from '@/types';

export interface ISelectInputProps {
    placeholder: string;
    value: IOption[];
    error?: string;
    options: IOption[];
    onChange: (newValue: string[]) => void;
}
