import React, { FC } from 'react';
import { StyledInput } from './styles';
import { IStyledInputProps } from './types';

export const FormInput: FC<IStyledInputProps> = ({ name, type }) => {
    return <StyledInput type={type} placeholder={name}></StyledInput>;
};
