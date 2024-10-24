import React, { FC } from 'react';
import { StyledBox, StyledDescriprion, StyledInput, StyledLable } from './styles';
import { IStyledInputProps } from './types';

export const FormInput: FC<IStyledInputProps> = ({ type, placeholder, register, error }) => (
    <StyledBox>
        {type === 'description' ? (
            <StyledDescriprion rows={4} isError={!!error} type={type} placeholder={placeholder} {...register} />
        ) : (
            <StyledInput isError={!!error} type={type} placeholder={placeholder} {...register} />
        )}
        <StyledLable>{error || ''}</StyledLable>
    </StyledBox>
);
