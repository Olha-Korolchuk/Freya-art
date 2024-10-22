import styled from 'styled-components';
import { TImgProps } from './types';

export const StyledContainer = styled.div`
    padding: 0 38px 38px;
    background-color: #e4edd4;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr;
    gap: 38px;
`;

export const StyledArt = styled.div<TImgProps>`
    border-radius: 16px;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    width: 330px;
    height: 506px;
    background-image: ${({ path }) => `url('${path}')`};
`;

export const StyledCard = styled.div`
    position: relative;
`;

export const StyledContainerTitle = styled.div`
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    color: white;
    padding: 10px;
    text-align: center;
    background: rgb(0, 0, 0);
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.8) 100%);
    border-bottom-left-radius: 16px;
    border-bottom-right-radius: 16px;
`;

export const StyledTitle = styled.h3`
    font-size: 40px;
`;
