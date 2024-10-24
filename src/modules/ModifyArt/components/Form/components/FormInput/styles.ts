import { IError } from '@/types';
import styled from 'styled-components';

export const StyledInput = styled.input<IError>`
    border-radius: 8px;
    padding: 16px;
    font-size: 20px;
    border: 1px ${({ isError }) => (isError ? '#ff0000' : '#cccccc')} solid;
`;

export const StyledDescriprion = styled.textarea<IError>`
    border-radius: 8px;
    padding: 16px;
    resize: none;
    font-size: 20px;
    border: 1px ${({ isError }) => (isError ? '#ff0000' : '#cccccc')} solid;
`;

export const StyledLable = styled.span`
    min-height: 14px;
    width: 100%;
    font-size: 10px;
    color: #ff0000;
    text-align: left;
    font-weight: 700;
`;

export const StyledBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;
