import { IError } from '@/types';
import styled, { css } from 'styled-components';

export const StyledContainer = styled.form`
    padding: 38px;
    display: flex;
    gap: 38px;
`;

export const StyledForm = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 16px;
    width: 480px;
`;

export const StyledReplace = styled.div`
    position: absolute;
    z-index: 2;
    width: 100%;
    left: 0;
    bottom: 0;
    padding: 16px;
    display: flex;
    justify-content: center;
    background-color: #ffffff5c;
`;

export const StyledDropArea = styled.div<IError>`
    width: 520px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    ${({ isError }) =>
        isError
            ? css`
                  border: 2px dashed #ff0000;
                  background-color: #ff00000f;
              `
            : css`
                  border: 2px dashed #000;
                  background-color: #f3fcedaf;
              `}

    border-radius: 16px;
    cursor: pointer;
    &.highlight {
        border-color: #9dbd61;
    }
`;

export const StyledFormContent = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    gap: 22px;
`;

export const StyledInstructions = styled.p`
    font-size: 16px;
    margin-inline: 20px;
`;

export const StyledLabel = styled.label`
    position: absolute;
    z-index: 4;
    inset: 0;
    cursor: pointer;
`;

export const StyledGallery = styled.div`
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: 10px;

    position: absolute;
    inset: 0;
    pointer-events: none;

    img {
        width: 100%;
        height: 470px;
        object-fit: cover;
        border-radius: 16px;
    }
`;

export const StyledButton = styled.button`
    border-radius: 30px;
    padding: 8px 36px;
    font-size: 20px;
    text-decoration: none;
    color: #000;
    border: none;
    background-color: #9dbd61;
`;
