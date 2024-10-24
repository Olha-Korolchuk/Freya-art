import React, { FC } from 'react';
import { StyledBox, StyledInput, StyledLable } from './styles';
import { IStyledInputProps } from './types';

export const FormInput: FC<IStyledInputProps> = ({ type, placeholder, register, error }) => (
    <StyledBox>
        <StyledInput isError={!!error} type={type} placeholder={placeholder} {...register} />
        <StyledLable>{error || ''}</StyledLable>
    </StyledBox>
);
